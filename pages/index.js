import { getClientBuildManifest } from 'next/dist/client/route-loader';
import { delBasePath } from 'next/dist/next-server/lib/router/router';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';

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
      <QuizContainer>
        <QuizLogo/>
        <Widget>
          <Widget.Header>
            <h1>Mr Robot Quiz</h1>
          </Widget.Header> 
          
          <Widget.Content>
            <p>Bonsoir, {name}!</p> 
            <p>Será que você conhece mesmo sobre Mr Robot?</p>
            <p> Descubra se você é  0 ou 1 no Quiz!</p>
            <form onSubmit={function(infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`)
              console.log('submition')
            }}
            >
              <p><input 
                onChange={function(infosDoEvento) {
                  infosDoEvento.target.value;
                  console.log(infosDoEvento.target.value)
                  // State
                  // name =infosDoEvento.target.value;
                  setName(infosDoEvento.target.value)
                }}
                placeholder="Digite seu nome!" /></p>
              <p><button type="submit" disabled={name.length === 0}>
                Jogar  
                {" "+name}
              </button></p>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizes da galera!</h1>
            <p><a href="" class="linkquiz">Quiz 1</a></p>
            <p><a href="" class="linkquiz">Quiz 2</a></p>
            <p><a href="" class="linkquiz">Quiz 3</a></p>
          </Widget.Content>
        </Widget>
        <Footer>

        </Footer>
      </QuizContainer>
      <GitHubCorner projectUrl="http://github.com/bryanauta">

      </GitHubCorner>
    </QuizBackground>
  )
}
