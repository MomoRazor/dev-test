import { config } from 'dotenv'

config()

if (!process.env.API_URL) {
    throw new Error('API_URL environment variable not set')
}

export const API_URL = process.env.API_URL

export const PORT = process.env.PORT || 3000
