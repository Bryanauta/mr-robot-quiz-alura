import React, { useReducer } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer'
import AlternativesForm from '../src/components/AlternativesForm'
import Button from '../src/components/Button';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';


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
              #{index+1} Resultado: {result === true ? 'Acertou':'Errou'}
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
export default function QuizPage() {
  const [screenState, setScreenState]= React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion
  const question = db.questions[questionIndex];

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
    <QuizBackground backgroundImage={db.bg}>
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
        
        <Widget>
          <Widget.Content>
            <p><a href="https://1sec-quiz.victoroda.vercel.app/" class="linkquiz">VictorOda/1sec-quiz</a></p>
            <p><a href="https://aluraquiz-coffee.leonardot07.vercel.app/" class="linkquiz">LeonardoT07/aluraquiz-coffee</a></p>
            <p><a href="https://ai-quiz.idcesares.vercel.app/" class="linkquiz">idcesares/AiQuiz</a></p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="http://github.com/bryanauta" />
    </QuizBackground>
  )
}
