import React from 'react';
import HeaderContainer from "./components/Header/HeaderContainer";
// import AuthContainer from "./components/Auth/AuthContainer";
import {BrowserRouter, Route} from "react-router-dom";
import StepMenu from "./components/Auth/StepMenu/StepMenu";
import {Provider} from "react-redux";
import store from "./store";
import AdminContainer from "./components/Admin/AdminContainer";

const  App =()=> {
    return (
        <BrowserRouter>

                <Provider store={store}>

                <div>
                    <HeaderContainer/>
                    {/*<AuthContainer/>*/}
                  {/*` <AdminContainer/>*/}
                    <Route exact path='/apply' render={() => <StepMenu/>}/>
                </div>

                </Provider>

        </BrowserRouter>

    );
};

export default App;
