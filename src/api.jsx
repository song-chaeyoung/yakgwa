import { useQueries } from "@tanstack/react-query";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

const API_BASE_URL = "http://localhost:4000/api/drugs";

export const getAllDrugs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching drugs:", error);
    throw error;
  }
};

export const searchDrugName = async (keyword) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/itemName?keyword=${encodeURIComponent(keyword)}`
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
    const response = await fetch(
      `${API_BASE_URL}/efcyQesitm?keyword=${encodeURIComponent(keyword)}`
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
    const response = await fetch(
      `${API_BASE_URL}/entpName?keyword=${encodeURIComponent(keyword)}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching drugs:", error);
    throw error;
  }
};

export const getSearchDrugList = async (keywordParams) => {};
