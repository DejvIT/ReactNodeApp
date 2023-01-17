import request from "../utils/request";

class MachineService {
  getAllMachines() {
    return request({
      url: "machines",
      method: "get",
    });
  }
  findMachineByUrl(url) {
    return request({
      url: "machines/by-url/" + url,
      method: "get",
    });
  }
  filter(data) {
    return request({
      url: "machines/filter",
      method: "post",
      data: data
    });
  }
  updateMachines(data) {
    return request({
      url: "machines/update",
      method: "post",
      data: data
    });
  }
}

export default new MachineService();
