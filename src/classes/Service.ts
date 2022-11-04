abstract class Service {
    async create(): Promise<any> {
      throw new Error("Method not implemented");
    }
  
    async delete(): Promise<any> {
      throw new Error("Method not implemented");
    }
  
    async update(params?: any): Promise<any> {
      throw new Error("Method not implemented");
    }
  }
  
  export default Service;
  