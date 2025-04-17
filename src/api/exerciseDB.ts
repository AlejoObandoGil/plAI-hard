import axios from 'axios'

// Usar directamente la API key para evitar problemas con variables de entorno
// const API_KEY = '3b5c5c74c9msh7dbe56ec9692257p1b5be8jsnad52e2b501fc'
const API_KEY = '417c3cb213c0bb28fb16cee3312dff493c8231e9'

const BASE_URL = 'https://exercisedb.p.rapidapi.com'

export const exerciseDB = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
})
