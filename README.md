## about

Helps track numeric differences between successive calls.

## setup

Load via script tag:

```html
<!-- Just an IIFE namespaced `bipolar` -->
<script src="https://thewhodidthis.github.io/bipolar/bipolar.js"></script>
```

Source from an import map:

```json
{
  "imports": {
    "bipolar/stream": "https://thewhodidthis.github.io/bipolar/stream.js",
    "bipolar": "https://thewhodidthis.github.io/bipolar/main.js"
  }
}
```

Download from GitHub directly if using a package manager:

```sh
# Add to package.json
npm install thewhodidthis/bipolar
```

## usage
### main

Initialize with a series of values, then call repeatedly to produce successive deltas for each argument collected in an array. For example:

```js
import bipolar from "https://thewhodidthis.github.io/bipolar/main.js"

const filter = bipolar(0, 0)

// Log differences in position between clicks.
document.addEventListener("click", ({ x, y }) => {
  console.log(...filter(x, y))
})
```

### stream

Helps detect change in a streaming fashion. Give it a starting value, get a `TransformStream` instance in return:

```js
import bipolar from "https://thewhodidthis.github.io/bipolar/stream.js"

const random = (m = 100) => Math.floor(Math.random() * m) - (m * 0.5)
const { readable, writable } = bipolar(100)

const writer = writable.getWriter()
const reader = readable.getReader()

const repeat = setInterval(
  (stream) => {
    const input = random().toString()

    console.log(`< ${input.padStart(4, " ")}`)
    stream.write(input)
  },
  200,
  writer,
)

const cancel = (timer, stream) => {
  clearInterval(timer)
  stream.close()
}

console.log("Starting from 100, seed with random numbers and")
console.log("log the deltas for a couple of seconds:")

setTimeout(cancel, 2000, repeat, writer)

while (true) {
  const { done, value } = await reader.read()

  if (done) {
    break
  }

  console.log(`> ${value.padStart(4, " ")}`)
}
```
