import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  a.startquiz{
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    width: 280px;
    text-decoration: none;
    border-radius: 7px;
    padding: 3px;
  }
  a.linkquiz{
    color: ${({ theme }) => theme.colors.contrastText};
    display: flex;
    width: 280px;
    text-decoration: none;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 7px;
    padding: 3px;
  }
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const { theme } = db;

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        Primary Meta Tags;
        <title>Mr Robot Quiz - Alura</title>
        <link rel="shortcut icon" href="https://pics.freeicons.io/uploads/icons/png/6882831431553666420-512.png" />
        <meta name="title" content="Mr Robot Quiz - Alura"></meta>
        <meta name="description" content="Bonsoir!,
        Será que você conhece mesmo sobre Mr Robot?
        Descubra se você é 0 ou 1 no Quiz!!"></meta>

        Open Graph / Facebook;
        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://mr-robot-quiz-alura.bryanauta.vercel.app"></meta>
        <meta property="og:title" content="Mr Robot Quiz - Alura"></meta>
        <meta property="og:description" content="Bonsoir!,
        Será que você conhece mesmo sobre Mr Robot?
        Descubra se você é 0 ou 1 no Quiz!!"></meta>
        <meta property="og:image" content="/images/ogimg.png"></meta>

        Twitter
        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:url" content="https://mr-robot-quiz-alura.bryanauta.vercel.app"></meta>
        <meta property="twitter:title" content="Mr Robot Quiz - Alura"></meta>
        <meta property="twitter:description" content="Bonsoir!,
        Será que você conhece mesmo sobre Mr Robot?
        Descubra se você é 0 ou 1 no Quiz!!"></meta>
        <meta property="twitter:image" content="/images/ogimg.png"></meta>

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
        <meta data></meta>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}