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
    const dateFormat = 'YYYY/MM/DD';
    const {Option} = Select;

    const styles = {
        marginBottom: 0,
        height: "56px"
    };

    return (
        <div>
            <div className="form_container_header">
                <h1>SingUp</h1>
            </div>
            <div className="RangePicker">
                {getFieldDecorator("RangePicker", {
                    initialValue: state.values.RangePicker && state.values.RangePicker,
                    rules: [{required: true, message: `Please input your dates!`}],
                })(<RangePicker
                    format={dateFormat}
                    className={cn('', {'has-error': (isGender)})}
                    onChange={() => dispatch({
                        type: "ON_CHANGE_ERR",
                        payload: {RangePicker: {errors: []}}
                    })}
                    ranges={{
                        Today: [moment(), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }}
                />)}
                {isRangePicker && state.errors.RangePicker.errors[0].message ?
                    <span
                        className={cn('', {'errFont': (isRangePicker)})}>{state.errors.RangePicker.errors[0].message}</span> : null}
            </div>

            {antdInput(getFieldDecorator, 'Company', styles, state)}
            {antdInput(getFieldDecorator, 'Position', styles, state)}

            <div className="Gender">
                {
                    getFieldDecorator("Gender", {
                        initialValue: state.values.Gender,
                        rules: [{required: true, message: `Please input your Gender!`}],
                    })
                    (<Select
                        // value={state.values.Gender}
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
                    initialValue: state.values.Birthdate && state.values.Birthdate,
                    rules: [{required: true, message: `Please input your Birthdate!`}],
                })(<DatePicker
                    format={dateFormat}
                    className={cn('date_picker_width', {'has-error': (isBirthdate)})}
                    showToday={false}
                    placeholder="Birthdate" onChange={() => dispatch({
                    type: "ON_CHANGE_ERR", payload: {Birthdate: {errors: []}}
                })}/>)}
                {isBirthdate && state.errors.Birthdate.errors[0].message ?
                    <span
                        className={cn('', {'errFont': (isBirthdate)})}>{state.errors.Birthdate.errors[0].message}</span> : null}
            </div>
        </div>
    );
};

export default SecondWindow;
