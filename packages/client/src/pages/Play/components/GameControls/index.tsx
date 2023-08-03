import { useState, useMemo, MouseEventHandler } from 'react'
import { selectGameProcess } from '@/store/slices/gameSlice/selectrors'
import { useAppSelector } from '@/store/typedHooks'
import { CodeBustersEngineProcess, RunMethodOptions } from '@/engine/Core/types'
import { Button } from '@mui/material'
import { getStartButtonName } from './helpers'

type ControlHandler = (options?: RunMethodOptions) => void

type ControlHandlerName =
  | 'startGame'
  | 'pauseGame'
  | 'endGame'
  | 'exitGame'
  | 'leaderboard'

export type GameControlsProps = {
  controls: {
    [key in ControlHandlerName]: ControlHandler
  }
}

const GameControls: React.FC<GameControlsProps> = ({ controls }) => {
  const gameProcess = useAppSelector(selectGameProcess)

  const [prevGameProcces, setPrevGameProcess] = useState(gameProcess)

  const startButtonName = getStartButtonName(gameProcess)

  const onStart = () => {
    const isResume = prevGameProcces === CodeBustersEngineProcess.PLAY

    gameProcess == CodeBustersEngineProcess.PLAY
      ? controls.pauseGame()
      : controls.startGame({ isResume })

    setPrevGameProcess(gameProcess)
  }

  const renderEndGameButton = useMemo(() => {
    const isGameProcess =
      gameProcess === CodeBustersEngineProcess.PLAY ||
      gameProcess === CodeBustersEngineProcess.PAUSE

    return isGameProcess ? (
      <Button
        variant="contained"
        onClick={() => {
          controls.endGame()
          setPrevGameProcess(gameProcess)
        }}>
        Завершить игру
      </Button>
    ) : null
  }, [gameProcess])

  const renderLeaderboardButton = useMemo(() => {
    const isStop =
      gameProcess !== CodeBustersEngineProcess.PLAY &&
      gameProcess !== CodeBustersEngineProcess.PAUSE

    return isStop ? (
      <Button
        variant="contained"
        onClick={controls.leaderboard as MouseEventHandler}>
        Рейтинг игроков
      </Button>
    ) : null
  }, [gameProcess])

  return (
    <>
      <Button variant="contained" onClick={onStart}>
        {startButtonName}
      </Button>

      {renderLeaderboardButton}

      {renderEndGameButton}

      <Button
        variant="contained"
        onClick={controls.exitGame as MouseEventHandler}>
        Выйти в меню
      </Button>
    </>
  )
}

export default GameControls
