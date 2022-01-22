import { Word } from "../lib/statuses";
import { toWord } from "./utils";

const localWords = [
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
  ['a', 'd', 'ó', 'í', 'v'],
  ['a', 'd', 'o', 'm', 'a'],
]

export const WORDS: Word[] = localWords.map(toWord);
