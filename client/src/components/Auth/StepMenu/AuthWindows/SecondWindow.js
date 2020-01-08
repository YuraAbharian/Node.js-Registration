import React from 'react';
import {DatePicker, Select} from 'antd';
import moment from "moment";
import {antdInput} from "../../../../functions";
import cn from "classnames";

const SecondWindow = (props) => {

    const {RangePicker} = DatePicker;
    const {getFieldDecorator, state, dispatch} = props;
    const isBirthdate = state.errors.Birthdate && state.errors.Birthdate.errors.length > 0;
    const isGender = state.errors.Gender && state.errors.Gender.errors.length > 0;
    const isRangePicker = state.errors.RangePicker && state.errors.RangePicker.errors.length > 0;

    const {Option} = Select;

    const styles = {
        marginBottom: 0,
        height: "56px"
    };

    return (
        <div>
            <div className="RangePicker">
                {getFieldDecorator("RangePicker", {
                    rules: [{required: true, message: `Please input your dates!`}],
                })(<RangePicker
                    className={cn('', {'has-error': (isGender)})}
                    onChange={() => dispatch({
                        type: "ON_CHANGE_ERR",
                        payload: {RangePicker: {errors: []}}
                    })}
                    ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    format="YYYY/MM/DD HH:mm:ss"
                />)}
                {isRangePicker && state.errors.RangePicker.errors[0].message ?
                    <span
                        className={cn('', {'errFont': (isRangePicker)})}>{state.errors.RangePicker.errors[0].message}</span> : null}
            </div>


            {antdInput(getFieldDecorator, 'Company', styles)}
            {antdInput(getFieldDecorator, 'Position', styles)}
            <div className="Gender">
                {
                    getFieldDecorator("Gender", {
                        rules: [{required: true, message: `Please input your Gender!`}],
                    })
                    (<Select
                        className={cn('', {'has-error': (isGender)})}
                        onChange={() => dispatch({
                            type: "ON_CHANGE_ERR",
                            payload: {Gender: {errors: []}}
                        })}
                        placeholder="Gender"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select>)

                }
                {isGender && state.errors.Gender.errors[0].message ?
                    <span
                        className={cn('', {'errFont': (isGender)})}>{state.errors.Gender.errors[0].message}</span> : null}
            </div>
            <div className="Birthdate">
                {getFieldDecorator("Birthdate", {
                    rules: [{required: true, message: `Please input your Birthdate!`}],
                })(<DatePicker className={cn('date_picker_width', {'has-error': (isBirthdate)})}
                     showToday={false}
                    placeholder="Birthdate" onChange={() => dispatch({
                    type: "ON_CHANGE_ERR",  payload: {Birthdate: {errors: []}}   })}/>)}
                {isBirthdate && state.errors.Birthdate.errors[0].message ?
                    <span className={cn('', {'errFont': (isBirthdate)})}>{state.errors.Birthdate.errors[0].message}</span> : null}
            </div>
        </div>
    );
};

export default SecondWindow;
