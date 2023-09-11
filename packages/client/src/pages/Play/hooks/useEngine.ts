import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/store/typedHooks'
import {
  setTimeLeft,
  setGameScores,
  setGameProcess,
} from '@/store/slices/gameSlice'
import { CodeBustersEngine } from '@/engine'
import { INITIAL_PLAYER_PROGRESS } from '@/engine/Core/const'
import {
  EngineEvent,
  EngineProcess,
  EnginePlayerProgressType,
} from '@/engine/Core/types'
import {
  createTrack,
  createEnemy,
  createCar,
  createCentralLines,
  createBorders,
  createFuel,
  createBackground,
  createMessage,
} from '@/engine/Objects/factories'

export type UseEngineProps = {
  backgroundRef: React.RefObject<HTMLCanvasElement>
  containerRef: React.RefObject<HTMLDivElement>
  trackRef: React.RefObject<HTMLCanvasElement>
  linesRef: React.RefObject<HTMLCanvasElement>
  bordersRef: React.RefObject<HTMLCanvasElement>
  enemyRef: React.RefObject<HTMLCanvasElement>
  carRef: React.RefObject<HTMLCanvasElement>
  fuelRef: React.RefObject<HTMLCanvasElement>
  messageRef: React.RefObject<HTMLCanvasElement>
}

export default function useEngine(props: UseEngineProps) {
  const [engine, setEngine] = useState<CodeBustersEngine | null>(null)

  const dispatch = useAppDispatch()

  const onChangeGameProcess = (process: EngineProcess) => {
    dispatch(setGameProcess(process))
  }

  const onAnimateEngine = (
    timestamp: number,
    params: { playerProgress: EnginePlayerProgressType }
  ) => {
    dispatch(setGameScores(params.playerProgress.scores))
    dispatch(setTimeLeft(params.playerProgress.timeLeft))
  }

  const onEngineStart = () => {
    dispatch(setTimeLeft(INITIAL_PLAYER_PROGRESS.timeLeft))
    dispatch(setGameScores(0))
  }

  useEffect(() => {
    const trackObject = createTrack(props.trackRef.current as HTMLCanvasElement)

    const { width, height } = trackObject.getSpecs()

    const backgroundObject = createBackground(
      props.backgroundRef.current as HTMLCanvasElement,
      width,
      height
    )

    const centralLinesObject = createCentralLines(
      props.linesRef.current as HTMLCanvasElement,
      width,
      height
    )

    const bordersSideObject = createBorders(
      props.bordersRef.current as HTMLCanvasElement,
      width,
      height
    )

    const fuelObject = createFuel(
      props.fuelRef.current as HTMLCanvasElement,
      width,
      height
    )

    const enemyObject = createEnemy(
      props.enemyRef.current as HTMLCanvasElement,
      width,
      height
    )

    const carObject = createCar(
      props.carRef.current as HTMLCanvasElement,
      width
    )

    const messageObject = createMessage(
      props.messageRef.current as HTMLCanvasElement
    )

    const engine = new CodeBustersEngine()

    engine
      .addObject(trackObject)
      .addObject(backgroundObject)
      .addObject(centralLinesObject)
      .addObject(bordersSideObject)
      .addObject(fuelObject)
      .addObject(enemyObject)
      .addObject(carObject)
      .addObject(messageObject)

    // Подписываемся на события движка
    engine
      .subscribe(EngineEvent.START, onEngineStart)
      .subscribe(EngineEvent.CHANGE_PROCESS, onChangeGameProcess)
      .subscribe(EngineEvent.ANIMATE, onAnimateEngine)

    setEngine(engine)

    dispatch(setTimeLeft(INITIAL_PLAYER_PROGRESS.timeLeft))
    dispatch(setGameScores(0))

    return () => {
      engine
        .unsubscribe(EngineEvent.START, onEngineStart)
        .unsubscribe(EngineEvent.CHANGE_PROCESS, onChangeGameProcess)
        .unsubscribe(EngineEvent.ANIMATE, onAnimateEngine)

      engine?.destroy()
    }
  }, [])

  return engine
}
