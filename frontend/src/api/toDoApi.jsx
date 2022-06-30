import axios from "axios";
import { Navigate } from "react-router-dom";

export const toDoApi = () => {
  const instance = axios.create({
    baseURL: "http://localhost:4001/api",
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
      if (err.response.status === 201) {
        console.log("post error");
        <Navigate to={"/login"} />;
        localStorage.removeItem("token");
      }
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

  const del = async (path, data) => {
    try {
      const response = await instance.delete(
        path,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        },
        data
      );
      return response;
    } catch (error) {
      console.log("DELETE error status: " + error.response.status);
      console.log("DELETE error data: " + error.response.data);
      return error.response;
    }
  };

  return { post, get, del };
};
