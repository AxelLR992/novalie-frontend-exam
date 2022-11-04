import HttpClient from "../HttpClient";
import User from "../User";

const request = new HttpClient("/users").getAxiosMultipartInstance();
class CreateUserDto {
  image: File;
  name: string;
  emails: string[];
  gender: string;
  status: "activo" | "inactivo";

  constructor(user?: CreateUserDto) {
    if (user) {
      this.name = user.name;
      this.emails = user.emails;
      this.gender = user.gender;
      this.status = user.status;
      this.image = user.image;
    } else {
      this.name = "";
      this.emails = [""];
      this.gender = "";
      this.status = "activo";
    }
  }

  create = async (): Promise<User> => {
    const formData = new FormData();

    formData.append("image", this.image);
    formData.append("name", this.name);
    formData.append("gender", this.gender);
    formData.append("status", this.status);

    if (this.emails.length) {
      for (let i = 0; i < this.emails.length; i++) {
        const email = this.emails[i];
        formData.append(`emails[${i}]`, email);
      }
    } else {
      formData.append("emails", "[]");
    }

    const res = await request.post("/", formData);
    return res.data;
  };
}

export default CreateUserDto;
