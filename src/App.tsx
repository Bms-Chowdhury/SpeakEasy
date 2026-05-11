import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, BookmarkProvider } from './lib/context';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Scripts from './pages/Scripts';
import Blog from './pages/Blog';
import SinglePost from './pages/SinglePost';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import { HeaderBannerAd, StickyBottomMobileAd } from './components/ads';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// ─── Visitor Tracker Component ─────────────────────────────────
function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      // Don't track admin pages
      if (location.pathname.startsWith('/admin')) return;

      // Get or create visitor ID
      let visitorId = localStorage.getItem('visitor_id');
      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem('visitor_id', visitorId);
      }

      // Get country (optional - can fail gracefully)
      let country = 'Unknown';
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        country = data.country_name || 'Unknown';
      } catch {
        // Silent fail - country will remain 'Unknown'
      }

      // Detect device type
      const ua = navigator.userAgent;
      let deviceType = 'desktop';
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(ua)) {
        deviceType = 'tablet';
      } else if (/Mobile|Android|iPhone|iPod|IEMobile|BlackBerry|Kindle|Silk-Accelerated|hpwOS|webOS|Opera Mobi|Opera Mini/i.test(ua)) {
        deviceType = 'mobile';
      }

      // ── Resolve post_id from slug if on a post page ──────────
      // Matches /blog/:slug and /scripts/:slug
      let postId: string | null = null;
      const pathParts = location.pathname.split('/').filter(Boolean);
      // pathParts[0] = 'blog' | 'scripts', pathParts[1] = slug
      if (
        pathParts.length === 2 &&
        (pathParts[0] === 'blog' || pathParts[0] === 'scripts') &&
        pathParts[1]
      ) {
        try {
          const { data: postData } = await supabase
            .from('posts')
            .select('id')
            .eq('slug', pathParts[1])
            .maybeSingle(); // won't throw if not found
          postId = postData?.id ?? null;
        } catch {
          // Silent fail - postId will remain null
        }
      }

      // Track the page view
      try {
        await supabase.from('page_views').insert({
          post_id: postId,           // ← real post ID or null for non-post pages
          page_url: location.pathname,
          visitor_id: visitorId,
          country,
          device_type: deviceType,
          viewed_at: new Date().toISOString(),
        });
        console.log('Page view tracked:', location.pathname, '| post_id:', postId);
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();
  }, [location.pathname]);

  return null;
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <HeaderBannerAd />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scripts" element={<Scripts />} />
          <Route path="/scripts/:slug" element={<SinglePost />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<SinglePost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <StickyBottomMobileAd />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <BookmarkProvider>
          <VisitorTracker />
          <ScrollToTop />
          <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Routes>
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/*" element={<PublicLayout />} />
            </Routes>
          </div>
        </BookmarkProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}