import { useState, useEffect } from 'react'
import { CBEngine } from '@/engine'
import { CarObject, TrackObject } from '@/engine/Objects'
import { canvas } from '@/utils'

import sportCarImage from 'images/sport_car.png'

export type UseEngineProps = {
  containerRef: React.RefObject<HTMLDivElement>
  trackRef: React.RefObject<HTMLCanvasElement>
  carRef: React.RefObject<HTMLCanvasElement>
}

export default function useEngine({
  containerRef,
  trackRef,
  carRef,
}: UseEngineProps) {
  const [engine, setEngine] = useState<CBEngine | null>(null)

  useEffect(() => {
    if (
      carRef.current instanceof HTMLCanvasElement &&
      trackRef.current instanceof HTMLCanvasElement &&
      containerRef.current instanceof HTMLElement
    ) {
      const trackCanvasLayer = canvas(trackRef.current)
      const carCanvasLayer = canvas(carRef.current)

      // Создаем объект трассы для движка с начальными характеристиками
      const trackObject = new TrackObject(trackCanvasLayer)
      const baseTrackSpecs = TrackObject.createBaseTrackSpecs(
        containerRef.current
      )

      // Создаем объект машины для движка с начальными характеристиками
      const carObject = new CarObject(carCanvasLayer)
      const xPositionCar = carObject.getCenterOnTrack(TrackObject.width)

      const baseCarSpecs = CarObject.createBaseCarSpecs(
        sportCarImage,
        xPositionCar,
        0
      )

      // Рисуем трассу для начального отображения
      trackObject.draw(0, baseTrackSpecs)

      // Рисуем машину
      carObject.draw(0, baseCarSpecs)

      // Создаем экземпляр движка для обработки анимации и управлением процессом игры
      setEngine(
        new CBEngine({
          objects: [trackObject, carObject],
        })
      )
    }
  }, [])

  return engine
}
