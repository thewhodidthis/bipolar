import bipolar from "./main.js"

const random = (mid = 100) => Math.floor(Math.random() * mid) - (mid * 0.5)
const filter = bipolar(100)

const repeat = setInterval(
  (runner) => {
    const data = random()

    console.log(`> ${data.toString().padStart(4, " ")}`)
    console.log(`< ${runner(data).map(n => n.toString().padStart(4, " ")).pop()}`)
  },
  200,
  filter,
)

const cancel = (timer) => {
  clearInterval(timer)
}

console.log("Starting from 100, seed with random numbers and")
console.log("log the deltas for a couple of seconds:")

setTimeout(cancel, 2000, repeat)
