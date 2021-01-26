import { getClientBuildManifest } from 'next/dist/client/route-loader'
import { delBasePath } from 'next/dist/next-server/lib/router/router'
import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'

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
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            Mr Robot Quiz
          </Widget.Header> 
          
          <Widget.Content>
            <h1>Mr Robot Quiz</h1>

            <p>Lorem</p> 
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quiz da galera!</h1>
            1
            2
            3
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
