import React from 'react';
import HeaderContainer from "./components/Header/HeaderContainer";
// import AuthContainer from "./components/Auth/AuthContainer";
import {BrowserRouter, Route} from "react-router-dom";
import StepMenu from "./components/Auth/StepMenu/StepMenu";

const  App =()=> {
    return (
        <BrowserRouter>
            <Route>
                <div>
                    <HeaderContainer/>
                    {/*<AuthContainer/>*/}
                    <StepMenu/>
                </div>
            </Route>
        </BrowserRouter>

    );
};

export default App;
