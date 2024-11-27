'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  // https://github.com/giscus/giscus/tree/main/styles/themes
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';

    scriptElem.setAttribute('data-repo', 'sj0724/blog-comments');
    scriptElem.setAttribute('data-repo-id', 'R_kgDONVjA1g');
    scriptElem.setAttribute('data-category', 'General');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDONVjA1s4Ckpkn');
    scriptElem.setAttribute('data-mapping', 'pathname');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '0');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'top');
    scriptElem.setAttribute('data-theme', theme);
    scriptElem.setAttribute('data-lang', 'ko');

    ref.current.appendChild(scriptElem);
  }, [theme]);

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame'
    );
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme } } },
      'https://giscus.app'
    );
  }, [theme]);

  // useEffect(() => {
  //   const handleGiscusComment = (event: any) => {
  //     if (event.origin !== 'https://giscus.app') return;
  //     if (!(typeof event.data === 'object' && event.data.giscus)) return;
  //     const giscusData = event.data.giscus;
  //     if ('discussion' in giscusData) {
  //       const metadataMessage: IMetadataMessage = giscusData;
  //       console.log(metadataMessage.discussion);
  //       console.log(metadataMessage.viewer);
  //     }
  //   };

  //   window.addEventListener('message', handleGiscusComment);

  //   return () => {
  //     window.removeEventListener('message', handleGiscusComment);
  //   };
  // }, []);

  return <section ref={ref} className='w-full' />;
}
