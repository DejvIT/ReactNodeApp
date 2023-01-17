import request from "../utils/request";

class TicketService {
  createTicket(data) {
    return request({
      url: "tickets",
      method: "post",
      data: data,
    });
  }
}

export default new TicketService();