const axios = require("axios");

const http = () => {
  const instance = axios.create({
    baseURL: "",
    timeout: 3000,
  });

  const post = async (...params) => {
    try {
      const response = await instance.post(...params); //
      console.log("HTTP RESPONSE DATA: ", response?.data);
      return response;
    } catch (err) {
      console.log("POST error status: ", err?.response?.status);
      console.log("POST error data: ", err?.response?.data);
      return err.response;
    }
  };

  const get = async (...params) => {
    try {
      const response = await instance.get(...params);
      return response;
    } catch (error) {
      console.log("GET error status: " + error.response.status);
      console.log("GET error data: " + error.response.data);
      return error.response;
    }
  };

  return { post, get, _instance: instance };
};

module.exports = http();
