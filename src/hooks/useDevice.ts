import { useState, useEffect } from 'react';

export type Device = 'mobile' | 'desktop';

const MOBILE_BREAKPOINT = 768;

export function useDevice(): Device {
  const [device, setDevice] = useState<Device>(() =>
    typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : 'desktop'
  );

  useEffect(() => {
    const handleResize = () => {
      setDevice(window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : 'desktop');
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
}

export function useIsMobile(): boolean {
  return useDevice() === 'mobile';
}

export function useIsDesktop(): boolean {
  return useDevice() === 'desktop';
}
