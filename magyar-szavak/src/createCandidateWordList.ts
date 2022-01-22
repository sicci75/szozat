import fs from "fs";
import { CHAR_VALUES, getWordLetters } from "./wordUtils";

const TARGET_WORD_LENGTH = 5;

// Parse input file
const hungarianWordsText = fs.readFileSync("./src/magyar-szavak.txt").toString();
const hungarianWords = hungarianWordsText.split("\n").map(word => word.toLowerCase().trim());
// Exclude words with special characters
const hungarianWordsOnlyAlphabet = hungarianWords.filter(word => {
    return word.toUpperCase().split("").every(letter => CHAR_VALUES.includes(letter));
});
// Split into letters
const wordLetters = hungarianWordsOnlyAlphabet.map(getWordLetters);
// Reduce the list to words which may have the given number of characters
const candidateWordLetters = wordLetters.filter(word => word.length === TARGET_WORD_LENGTH);
// Save to file
const jsonString = JSON.stringify(candidateWordLetters);
fs.writeFileSync("./src/hungarian-word-letter-list.json", jsonString);
