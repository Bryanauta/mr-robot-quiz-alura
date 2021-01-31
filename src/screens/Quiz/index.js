import React, { useReducer } from 'react';
//import db from '../../../db.json';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer'
import AlternativesForm from '../../components/AlternativesForm'
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import GitHubCorner from '../../components/GitHubCorner';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Carregando
      </Widget.Header>
    
      <Widget.Content>
        <p>
          
          Você acertou
          {' '}
          {results.reduce((somatoriaAtual, resultAtual) =>{
            const isAcerto = resultAtual === true;
            if(isAcerto) {
              return somatoriaAtual+1
            }
            return somatoriaAtual;
          }, 0)} 
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`resullt__${result}`}>
              &#11093;{index+1} Questão: {result === true ? 'Acertou':'Errou'}
            </li>
          ))}
          
        </ul>
      </Widget.Content>
    </Widget>
  );
}


function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando
      </Widget.Header>
    
      <Widget.Content>
        <img src="https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif" width="100%" alt="error"></img>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
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

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 1 * 3000);
          }}
        >
        {question.alternatives.map((alternative, alternativeIndex) => {
          const alternativeId = `alternative__${alternativeIndex}`
          const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
          const isSelected = selectedAlternative === alternativeIndex;
          return (
            <Widget.Topic
              as="label"
              key={alternativeId}
              htmlFor={alternativeId}
              data-selected={isSelected}
              data-status={isQuestionSubmited && alternativeStatus}
            >
              <input
                style={{display: 'none'}}
                id={alternativeId}
                name={questionId}
                onChange={() => setSelectedAlternative(alternativeIndex)}
                type="radio"
              />
              {alternative}
            </Widget.Topic>
          );
        })}
        
        <Button type="submit" disabled={!hasAlternativeSelected}>
          CONFIRMAR
        </Button>
        {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
        {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}
export default function QuizPage({ externalQuestions, externalBg }) {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults] = React.useState([]);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = externalQuestions[questionIndex];
    const totalQuestions = externalQuestions.length;
    const bg = externalBg;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

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
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSumibtQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}
        
        {screenState === screenStates.RESULT && <ResultWidget results={results}/>} 

        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="http://github.com/bryanauta" />
    </QuizBackground>
  )
}
