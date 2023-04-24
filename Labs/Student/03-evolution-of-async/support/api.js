const {
  AbusiveClientError,
  NotAvailable,
  Untranslatable,
} = require("./errors");

const mutex = { current: false };

/**
 *
 */
class ExternalApi {
  constructor(values = {}) {
    this.values = JSON.parse(JSON.stringify(values));
  }

  /**
   * Register a word for translation
   *
   * @param {string} value
   * @param {string | null} translation
   * @param {number | undefined} quality
   *
   * @returns {this}
   */
  register(value, translation, quality = undefined) {
    if (typeof this.values[value] === "undefined") {
      this.values[value] = [];
    }

    this.values[value].push(
      translation ? { translation, request: value, quality } : null
    );
    return this;
  }

  /**
   * @param {string} text
   * @returns {Promise<Translation>}
   */
  fetch(text) {
    // Check if client is banned
    if (mutex.current) {
      return rejectWithRandomDelay(new AbusiveClientError());
    }

    if (this.values[text] && this.values[text][0]) {
      return resolveWithRandomDelay(this.values[text][0]);
    }

    if (this.values[text]) {
      return rejectWithRandomDelay(new NotAvailable(text));
    }

    return rejectWithRandomDelay(new Untranslatable(text));
  }

  /**
   * @param {string} text
   * @param {(err?: Error) => void} callback
   */
  request(text, callback) {
    if (this.values[text] && this.values[text][0]) {
      mutex.current = true;
      callback(new AbusiveClientError());
      return;
    }

    if (this.values[text]) {
      this.values[text].shift();

      // If it's now available, yay, otherwise, nay
      setTimeout(
        () => callback(this.values[text][0] ? undefined : makeRandomError()),
        1
      );
      return;
    }

    callback(new Untranslatable(text));
  }
}

function resolveWithRandomDelay(value) {
  const timeout = Math.random() * 100;
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), timeout);
  });
}

function rejectWithRandomDelay(value) {
  const timeout = Math.random() * 100;
  return new Promise((_, reject) => {
    setTimeout(() => reject(value), timeout);
  });
}

function makeRandomError() {
  return new Error(`Error code ${Math.ceil(Math.random() * 10000)}`);
}

module.exports = ExternalApi;
