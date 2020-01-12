import React from 'react';
import {DatePicker, Select} from 'antd';
import moment from "moment";
import {antdInput, selectorHandler, showError, Pickers, isTrueHandler} from "../../../functions";
import cn from "classnames";
import countryList from 'react-select-country-list'

const SecondWindow = (props) => {

    const {RangePicker} = DatePicker;
    const {getFieldDecorator, state, dispatch} = props;
    const isBirthdate =  isTrueHandler(state, "Birthdate");
    const isGender = isTrueHandler(state, "Gender");
    const isRangePicker = isTrueHandler(state, "RangePicker") ;
    const isCountry = isTrueHandler(state, "CountryPicker") ;
    const isRole = isTrueHandler(state, "Role");
    const dateFormat = 'YYYY/MM/DD';
    const {Option} = Select;
    const genderArr =[{ label: "Male"}, { label: "Female"}];
    const roleArr = [{label: "Listener"}, { label: "Speaker"}];

    const styles = {
        marginBottom: 0,
        height: "56px"
    };

    return (
        <div>
            <div className="form_container_header">
                <h1>Profile</h1>
            </div>
            <div className="RangePicker">
                { Pickers(getFieldDecorator, "RangePicker", isRangePicker, state, dispatch, cn, RangePicker,moment, dateFormat ) }
                { showError(isRangePicker, state, cn, "RangePicker", '') }
            </div>
                { antdInput(getFieldDecorator, 'Company', styles, state) }
                { antdInput(getFieldDecorator, 'Position', styles, state) }
            <div className="Role"  style={{height:50}}>
                { selectorHandler(getFieldDecorator, "Role",  state.values.Role, isRole, "Role", "ON_CHANGE_ERR", dispatch, cn, roleArr , Select, Option  )}
                { showError(isRole, state, cn, "Role", '') }
            </div>
            <div className="Gender">
                { selectorHandler(getFieldDecorator, "Gender",  state.values.Gender, isGender, "Gender", "ON_CHANGE_ERR", dispatch, cn, genderArr , Select,Option  )}
                { showError(isGender, state, cn, "Gender", '') }
            </div>
            <div className="Birthdate">
                { Pickers(getFieldDecorator, "Birthdate", isBirthdate, state, dispatch, cn, DatePicker, moment, dateFormat, 'date_picker_width' )}
                { showError(isBirthdate, state, cn, "Birthdate", '') }
            </div>
                <div className="Country">
                { selectorHandler(getFieldDecorator, "CountryPicker",  state.values.CountryPicker, isCountry, "Country picker", "ON_CHANGE_ERR", dispatch, cn, "Country", Select,Option, countryList  )}
                { showError(isCountry, state, cn, "CountryPicker", '')}
            </div>

        </div>
    );
};

export default SecondWindow;
