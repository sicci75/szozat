// import "mocha";
import { assert } from "chai";
import { getWordLetters } from "../../../src/lib/hungarianWordUtils";



/*
 * ============
 *  Test Cases
 * ============
 */

describe("Word utils", () => {
    // DOMAIN FIXES

    it("give correct letters for asztal", async () => {
        const letters = getWordLetters("asztal");
        assert.deepEqual(letters, ["a", "sz", "t", "a", "l"]);
    });

    it("give correct letters for edz", async () => {
        const letters = getWordLetters("edz");
        assert.deepEqual(letters, ["e", "dz"]);
    });

    it("give correct letters for edzés", async () => {
        const letters = getWordLetters("edzés");
        assert.deepEqual(letters, ["e", "dz", "é", "s"]);
    });

    it("give correct letters for gyagya", async () => {
        const letters = getWordLetters("gyagya");
        assert.deepEqual(letters, ["gy", "a", "gy", "a"]);
    });

    it("give correct letters for lándzsa", async () => {
        const letters = getWordLetters("lándzsa");
        assert.deepEqual(letters, ["l", "á", "n", "dzs", "a"]);
    });

    it("give correct letters for szesz", async () => {
        const letters = getWordLetters("szesz");
        assert.deepEqual(letters, ["sz", "e", "sz"]);
    });

    it("give correct letters for asszony", async () => {
        const letters = getWordLetters("asszony");
        assert.deepEqual(letters, ["a", "sz", "sz", "o", "ny"]);
    });

    it("give correct letters for faggyú", async () => {
        const letters = getWordLetters("faggyú");
        assert.deepEqual(letters, ["f", "a", "gy", "gy", "ú"]);
    });

    it("give correct letters for eddzen", async () => {
        const letters = getWordLetters("eddzen");
        assert.deepEqual(letters, ["e", "dz", "dz", "e", "n"]);
    });
});
