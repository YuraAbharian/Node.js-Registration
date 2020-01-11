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
// user add
    async addUser({Email, Password, Username, Lastname}){

        return  await this.transport.post("/addUser", { email: Email, password: Password, username: Username, lastname: Lastname  })
    };

    async getUser(){
        return await this.transport.get("/getUser")
    }
// participant
    async apply(data){

        return await this.transport.post("/apply", data)
    }
    async getParticipant(){
        return await this.transport.get("/getParticipant")
    }
}

const requestHttp = new RequestHttp(instance);

export { requestHttp }
