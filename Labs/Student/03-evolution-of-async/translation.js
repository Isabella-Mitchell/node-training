// Adapted from Exercism Translation Service Task

const TranslationService = require("./api.js");

const api = new TranslationService();

api.register("Hello", "Bonjour");
api.register("Goodbye", "Au revoir");
api.register("crowd", "foule");
api.register("sick", "malade");
api.register("night", "nuit");
api.register("word", "mot");
api.register("from", "à partir de");
api.register("other", "autre");
api.register("play", "jouer");
api.register("place", "lieu");

// api.fetch("word") will return a Promise that will either resolve with the translation or reject with an error.

// 1. Write a function that will log the translated word. You should not have an UnhandledPromiseRejections.
async function logTranslatedWord(word) {}

// logTranslatedWord("Hello");
// logTranslatedWord("Goodbye");
// logTranslatedWord("Nonsense");

// 2. Write a function that will take an array of words and log an array of translations.

async function logTranslatedArray(words) {}

logTranslatedArray(["Hello", "Goodbye", "Nonsense"]);
