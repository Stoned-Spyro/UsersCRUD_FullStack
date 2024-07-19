import httpService from "./httpBaseService";

class UserApiService {
  getAll() {
    return httpService.get("/users");
  }

  get(id) {
    return httpService.get(`/users/${id}`);
  }

  create(data) {
    return httpService.post(`/users/addUser`, data);
  }

  update(id, data) {
    return httpService.put(`/users/updateUser/${id}`, data);
  }

  delete(id) {
    return httpService.delete(`/users/deleteUser/${id}`);
  }
}

export default new UserApiService();
