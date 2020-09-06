import axios from "axios";

axios.defaults.baseURL = "https://open-hack-u-2020-backend.herokuapp.com/";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export function get(path) {
  return request("get", path, null);
}

export function patch(path, body) {
  return request("patch", path, body);
}

export function post(path, body) {
  return request("post", path, body);
}

export function deleteRequest(path, body) {
  return request("delete", path, body);
}

function request(method, path, body) {
  return axios({
    method: method,
    url: path,
    data: body,
  }).then(function (response) {
    return response.data;
  });
}
