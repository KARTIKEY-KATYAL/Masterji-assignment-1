class ApiCall {
  constructor() {
    this.baseURL = "http://127.0.0.1:3000/api/v1";
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async CustomFetch(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = { ...this.defaultHeaders, ...options.headers };

      const config = {
        ...options,
        headers,
        credentials: "include",
      };

      console.log(`Fetching URL ${url}`);
      const result = await fetch(url, config);
      const data = await result.json();

      return data;
    } catch (error) {
      console.error("API Error", error);
      throw error;
    }
  }

  async signup(name, email, password) {
    return this.CustomFetch("/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }
  async login(email, password) {
    return this.CustomFetch("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }
  async getProfile() {
    return this.CustomFetch("/users/me");
  }
}
