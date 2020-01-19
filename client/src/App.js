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
// import EditUserContainer from "./components/User/EditUserContainer";
// import EditParticipantContainer from "./components/Participant/EditParticipant/EditParticipantContainer";
import ConferenceContainer from "./components/Conference/ConferenceContainer";
import Context from "./Context/Context";

const  App =()=> {
    return (
        <BrowserRouter>
            <Context>
                <Provider store={store}>

                    <div>

                          <HeaderContainer/>

                              <Route exact path='/apply' render={() => <StepMenu/>}/>
                              <Route exact path='/' render={() => <ConferenceContainer/>}/>
                              <Route exact path='/admin' render={() => <AdminContainer/>}/>
                              <Route path='/menu' render={() => <ContainerSideBar/>}/>

                    </div>

                </Provider>
            </Context>
        </BrowserRouter>

    );
};

export default App;
