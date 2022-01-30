import { Word } from '../lib/statuses'

export const WORDLE_TITLE = 'Szózat'

export const WIN_MESSAGES = ['Ez igen!', 'Szép munka!', 'Megcsináltad!']
export const GAME_COPIED_MESSAGE = 'A játékot kimásoltuk a vágólapra'
export const ABOUT_GAME_MESSAGE = 'A játék eredetéről'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'Nincs elég betű'
export const WORD_NOT_FOUND_MESSAGE = 'Nem találtunk ilyen szót'
export const CORRECT_WORD_MESSAGE = (solution: Word) =>
  `Vesztettél, a megoldás ez volt: ${solution.join('')}`
export const ENTER_TEXT = 'Beküld'
export const DELETE_TEXT = 'Töröl'
export const STATISTICS_TITLE = 'Statisztika'
export const GUESS_DISTRIBUTION_TEXT = 'A megoldások eloszlása'
export const NEW_WORD_TEXT = 'Következő feladvány:'
export const SHARE_TEXT = 'Megosztás'
export const TOTAL_TRIES_TEXT = 'Összes játék'
export const SUCCESS_RATE_TEXT = 'Sikerráta'
export const CURRENT_STREAK_TEXT = 'Jelenlegi folyamatos siker'
export const BEST_STREAK_TEXT = 'Leghosszabb folyamatos siker'
