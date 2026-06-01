import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pekalongan Heritage Map',
    short_name: 'Heritage Map',
    description: 'Peta interaktif warisan budaya Kota Pekalongan',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff9ef',
    theme_color: '#B5292B',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
