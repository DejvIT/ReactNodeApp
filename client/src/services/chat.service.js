import request from "../utils/request";

class ChatService {
  findAllByUserId(id) {
    return request({
      url: "chats/" + id,
      method: "get",
    });
  }
}

export default new ChatService();