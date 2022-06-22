import axios from "axios";

export const toDoApi = () => {
  const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    timeout: 3000,
  });

  const post = async (path, data) => {
    try {
      const response = await instance.post(path, data, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      console.log("HTTP RESPONSE DATA: ", response?.data?.login);
      return response;
    } catch (err) {
      console.log("POST error status: ", err?.response?.status);
      console.log("POST error data: ", err?.response?.data);
      return err?.response;
    }
  };

  const get = async (path) => {
    try {
      const response = await instance.get(path, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      return response;
    } catch (error) {
      console.log("GET error status: " + error.response.status);
      console.log("GET error data: " + error.response.data);
      return error.response;
    }
  };

  return { post, get };
};
