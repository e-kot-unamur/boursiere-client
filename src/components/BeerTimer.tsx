import { useEffect, useState } from 'preact/hooks'
import { toDuration } from '../locales'
import '../css/timer.css'

interface Timer {
  periodDuration: number
  previousPeriod: number
  nextPeriod: number
}

function getTimer(): Timer {
  const periodDuration = 15 * 60 * 1000
  const previousPeriod = Math.floor(Date.now() / periodDuration) * periodDuration
  const nextPeriod = previousPeriod + periodDuration
  return { periodDuration, previousPeriod, nextPeriod }
}

export function BeerTimer() {
  const [timer, setTimer] = useState<Timer>(getTimer)
  const [remaining, setRemaining] = useState(timer.periodDuration)

  useEffect(() => {
    const interval = setInterval(() => setRemaining(Math.max(0, timer.nextPeriod - Date.now())), 333)
    return () => clearInterval(interval)
  }, [timer])

  const percentage = (1 - remaining / timer.periodDuration) * 100

  return (
    <p>
      {(remaining < 800 || remaining > timer.periodDuration - 1600) && (
        <div class="overlay">
          <div class="splash" onAnimationIteration={() => setTimer(getTimer)} />
        </div>
      )}
      <div class="progress" style={`width: ${percentage}%`}>
        {toDuration(remaining)}
      </div>
    </p>
  )
}
