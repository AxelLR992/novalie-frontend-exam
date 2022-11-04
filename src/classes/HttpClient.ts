import axios from "axios";
import env from "react-dotenv";

class HttpClient {
  path: string;
  private baseURL = env.REACT_APP_API_URL;

  constructor(path: string) {
    this.path = path;
  }

  getAxiosInstance = () => {
    return axios.create({
      baseURL: this.baseURL + this.path,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  getAxiosMultipartInstance = () => {
    return axios.create({
      baseURL: this.baseURL + this.path,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
}

export default HttpClient;
