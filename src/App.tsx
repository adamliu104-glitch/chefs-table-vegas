import { useGameStore } from './store/gameStore';
import { MenuScreen } from './components/screens/MenuScreen';
import { GameScreen } from './components/screens/GameScreen';
import { GameOverScreen } from './components/screens/GameOverScreen';

export default function App() {
  const phase = useGameStore(s => s.phase);
  return (
    <>
      {phase === 'menu'     && <MenuScreen />}
      {phase === 'playing'  && <GameScreen />}
      {phase === 'gameOver' && <GameOverScreen />}
    </>
  );
}
