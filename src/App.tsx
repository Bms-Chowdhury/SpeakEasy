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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
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
