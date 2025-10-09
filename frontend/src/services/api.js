// src/services/api.js
const API_BASE_URL = "http://127.0.0.1:5000"; // Flask backend URL

// ✅ Fetch all hotels
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

// ✅ Fetch a single hotel by ID
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
