import HttpClient from "../HttpClient";
import User from "../User";

const request = new HttpClient("/users").getAxiosMultipartInstance();
class UpdateUserDto {
  id: number;
  image: File;
  name: string;
  emails: string[];
  gender: string;
  status: "activo" | "inactivo";

  constructor(user?: UpdateUserDto) {
    if (user) {
      this.name = user.name;
      this.emails = user.emails;
      this.gender = user.gender;
      this.status = user.status;
      this.image = user.image;
      this.id = user.id;
    } else {
      this.name = "";
      this.emails = [""];
      this.gender = "";
      this.status = "activo";
    }
  }

  update = async (): Promise<User> => {
    const formData = new FormData();

    formData.append("image", this.image || null);
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

    const res = await request.put("/" + this.id, formData);
    return res.data;
  };
}

export default UpdateUserDto;
