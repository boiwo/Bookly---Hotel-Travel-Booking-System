// src/services/api.js
const API_BASE_URL = "http://127.0.0.1:5001"; // Flask backend URL

// ==================== HOTELS ====================

export async function fetchHotels() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/hotels`);
    if (!response.ok) throw new Error("Failed to fetch hotels");
    return await response.json();
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
}

export async function fetchHotelById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${id}`);
    if (!response.ok) throw new Error("Failed to fetch hotel");
    return await response.json();
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return null;
  }
}

// ==================== AUTH ====================

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || "Login failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function signupUser(username, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || "Signup failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}
