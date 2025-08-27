import express, { Response } from "express"
import diaryService from "../services/diaryService"
import { NonSensitiveDiaryEntry } from "../types"
import { toNewDiaryEntry } from "../utils"

const router = express.Router()

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

router.post("/", (req, res) => {
  const newDiaryEntry = toNewDiaryEntry(req.body)
  const addEntry = diaryService.addDiary(newDiaryEntry)
  return res.json(addEntry)
})

export default router
