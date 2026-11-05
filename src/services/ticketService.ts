import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export interface Ticket {
  id: string
  titre: string
  description: string
  demandeur: string
  priorite: string
  statut: string
  dateCreation: string
}

export async function getTickets(): Promise<Ticket[]> {
  const response = await api.get<Ticket[]>('/tickets')
  return response.data
}
