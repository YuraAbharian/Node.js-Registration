import React, {useState} from 'react';
import "./StepMenu.css";
import {Steps, message} from 'antd';
import AuthContainer from "../AuthContainer";

const {Step} = Steps;
const StepMenu = () => {

    const [state, setState] = useState(0);

    const confirmEmail = " On your email was sent a message to confirm your registration follow the link in message";

    const stateHandler = () => setState(prevState => prevState !== 1 ? prevState + 1 : prevState - 1);

    const done = ()=> setState("done");
    const steps = [
        {
            title: 'First',
            content: <AuthContainer stateHandler={stateHandler} buttonTitle="Next" messageSuccess={message}
                                    stepsState={state} onForm="First"/>,
        },
        {
            title: 'Second',
            content: <AuthContainer done={done} messageSuccess={message} confirmEmail={confirmEmail} buttonTitle="Previous"
                                    stepsState={state}       stateHandler={stateHandler} onForm="Second" />,
        },
    ];

    return (
        <div className="steps_container">
            <Steps current={state}>
            {steps.map(item => (
                    <Step key={item.title} title={item.title}/>
                ))}
            </Steps>
            {/*{ steps.map(obj=> <div className="steps-content">{obj.content}</div> )}*/}
         { typeof Number() &&  <div className="steps-content">{steps[state].content}</div>}

        </div>
    );
};

export default StepMenu;