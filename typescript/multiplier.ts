interface MultiplyValues {
  val1: number
  val2: number
}

const parseArgument = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("not enough args")
  if (args.length > 4) throw new Error("too many args")

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      val1: Number(args[2]),
      val2: Number(args[3]),
    }
  } else {
    throw new Error("Provided values were not numbers")
  }
}

const multiplicator = (a: number, b: number, printText) => {
  console.log(printText, a * b)
}

try {
  const { val1, val2 } = parseArgument(process.argv)
  multiplicator(val1, val2, `Multiplied ${val1} and ${val2}, the result is:`)
} catch (error: unknown) {
  let errorMessage = "Something bad happened."
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message
  }
  console.log(errorMessage)
}
