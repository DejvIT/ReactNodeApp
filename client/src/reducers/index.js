import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import chatbot from "./chatbot";

export default combineReducers({
  auth,
  message,
  chatbot,
});