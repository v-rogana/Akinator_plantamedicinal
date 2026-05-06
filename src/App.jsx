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
import ChallengeSelectScreen from './components/ChallengeSelectScreen.jsx';
import ChallengeResultScreen from './components/ChallengeResultScreen.jsx';
import ReferencesScreen from './components/ReferencesScreen.jsx';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [state, setState] = useState(() => createGame(plantsData));
  const [mode, setMode] = useState('normal');
  const [targetPlant, setTargetPlant] = useState(null);

  const question = useMemo(
    () => (screen === 'question' ? getNextQuestion(state) : null),
    [screen, state]
  );

  const startNormal = () => {
    setMode('normal');
    setTargetPlant(null);
    setState(createGame(plantsData));
    setScreen('question');
  };

  const startChallenge = (plant) => {
    setMode('challenge');
    setTargetPlant(plant);
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

  const goHome = () => {
    setMode('normal');
    setTargetPlant(null);
    setScreen('start');
  };

  return (
    <main className="mx-auto min-h-full max-w-xl px-5 py-6 sm:py-10">
      {screen === 'start' && (
        <StartScreen
          onStart={startNormal}
          onChallenge={() => setScreen('challenge-select')}
          onCatalog={() => setScreen('catalog')}
          onReferences={() => setScreen('references')}
          total={plantsData.length}
        />
      )}
      {screen === 'challenge-select' && (
        <ChallengeSelectScreen
          plants={plantsData}
          onPick={startChallenge}
          onBack={goHome}
        />
      )}
      {screen === 'question' && question && (
        <QuestionScreen
          question={question}
          state={state}
          onAnswer={onAnswer}
          onRestart={goHome}
        />
      )}
      {screen === 'result' && mode === 'normal' && (
        <ResultScreen
          result={getResult(state)}
          onRestart={startNormal}
          onCatalog={() => setScreen('catalog')}
        />
      )}
      {screen === 'result' && mode === 'challenge' && targetPlant && (
        <ChallengeResultScreen
          target={targetPlant}
          result={getResult(state)}
          history={state.history}
          onReplay={() => startChallenge(targetPlant)}
          onChooseAnother={() => setScreen('challenge-select')}
          onHome={goHome}
        />
      )}
      {screen === 'catalog' && (
        <CatalogScreen plants={plantsData} onBack={goHome} />
      )}
      {screen === 'references' && (
        <ReferencesScreen plants={plantsData} onBack={goHome} />
      )}
    </main>
  );
}
