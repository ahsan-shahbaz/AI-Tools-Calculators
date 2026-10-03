import type { MetadataRoute } from 'next';
import { SITE_NAME, SITE_TAGLINE } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME}: free online calculators`,
    short_name: SITE_NAME,
    description: SITE_TAGLINE,
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f8f5',
    theme_color: '#087f6e',
    icons: [{ src: '/icon', sizes: '64x64', type: 'image/png' }, { src: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  };
}
