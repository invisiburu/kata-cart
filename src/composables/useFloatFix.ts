export default function useFloatFix(): {
  floatFix: (amount: number) => number
} {
  return { floatFix }
}

function floatFix(amount: number) {
  return Number(amount.toFixed(2))
}
