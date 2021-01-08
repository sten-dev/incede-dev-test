import React from "react";
import { Helmet } from "react-helmet";
import "../index.scss";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";
import LayoutBody from "./LayoutBody";

const Layout = ({ children, page, pageTitle }) => {
  console.log("pageTitle", pageTitle)
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="apple-touch-icon" sizes="57x57" href={`${withPrefix("/")}img/fav/apple-icon-57x57.png`} />
        <link rel="apple-touch-icon" sizes="60x60" href={`${withPrefix("/")}img/fav/apple-icon-60x60.png`} />
        <link rel="apple-touch-icon" sizes="72x72" href={`${withPrefix("/")}img/fav/apple-icon-72x72.png`} />
        <link rel="apple-touch-icon" sizes="76x76" href={`${withPrefix("/")}img/fav/apple-icon-76x76.png`} />
        <link rel="apple-touch-icon" sizes="114x114" href={`${withPrefix("/")}img/fav/apple-icon-114x114.png`} />
        <link rel="apple-touch-icon" sizes="120x120" href={`${withPrefix("/")}img/fav/apple-icon-120x120.png`} />
        <link rel="apple-touch-icon" sizes="144x144" href={`${withPrefix("/")}img/fav/apple-icon-144x144.png`} />
        <link rel="apple-touch-icon" sizes="152x152" href={`${withPrefix("/")}img/fav/apple-icon-152x152.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${withPrefix("/")}img/fav/apple-icon-180x180.png`} />
        <link rel="icon" type="image/png" sizes="192x192" href={`${withPrefix("/")}img/fav/android-icon-192x192.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${withPrefix("/")}img/fav/favicon.ico`} />
        <link rel="icon" type="image/png" sizes="96x96" href={`${withPrefix("/")}img/fav/favicon.ico`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${withPrefix("/")}img/fav/favicon.ico`} />
        <link rel="manifest" href={`${withPrefix("/")}img/fav/manifest.json`} />
        <meta name="msapplication-TileImage" content={`${withPrefix("/")}img/fav/ms-icon-144x144.png`}></meta>

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#5c4abb"
        />
        <meta name="theme-color" content="#5c4abb" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap"
          rel="stylesheet"
        />
        {/* <link  href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap" rel="stylesheet"/> */}

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/og-image.jpg`}
        />
        <script src="https://dde-us-south.analytics.ibm.com/daas/CognosApi.js"></script>
      </Helmet>
      <LayoutBody page={page}>
        {children}
      </LayoutBody>
    </div>
  );
};

export default Layout;
