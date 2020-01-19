import React, {useContext} from 'react';
import cn from "classnames";
import moment from "moment";
import countryList from "react-select-country-list";
import {WidgetContext} from "../../../Context/Context";

const ParticipantWindow = (props) => {
    const { getFieldDecorator , state, dispatch } = props;
    const { antdInput, selectorHandler, showError, Pickers, isTrueHandler } = useContext(WidgetContext);

    const isBirthdate =  isTrueHandler(state, "Birthdate");
    const isGender = isTrueHandler(state, "Gender");
    const isRangePicker = isTrueHandler(state, "RangePicker") ;
    const isCountry = isTrueHandler(state, "CountryPicker") ;
    const isRole = isTrueHandler(state, "Role");
    const dateFormat = 'YYYY/MM/DD';
    const genderArr =[{ label: "Male"}, { label: "Female"}];
    const roleArr = [{label: "Listener"}, { label: "Speaker"}];

    const styles = {
        marginBottom: 0,
        height: "56px"
    };


    return (
        <div>
            {antdInput(getFieldDecorator,'Username','', state )}
            {antdInput(getFieldDecorator,'Lastname','', state )}
            {antdInput(getFieldDecorator,'Email','', state)}
            <div className="RangePicker">
                { Pickers(getFieldDecorator, "RangePicker", isRangePicker, state, dispatch, cn, "EditRangePicker",moment, dateFormat, '', props.config ) }
                { showError(isRangePicker, state, cn, "RangePicker", '') }
            </div>
            { antdInput(getFieldDecorator, 'Company', styles, state) }
            { antdInput(getFieldDecorator, 'Position', styles, state) }
            <div className="Role"  style={{height:50}}>
                { selectorHandler(getFieldDecorator, "Role",  state.values.Role, isRole, "Role", "ON_CHANGE_ERR", dispatch, cn, roleArr , "Select", "Option"  )}
                { showError(isRole, state, cn, "Role", '') }
            </div>
            <div className="Gender">
                { selectorHandler(getFieldDecorator, "Gender",  state.values.Gender, isGender, "Gender", "ON_CHANGE_ERR", dispatch, cn, genderArr , "Select","Option"  )}
                { showError(isGender, state, cn, "Gender", '') }
            </div>
            <div className="Birthdate">
                { Pickers(getFieldDecorator, "Birthdate", isBirthdate, state, dispatch, cn, "EditDatePicker", moment, dateFormat, 'date_picker_width' , props.config)}
                { showError(isBirthdate, state, cn, "Birthdate", '') }
            </div>
            <div className="Country">
                { selectorHandler(getFieldDecorator, "CountryPicker",  state.values.CountryPicker, isCountry, "Country picker", "ON_CHANGE_ERR", dispatch, cn, "Country", "Select","Option", countryList  )}
                { showError(isCountry, state, cn, "CountryPicker", '')}
            </div>
            <div className="Country">
               <span>Status: <b className={cn("", {"accept": props.currParticipant.Status==="Approve", "denny": props.currParticipant.Status==="Decline"})}> { props.currParticipant.Status }</b></span>
            </div>
        </div>
    );
};

export default ParticipantWindow;