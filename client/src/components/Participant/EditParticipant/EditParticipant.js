import React, { useEffect, useCallback, useContext } from 'react';
import {Button, Card, Divider, Icon} from "antd";
import "../Participant.css";
import moment from "moment"
import { WidgetContext } from '../../../Context/Context';


const EditParticipant = (props) => { 

    const {currParticipant, changeStatusThunk,selectedAreaThunk, history} = props;
     
    const { onEscapePress, onClickHandler } = useContext(WidgetContext);
    onEscapePress(useCallback, useEffect, props, 2) 


    const toUpCase = (el) => {
        return el[0].toUpperCase() + el.slice(1);
    };


    return currParticipant ? (
        <div>
            <Card title={currParticipant.Username + ' ' + currParticipant.Lastname} className="participantEdit"
                  extra={<Icon onClick={()=>onClickHandler(props, 2)} type={"close"}
                               style={{color: 'rgba(0,0,0,.25)'}}/>}
            >
                <p>{`Company:  ${toUpCase(currParticipant.Company)}`}</p>
                <p>{`Position: ${toUpCase(currParticipant.Position)}`}</p>
                <p>{`Role ${toUpCase(currParticipant.Role)}`}</p>
                <p>{`Gender ${toUpCase(currParticipant.Gender)}`}</p>
                <p>{`Birthdate: ${ moment.unix(currParticipant.Birthdate).format('LL')}`}</p>
                <p>{`Country: ${toUpCase(currParticipant.CountryPicker)}`}</p>
                <p>{`Visit conference: ${moment.unix(currParticipant.RangePicker[0]).format("LL") + ' - ' + moment.unix(currParticipant.RangePicker[1]).format("LL")}`}</p>
                <p>{`Status: ${toUpCase(currParticipant.Status)}`}</p>
                <div className="divider">
                    <Button onClick={()=> changeStatusThunk(currParticipant._id, "Approve")} className="approve">Approve</Button>
                    <Divider type="vertical"/>
                    <Button onClick={()=> changeStatusThunk(currParticipant._id, "Decline") } className="decline">Decline</Button>
                </div>
            </Card>
        </div>) : null
};

export default EditParticipant;

