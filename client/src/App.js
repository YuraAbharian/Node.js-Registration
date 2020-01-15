import React from 'react';
import HeaderContainer from "./components/Header/HeaderContainer";
// import AuthContainer from "./components/Participant/AuthContainer";
import {BrowserRouter, Route} from "react-router-dom";
import StepMenu from "./components/StepMenu/StepMenu";
import {Provider} from "react-redux";
import store from "./store";
import AdminContainer from "./components/Admin/AdminContainer";
import UserContainer from "./components/User/UserContainer";
import ContainerSideBar from "./components/SideBar/ContainerSideBar";
import EditUserContainer from "./components/User/EditUserContainer";
import EditParticipantContainer from "./components/Participant/EditParticipant/EditParticipantContainer";

const  App =()=> {
    return (
        <BrowserRouter>

                <Provider store={store}>

                    <div>

                          <HeaderContainer/>

                              <Route exact path='/apply' render={() => <StepMenu/>}/>
                              <Route exact path='/admin' render={() => <AdminContainer/>}/>
                              <Route exact path='/user' render={() => <UserContainer/>}/>
                              <Route exact path='/menu' render={() => <ContainerSideBar/>}/>
                              <Route exact path='/menu/editUser/:id' render={() => <EditUserContainer/>}/>
                              <Route exact path='/menu/applyParticipant/:id' render={() => <EditParticipantContainer/>}/>

                    </div>

                </Provider>

        </BrowserRouter>

    );
};

export default App;
