import { UPDATE_CHAT_LOG, UPDATE_CHAT_LOGS_ALL } from "../actions/types";

const initialState = {
  chatLog: [],
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch(type){
    case UPDATE_CHAT_LOG:
      const data = [...state.chatLog, payload]
      const filter = [...new Set(data.map(item => { return JSON.stringify(item) }))];
      return { chatLog: filter.map(item => { return JSON.parse(item) }) };

    case UPDATE_CHAT_LOGS_ALL:
      return { chatLog: payload };

    default:
      return state;
  }
}