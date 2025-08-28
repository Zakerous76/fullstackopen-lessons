import { NewDiaryEntry, newEntrySchema } from "./types"

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return newEntrySchema.parse(object)
}
