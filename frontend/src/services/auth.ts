import axios from 'axios'

const API_URL = 'http://localhost:8080'

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
}

export interface LoginData {
  email: string;
  senha: string;
}

export async function registerUser(data: RegisterData) {
  return axios.post(`${API_URL}/auth/register`, data)
}

export async function loginUser(data: LoginData) {
  return axios.post(`${API_URL}/auth/login`, data)
}
