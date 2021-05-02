const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

const headers = new Headers();
headers.append("Content-Type", "application/json");

async function fetchJson(url, options) {
    try {
      const response = await fetch(url, options);
      if (response.status < 200 || response.status > 399) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  }

  export async function listTrickList(signal) {
    const url = `${API_BASE_URL}/trickLists`;
    return await fetchJson(url, { signal });
  }

  // export async function listTricks(signal,)