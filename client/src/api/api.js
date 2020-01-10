import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3001/",
});

class RequestHttp {
    constructor(transport){
        this.transport = transport
    }
// admin login
    async logIn(email, password){
        return  await this.transport.post("/admin", { email, password })
    };
// participant
    async apply(data){
        console.log(data);
        return await this.transport.post("/apply", data)
    }
}

const requestHttp = new RequestHttp(instance);

export { requestHttp }
