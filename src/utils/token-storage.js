import safeStorage from "./safe-storage";

const JWT_STORAGE_KEY = "jwt";

const tokenStorage = {
  /**
   * @returns {string | null}
   */
  get() {
    return safeStorage.getItem(JWT_STORAGE_KEY);
  },

  /**
   * @param {string} token
   */
  set(token) {
    safeStorage.setItem(JWT_STORAGE_KEY, token)
  },

  remove() {
    safeStorage.removeItem(JWT_STORAGE_KEY);
  },
};

export default tokenStorage;