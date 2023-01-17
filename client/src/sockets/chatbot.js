import React, { createContext } from 'react'
import io from 'socket.io-client';

import { useDispatch } from 'react-redux';
import { updateChatLog } from '../actions/chatbot';

const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }) => {
  let socket;
  let ws;

  const dispatch = useDispatch();

  const sendMessage = (userId, message) => {
    const payload = {
      userId: userId,
      data: message
    }
    console.log('tady jsem', payload)
    socket.emit("event://send-message", JSON.stringify(payload));
    // dispatch(updateChatLog(payload));
  }

  if (!socket) {
    socket = io.connect("http://localhost:8080")

    socket.on("event://get-message",(payload) => {
      dispatch(updateChatLog(payload));
    })

    ws = {
      socket: socket,
      sendMessage
    }
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )

}