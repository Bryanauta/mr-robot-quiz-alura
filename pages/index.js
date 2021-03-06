import { getClientBuildManifest } from 'next/dist/client/route-loader';
import { delBasePath } from 'next/dist/next-server/lib/router/router';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion'

import db from '../db.json';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';


//const BackgroundImage = styled.div`
//  background-image: url(${db.bg});
//  flex: 1;
//  background-size: cover;
//  background-position: center;
//`;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Mr Robot Quiz - Alura</title>
        <link rel="shortcut icon" href="https://pics.freeicons.io/uploads/icons/png/6882831431553666420-512.png" />
        <meta name="title" content="Mr Robot Quiz - Alura"></meta>
        <meta name="description" content="Bonsoir!,
        Será que você conhece mesmo sobre Mr Robot?
        Descubra se você é 0 ou 1 no Quiz!!"></meta>

        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://mr-robot-quiz-alura.bryanauta.vercel.app"></meta>
        <meta property="og:title" content="Mr Robot Quiz - Alura"></meta>
        <meta property="og:description" content="Bonsoir!,
        Será que você conhece mesmo sobre Mr Robot?
        Descubra se você é 0 ou 1 no Quiz!!"></meta>
        <meta property="og:image" content={db.bg}></meta>

        <meta property="twitter:card" content="summary_large_image"></meta>
        <meta property="twitter:url" content="https://mr-robot-quiz-alura.bryanauta.vercel.app"></meta>
        <meta property="twitter:title" content="Mr Robot Quiz - Alura"></meta>
        <meta property="twitter:description" content="Bonsoir!,
        Será que você conhece mesmo sobre Mr Robot?
        Descubra se você é 0 ou 1 no Quiz!!"></meta>
        <meta property="twitter:image" content={db.bg}></meta>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Mr Robot Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Bonsoir, {" " + name}!</p>
            <p>Será que você conhece mesmo sobre Mr Robot?</p>
            <p> Descubra se você é  0 ou 1 quando se trata de Mr Robot!</p>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`)
              console.log('submition')
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Digite seu nome!"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                Clique aqui para jogar,{" " + name}!
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{delay: 0.5, duration: 0.5}}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da galera!</h1>
            <ul>
            {db.external.map((linkExterno) => {
              const [projectName, githubUser] = linkExterno
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('.vercel.app', '')
                .split('.')
              return (
                <li key={linkExterno}>
                  <Widget.Topic 
                  as={Link}
                  href={`/quiz/${projectName}___${githubUser}`}
                  >
                    {`${githubUser}/${projectName}`}
                  </Widget.Topic>
                </li>
              )
            })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer 
          as={motion.footer}
          transition={{delay: 0.5, duration: 0.5}}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="http://github.com/bryanauta" />
    </QuizBackground>
  )
}