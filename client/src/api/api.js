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
<<<<<<< HEAD

    return  await this.transport.post("/admin", { email: Email, password: Password })
=======
 
    return  await this.transport.post("/admin", { email: Email, password: Password })  
>>>>>>> cb92cefca0c854692de1dcc6f485ca74fabc1a50
    };
// user add
    async addUser({Email, Password, Username, Lastname}){

        return  await this.transport.post("/addUser", { email: Email, password: Password, username: Username, lastname: Lastname  })
    };
<<<<<<< HEAD
    // remove or restore
    async removeOrRestore(id, isDeleted){

        return  await this.transport.post("/sortDeleteUser", {id, isDeleted})
    };
    // delete user
    async deleteUser(id){

        return  await this.transport.delete(`/deleteUser/${id}`)
    };

//get user

=======
 
//get user
 
>>>>>>> cb92cefca0c854692de1dcc6f485ca74fabc1a50
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
