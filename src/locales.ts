export function toPrice(value: number): string {
  return value.toLocaleString('fr', { style: 'currency', currency: 'EUR' })
}

export function toRoundedPrice(value: number): string {
  return toPrice(roundPrice(value))
}

export function roundPrice(value: number): number {
  return Number(value.toFixed(1))
}

export function toAlcoholContent(value: number): string {
  // We're using the degree symbol '°' (U+00B0).
  return `${value.toLocaleString('fr')}\u00b0`
}

export function toDuration(value: number): string {
  // There aren't any builtin function to localize a time duration
  // and we'll avoid including moment.js just for that.

  value /= 1000
  const minutes = Math.floor(value / 60).toLocaleString('fr', { minimumIntegerDigits: 2 })
  const seconds = Math.floor(value % 60).toLocaleString('fr', { minimumIntegerDigits: 2 })

  // We're using the ratio character '∶' (U+2236) instead of a colon ':' (U+003A).
  return `${minutes}\u2236${seconds}`
}
