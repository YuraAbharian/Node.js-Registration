import React, {useState} from 'react';
import "./StepMenu.css";
import {Steps, message} from 'antd';
import AuthContainer from "../Participant/AuthContainer";


const {Step} = Steps;
const StepMenu = () => {

    const [state, setState] = useState(0);

    const confirmEmail = " On your email was sent a message to confirm your registration follow the link in message";

    const stateHandler = () => setState(prevState => prevState !== 1 ? prevState + 1 : prevState - 1);

    const done = () => setState(2);

    const steps = [
        {
            title: 'Form 1',
            content: <AuthContainer stateHandler={stateHandler} buttonTitle="Next" messageSuccess={message}
                                    stepsState={state} onForm="First"/>,
        },
        {
            title: 'Form 2',
            content: <AuthContainer done={done} messageSuccess={message} confirmEmail={confirmEmail}
                                    buttonTitle="Previous"
                                    stepsState={state} stateHandler={stateHandler} onForm="Second"/>,
        },
        {
            title: 'Finish',
            content: <AuthContainer  onForm="Third" confirmEmail={confirmEmail} />,
        },
    ];

    return (
        <div className="steps_container">
            {typeof state === 'number' && <Steps current={state}>
                {steps.map(item => <Step key={item.title} title={item.title}/>)}
            </Steps>}

            {
                typeof state === 'number' && steps[state].content &&
            <div className="steps-content">{steps[state].content}</div>
            }
        </div>
    );
};

export default StepMenu;
