import { clientFetch } from '../clientFetch'

export const login = (body) => {
  return clientFetch.post('user/login', body)
}

export const register = (body) => {
  return clientFetch.post('user/register', body)
}

export const logout = () => {
  return clientFetch.get('user/logout')
}

export const refresh = () => {
  return clientFetch.get('user/refresh')
}