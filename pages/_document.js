import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ✅ Correct way to add external CSS files */}
                <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="/assets/css/fontawesome.min.css" />
                    <link rel="stylesheet" href="/assets/css/venobox.min.css" />
                    <link rel="stylesheet" href="/assets/css/animate.min.css" />
                    <link rel="stylesheet" href="/assets/css/keyframe-animation.css" />
                    <link rel="stylesheet" href="/assets/css/odometer.min.css" />
                    <link rel="stylesheet" href="/assets/css/nice-select.css" />
                    <link rel="stylesheet" href="/assets/css/swiper.min.css" />
                    <link rel="stylesheet" href="/assets/css/main.css" />
                    <link rel="stylesheet" href="/assets/css/carouselTicker.css" />
                    <link rel="stylesheet" href="/assets/css/main.css.map" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
