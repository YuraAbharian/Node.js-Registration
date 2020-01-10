import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3001/",
});

class RequestHttp {
    constructor(transport){
        this.transport = transport
    }
// admin login
    async logIn({Email, Password}){
        console.log(Email, Password);
        return  await this.transport.post("/admin", { email: Email, password: Password })
    };
// participant
    async apply(data){

        return await this.transport.post("/apply", data)
    }
}

const requestHttp = new RequestHttp(instance);

export { requestHttp }
