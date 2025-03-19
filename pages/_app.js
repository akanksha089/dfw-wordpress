import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import '../styles/globals.css';
import '../styles/custom.css';
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const scriptUrls = [
      // '/assets/js/jquary-3.6.0.min.js',
       'https://code.jquery.com/jquery-3.6.0.min.js',
      '/assets/js/bootstrap-bundle.js',
      '/assets/js/imagesloaded-pkgd.js',
      '/assets/js/waypoints.min.js',
      '/assets/js/venobox.min.js',
      '/assets/js/odometer.min.js',
      '/assets/js/meanmenu.js',
      '/assets/js/jquery.isotope.js',
      '/assets/js/wow.min.js',
      '/assets/js/swiper.min.js',
      '/assets/js/split-type.min.js',
      '/assets/js/gsap.min.js',
      '/assets/js/scroll-trigger.min.js',
      '/assets/js/scroll-smoother.js',
      '/assets/js/jquery.carouselTicker.js',
      '/assets/js/nice-select.js',
      '/assets/js/smooth-scroll.js',
      '/assets/js/ajax-form.js',
      '/assets/js/contact.js',
      '/assets/js/main.js',
    ];

    const loadScripts = async () => {
      for (const url of scriptUrls) {
        if (!document.querySelector(`script[src="${url}"]`)) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.setAttribute('data-dynamic', 'true');
            document.body.appendChild(script);

            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
          });
        }
      }

      // Safely initialize meanmenu after all scripts are loaded
      if (window.jQuery && typeof window.jQuery.fn.meanmenu === 'function') {
        jQuery(document).ready(function ($) {
          $('#your-menu-selector').meanmenu(); // Replace with the actual selector
        });
      } else {
        console.error('meanmenu plugin is not loaded or initialized properly.');
      }
    };

    const handleRouteChange = async () => {
      // Remove existing dynamic scripts
      document.querySelectorAll('script[data-dynamic="true"]').forEach((script) => {
        script.remove();
      });

      // Load scripts again
      await loadScripts();
    };

    // Initial script load
    loadScripts();

    // Handle route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      document.querySelectorAll('script[data-dynamic="true"]').forEach((script) => {
        script.remove();
      });
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <link rel="shortcut icon" type="image/x-icon" href="/assets/img/favicon.ico" />
             {/* Add your global stylesheets here */}
             {/* <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="/assets/css/fontawesome.min.css" />
                    <link rel="stylesheet" href="/assets/css/venobox.min.css" />
                    <link rel="stylesheet" href="/assets/css/animate.min.css" />
                    <link rel="stylesheet" href="/assets/css/keyframe-animation.css" />
                    <link rel="stylesheet" href="/assets/css/odometer.min.css" />
                    <link rel="stylesheet" href="/assets/css/nice-select.css" />
                    <link rel="stylesheet" href="/assets/css/swiper.min.css" />
                    <link rel="stylesheet" href="/assets/css/main.css" />
                    <link rel="stylesheet" href="/assets/css/carouselTicker.css" />
                    <link rel="stylesheet" href="/assets/css/main.css.map" /> */}
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
