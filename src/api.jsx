// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
// export const API_BASE_URL = "/api/drugs";

export const getAllDrugs = async () => {
  try {
    const response = await fetch(
      `${API_URL}?serviceKey=${API_KEY}&pageNo=1&numOfRows=100&type=json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching drugs:", error);
    throw error;
  }
};

export const searchDrugName = async (keyword) => {
  try {
    // const response = await fetch(
    //   `${API_BASE_URL}/itemName?keyword=${encodeURIComponent(keyword)}`
    // );
    const response = await fetch(
      `${API_URL}?serviceKey=${API_KEY}&pageNo=1&numOfRows=100&type=json&itemName=${encodeURIComponent(
        keyword
      )}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching drugs:", error);
    throw error;
  }
};

export const searchDrugEfcyQesitm = async (keyword) => {
  try {
    // const response = await fetch(
    //   `${API_BASE_URL}/efcyQesitm?keyword=${encodeURIComponent(keyword)}`
    // );
    const response = await fetch(
      `${API_URL}?serviceKey=${API_KEY}&pageNo=1&numOfRows=100&efcyQesitm=${encodeURIComponent(
        keyword
      )}&type=json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching drugs:", error);
    throw error;
  }
};

export const searchDrugEntpName = async (keyword) => {
  try {
    // const response = await fetch(
    //   `${API_BASE_URL}/entpName?keyword=${encodeURIComponent(keyword)}`
    // );
    const response = await fetch(
      `${API_URL}?serviceKey=${API_KEY}&pageNo=1&numOfRows=100&entpName=${encodeURIComponent(
        keyword
      )}&type=json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching drugs:", error);
    throw error;
  }
};

export const searchDrugiItemSeq = async (keyword) => {
  try {
    // const response = await fetch(
    //   `${API_BASE_URL}/itemSeq?keyword=${encodeURIComponent(keyword)}`
    // );
    const response = await fetch(
      `${API_URL}?serviceKey=${API_KEY}&pageNo=1&numOfRows=100&type=json&itemSeq=${encodeURIComponent(
        keyword
      )}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching drugs:", error);
    throw error;
  }
};

export const getSearchDrugList = async (keywordParams) => {};
