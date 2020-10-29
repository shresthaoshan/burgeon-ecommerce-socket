import { createContext } from 'react'
import io from 'socket.io-client'

const SocketConnection = createContext(io())

export default SocketConnection