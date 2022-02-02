import type { ComponentChildren } from 'preact'
import { useEffect, useState } from 'preact/hooks'

interface Props {
  children: ComponentChildren
}

export function AlertBox(props: Props) {
  const [className, setClassName] = useState('hidden alert')

  useEffect(() => {
    if (props.children) {
      setClassName('alert')
    }
  }, [props.children])

  const handleAnimationEnd = () => {
    setClassName('hidden alert')
  }

  return (
    <div class={className} onAnimationEnd={handleAnimationEnd}>
      {props.children}
    </div>
  )
}
