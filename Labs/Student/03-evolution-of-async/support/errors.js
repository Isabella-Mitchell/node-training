class NotAvailable extends Error {
  constructor(text) {
    super(
      `
The requested text "${text}" has not been translated yet.
    `.trim()
    );
  }
}

class AbusiveClientError extends Error {
  constructor() {
    super(
      `
Your client has been rejected because of abusive behaviour.
naDevvo’ yIghoS!
    `.trim()
    );
  }
}

class Untranslatable extends Error {
  constructor(text) {
    super(`The requested text "${text}" is untranslatable.`);
  }
}

module.exports = {
  NotAvailable,
  AbusiveClientError,
  Untranslatable,
};
