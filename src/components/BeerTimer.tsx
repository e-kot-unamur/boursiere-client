import { useEffect, useState } from 'preact/hooks'
import '../css/timer.css'
import { toDuration } from '../locales'
import timeoutSound from '../sounds/okletsgo.ogg'

const duration = 2 * 60 * 1000

export function BeerTimer() {
  const [remaining, setRemaining] = useState(getRemaining)

  useEffect(() => {
    const interval = setInterval(() => setRemaining(getRemaining), 333)
    return () => clearInterval(interval)
  }, [])

  const percentage = (1 - remaining / duration) * 100

  return (
    <p>
      {(remaining < 800 || remaining > duration - 1600) && (
        <div class="overlay">
          <div class="splash" />
          <audio src={timeoutSound} autoPlay />
        </div>
      )}
      <div class="progress" style={`width: ${percentage}%`}>
        {toDuration(remaining)}
      </div>
    </p>
  )
}

function getRemaining(): number {
  const now = Date.now()
  return Math.ceil(now / duration) * duration - now
}
