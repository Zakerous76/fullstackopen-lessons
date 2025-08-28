import z from "zod"
export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}
export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}
export interface DiaryEntry {
  id: number
  date: string
  weather: Weather
  visibility: Visibility
  comment?: string | undefined
}

export const newEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.string().date(),
  comment: z.string().optional(),
})

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">

export type NewDiaryEntry = Omit<DiaryEntry, "id">
