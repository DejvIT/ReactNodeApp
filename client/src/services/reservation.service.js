import request from "../utils/request";

class ReservationService {
  createReservation(data) {
    return request({
      url: "reservations",
      method: "post",
      data: data,
    });
  }
  updateReservation(data, id) {
    return request({
      url: "reservations/" + id,
      method: "put",
      data: data,
    });
  }
  deleteReservation(id) {
    return request({
      url: "reservations/" + id,
      method: "delete",
    });
  }
  findReservationByMachineId(id) {
    return request({
      url: "reservations/by-machine/" + id,
      method: "get",
    });
  }
  findReservationByUserId(id, params) {
    return request({
      url: "reservations/by-user/" + id,
      method: "get",
      params: params,
    });
  }
}

export default new ReservationService();