class BipolarTransformer {
  constructor(p) {
    this.#last = p
  }
  #last = 0
  transform(chunk, controller) {
    const next = parseFloat(chunk)
    const d = next - this.#last

    this.#last = next

    controller.enqueue(d.toString())
  }
}

export default function bipolar(p) {
  const transformer = new BipolarTransformer(p)

  return new TransformStream(transformer)
}
