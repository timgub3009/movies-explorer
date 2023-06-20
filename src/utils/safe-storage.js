const safeStorage = {
  /**
   * Returns the same value as window.localStorage.getItem, but in case of SecurityError returns null.
   * @param {string} key
   * @returns {string | null}
   */
  getItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      // User disabled localStorage in the browser settings.
      return null;
    }
  },
  /**
   * Does the same as window.localStorage.setItem, but catches errors.
   * @param {string} key
   * @param {string} value
   */
  setItem(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // User disabled localStorage in the browser settings.
      // ignored.
    }
  },
  /**
   * Does the same as window.localStorage.removeItem, but catches errors.
   * @param {string} key
   */
  removeItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // User disabled localStorage in the browser settings.
      // ignored.
    }
  },
};

export default safeStorage;
