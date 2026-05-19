// TODO garder à jour cette URL
const nom_pc = 'aw.313f.fr:8080'
export const SERVER_URL = `http://${nom_pc}/IllicoDraco/`

export const httpToWs = (http) => http.replace(/.*:\/\//, 'ws://')

export const MONEY = 100
export const TIME = 10