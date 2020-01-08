import React, {useState} from 'react';
import "./StepMenu.css";
import {Steps, message} from 'antd';
import AuthContainer from "../AuthContainer";

const {Step} = Steps;
const StepMenu = () => {

    const [state, setState] = useState(0);

    const confirmEmail = " On your email was sent a message to confirm your registration follow the link in message";

    const next = () => setState(prevState => prevState + 1);
    const prev = () => setState(prevState => prevState - 1);

    const steps = [
        {
            title: 'First',
            content: <AuthContainer buttonTitle="Next" stepButton={next} stepsState={state} onForm="First"/>,
        },
        {
            title: 'Second',
            content: <AuthContainer messageSuccess={message} confirmEmail={confirmEmail} buttonTitle="Previous"
                                    onForm="Second"  stepButton={prev}/>,
        },
    ];

    return (
        <div className="steps_container">
            <Steps current={state}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title}/>
                ))}
            </Steps>
            <div className="steps-content">{steps[state].content}</div>

        </div>
    );
};

export default StepMenu;
