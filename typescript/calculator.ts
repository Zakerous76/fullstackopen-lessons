export type Operation = "multiply" | "add" | "divide"

export const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!")
      return a / b
    case "add":
      return a + b
    default:
      throw new Error("Operation is not multiply, add or divide!")
  }
}

const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])

try {
  console.log(calculator(a, b, "divide"))
} catch (error: unknown) {
  let errorMessage = "Something went wrong: "
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}

console.log(process.argv)
