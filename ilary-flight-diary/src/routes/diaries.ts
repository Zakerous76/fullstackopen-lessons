import express, { NextFunction, Request, Response } from "express"
import diaryService from "../services/diaryService"
import {
  DiaryEntry,
  NewDiaryEntry,
  newEntrySchema,
  NonSensitiveDiaryEntry,
} from "../types"
import z from "zod"

const router = express.Router()

const newDiaryParserMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    newEntrySchema.parse(req.body)
    next()
  } catch (error: unknown) {
    next(error)
  }
}

router.use(newDiaryParserMiddleware)

router.get("/:id", (req, res) => {
  const id = req.params.id
  const diary = diaryService.findById(Number(id))
  if (diary) {
    return res.send(diary)
  } else {
    return res.status(404).json({ error: "Couldnt find the resource" })
  }
})
router.get("/", (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
  res.send(diaryService.getNonSensitiveEntries())
})

router.post(
  "/",
  (
    req: Request<unknown, unknown, NewDiaryEntry>,
    res: Response<DiaryEntry>
  ) => {
    const addEntry = diaryService.addDiary(req.body)
    return res.json(addEntry)
  }
)

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues })
  } else {
    next(error)
  }
}

router.use(errorMiddleware)

export default router
