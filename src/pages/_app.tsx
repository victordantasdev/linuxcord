/* eslint-disable import/extensions */
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ForkMe } from 'fork-me-corner';
import appConfig from '../config.json';

const GlobalStyle = () => (
  <style global jsx>
    {`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
    }

    body {
      font-family: 'Open Sans', sans-serif;
    }
    
    html, body, #__next {
      min-height: 100vh;
      display: flex;
      flex: 1;
    }
    
    #__next {
      flex: 1;
    }
    
    #__next > * {
      flex: 1;
    }
  `}

  </style>
);

export default function App({ Component, pageProps }: AppProps) {
  const { name, description } = appConfig;
  const url = 'http://aluracord-linux.vercel.app/';
  const image = 'http://aluracord-linux.vercel.app/images/og_image.png';

  return (
    <>
      <Head>
        <link
          rel="icon"
          href="/images/discord_logo.png"
        />
        <title>
          {`${name} - ${description}`}
        </title>
        <meta name="description" content={description} />
        <meta name="author" content="Victor Dantas Dev" />
        <meta name="keywords" content="Next.js, React, discord" />
        <meta httpEquiv="content-language" content="pt-BR" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={name} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
      </Head>

      <GlobalStyle />
      <div>
        <ForkMe
          repo="https://github.com/victordantasdev/aluracord-linux"
        />
        <Component {...pageProps} />
      </div>
    </>
  );
}
