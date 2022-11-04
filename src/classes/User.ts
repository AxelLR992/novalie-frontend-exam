import axios from "axios";
import HttpClient from "./HttpClient";
import Service from "./Service";

const request = new HttpClient("/users").getAxiosInstance();
class User implements Service {
  id: number;
  imageURL: string;
  name: string;
  emails: string[];
  gender: string;
  status: "activo" | "inactivo";

  constructor(
    user?: User,
    id: number = 0,
    imageURL: string = "",
    name: string = "",
    emails: string[] = [],
    gender: string = "",
    status: "activo" | "inactivo" = "activo"
  ) {
    if (!user) {
      this.id = id;
      this.imageURL = imageURL;
      this.name = name;
      this.emails = emails;
      this.gender = gender;
      this.status = status;
    } else {
      this.id = user.id;
      this.imageURL = user.imageURL;
      this.name = user.name;
      this.emails = user.emails;
      this.gender = user.gender;
      this.status = user.status;
    }
  }

  public static getAll = async (params: IUserParams): Promise<User[]> => {
    const res = await request.get("/", {
      params,
    });
    const users = res.data.map((user: User) => new User(user));
    return users;
  };

  getImageFromURL = async (): Promise<File> => {
    const res = await axios({
      method: "GET",
      responseType: "blob",
      url: this.imageURL,
    })
    const blob = res.data;
    const image = new File([blob], "image");
    return image;
  }

  create(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  delete = async () => {
    const res = await request.delete("/" + this.id);
    return res.data;
  };

  update(params?: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export default User;

interface IUserParams {
  page: number;
}
