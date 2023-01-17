import { UPDATE_CHAT_LOG, UPDATE_CHAT_LOGS_ALL } from "./types";

export function updateChatLog(payload){
  return {
    type: UPDATE_CHAT_LOG,
    payload
  }
}

export function updateChatLogsAll(payload){
  return {
    type: UPDATE_CHAT_LOGS_ALL,
    payload
  }
}