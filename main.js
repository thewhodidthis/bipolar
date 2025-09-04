// Helps report differences.
export default function bipolar(...last) {
  // Reset.
  const memo = last

  return (...next) => {
    // Calculate deltas.
    const result = memo.map((v, i) => next[i] - v)

    // Save for later.
    memo.splice(0, memo.length, ...next)

    // Return array of deltas.
    return result
  }
}
