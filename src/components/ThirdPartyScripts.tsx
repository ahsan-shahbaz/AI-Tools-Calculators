'use client';

import Script from 'next/script';
import { useConsent } from '@/lib/consent';
import { ADSENSE_CLIENT, GA_MEASUREMENT_ID } from '@/lib/site';

/** Loads AdSense and analytics only after the visitor accepts, and only if configured. */
export default function ThirdPartyScripts() {
  const consent = useConsent();
  if (consent !== 'granted') return null;

  return (
    <>
      {ADSENSE_CLIENT && (
        <Script
          id="adsense"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        />
      )}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            id="ga-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
    </>
  );
}
