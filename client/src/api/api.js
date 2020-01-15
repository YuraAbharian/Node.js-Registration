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

    return  await this.transport.post("/admin", { email: Email, password: Password })
    };
// user add
    async addUser({Email, Password, Username, Lastname}){

        return  await this.transport.post("/addUser", { email: Email, password: Password, username: Username, lastname: Lastname  })
    };
    // remove or restore
    async removeOrRestore(id, isDeleted){

        return  await this.transport.post("/sortDeleteUser", {id, isDeleted})
    };
    // delete user
    async deleteUser(id){

        return  await this.transport.delete(`/deleteUser/${id}`)
    };

    // update user
    async updateUser(obj){
        return  await this.transport.put("/update", { obj })
    };

//get user

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
    async changeStatus(id, status){
        return await this.transport.put("/changeStatus", {id, status})
    }
}

const requestHttp = new RequestHttp(instance);

export { requestHttp }
