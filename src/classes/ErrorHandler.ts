import axios from "axios";

class ErrorHandler {
  error: unknown;

  constructor(error: unknown) {
    this.error = error;
  }

  getMessage = () => {
    if (axios.isAxiosError(this.error)) {
      const response = this.error.response;
      if (response) {
        const data = response.data;
        if (data.length) return data[0];
        if (data.errors) {
          if (data.errors.length) return data.errors[0].msg;
        }
        if (data.error) {
          return `Error: ${data.error} ${data.message && `- ${data.message}`}`;
        }
      }
    }
    if (typeof this.error === "string") return this.error;
    if (this.error instanceof Error) return this.error.message;

    return "Unknown error";
  };

  getHttpStatus = () => {
    if (axios.isAxiosError(this.error)) {
      const status = this.error.response?.status;
      return status;
    }
  };
}

export default ErrorHandler;
