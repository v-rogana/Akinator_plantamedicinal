import { useMemo, useState } from 'react';
import plantsData from './data/plants.json';
import {
  createGame,
  getNextQuestion,
  answer as applyAnswer,
  getResult
} from './engine/decision.js';
import StartScreen from './components/StartScreen.jsx';
import QuestionScreen from './components/QuestionScreen.jsx';
import ResultScreen from './components/ResultScreen.jsx';
import CatalogScreen from './components/CatalogScreen.jsx';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [state, setState] = useState(() => createGame(plantsData));

  const question = useMemo(
    () => (screen === 'question' ? getNextQuestion(state) : null),
    [screen, state]
  );

  const startGame = () => {
    setState(createGame(plantsData));
    setScreen('question');
  };

  const onAnswer = (ans) => {
    if (!question) return;
    const next = applyAnswer(state, question.id, ans);
    const nextQ = getNextQuestion(next);
    setState(next);
    if (!nextQ || next.candidates.length <= 1) {
      setScreen('result');
    }
  };

  return (
    <main className="mx-auto min-h-full max-w-xl px-5 py-6 sm:py-10">
      {screen === 'start' && (
        <StartScreen
          onStart={startGame}
          onCatalog={() => setScreen('catalog')}
          total={plantsData.length}
        />
      )}
      {screen === 'question' && question && (
        <QuestionScreen
          question={question}
          state={state}
          onAnswer={onAnswer}
          onRestart={() => setScreen('start')}
        />
      )}
      {screen === 'result' && (
        <ResultScreen
          result={getResult(state)}
          onRestart={startGame}
          onCatalog={() => setScreen('catalog')}
        />
      )}
      {screen === 'catalog' && (
        <CatalogScreen plants={plantsData} onBack={() => setScreen('start')} />
      )}
    </main>
  );
}
