import diaryEntries from "../data/diaryEntries"

import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types"

const diaries: DiaryEntry[] = diaryEntries

const getEntries = (): DiaryEntry[] => {
  return diaries
}

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => {
    return { id, date, weather, visibility }
  })
}

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id)
  return entry
}

const addDiary = (newDiaryEntry: NewDiaryEntry) => {
  const newEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...newDiaryEntry,
  }
  diaries.push(newEntry)
  return newEntry
}

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
}
