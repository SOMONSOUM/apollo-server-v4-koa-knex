import * as dotenv from 'dotenv'
import { getIpAddress, getServerAddress } from '../utils/getServerAddress'
dotenv.config()

export const ipAddress = getIpAddress()
export const PORT = process.env.PORT ? Number(process.env.PORT) : 4000
export const SECRET_KEY = process.env.SECRET_KEY || 'fafamnx!!2d**8z'

export const serverAddress =
  process.env.NODE_ENV === 'development'
    ? getServerAddress(false, ipAddress!, PORT)
    : process.env.SERVER_ADDRESS
