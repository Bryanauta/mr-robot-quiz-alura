import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer'
import Button from '../src/components/Button';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

function LoadingWidget() {
  console.log('Perguntas criadas: ', db.questions);
  var question = db.questions[0];

  return (
    <Widget>
      <Widget.Header>
        Carregando
      </Widget.Header>
    
      <Widget.Content>
        <img src="https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif" alt="error"></img>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
}) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            onSubmit();
          }}
        >
        {question.alternatives.map((alternative, alternativeIndex) => {
          const alternativeId = `alternative__${alternativeIndex}`
          return (
            <Widget.Topic
              as="label"
              htmlFor={alternativeId}
            >
              <input
                //style={{display: 'none'}}
                id={alternativeId}
                name={questionId}
                type="radio"
              />
              {alternative}
            </Widget.Topic>
          );
        })}
        
        <Button type="submit">
          CONFIRMAR
        </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}
export default function QuizPage() {
  const [screenState, setScreenState]= React.useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ)
    }, 1 * 3000);  
  }, []);
  
  function handleSumibtQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion<totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT)
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSumibtQuiz}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}
        
        {screenState === screenStates.RESULT && 
        <Widget>
          <Widget.Content>
            <div>Você acertou X questões, Parabéns!</div>
            <p>Faça outros quizes!</p>
            <p><a href="https://1sec-quiz.victoroda.vercel.app/" class="linkquiz">VictorOda/1sec-quiz</a></p>
            <p><a href="https://aluraquiz-coffee.leonardot07.vercel.app/" class="linkquiz">LeonardoT07/aluraquiz-coffee</a></p>
            <p><a href="https://ai-quiz.idcesares.vercel.app/" class="linkquiz">idcesares/AiQuiz</a></p>
          </Widget.Content>
        </Widget>
        }
        
        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="http://github.com/bryanauta" />
    </QuizBackground>
  )
}
