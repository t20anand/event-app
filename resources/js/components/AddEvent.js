import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

import CustomDatePicker from './FormInput/CustomDatePicker';
import  useEventStore  from '../stores/EventStore';
import FormatDate from '../utils/FormatDate';
import Input from './FormInput/Input';
import TextArea from './FormInput/TextArea';
import { toast } from 'react-toastify';

const formInitialState = {
    title: "",
    desc: "",
    start_date: "",
    end_date: "",
}

export default function AddEvent() {
    const {isLoading, addEvent,postEvent} = useEventStore((state) => ({
        isLoading: state.isLoading,
        addEvent: state.addEvent,
        postEvent: state.postEvent,
    }));

    const [values, setValues] = useState(formInitialState);
    const [serverValidationErrors, setServerValidationErrors] = useState();

    const onChangeHandler = (name, value) => {
        setValues({...values, [name]: value});
    }

    const resetForm = () => {
        setValues(formInitialState);
        setServerValidationErrors({})

    }

    const onSubmitHandler = (e) => {
        e.preventDefault(); 
        
        postEvent(values)
        .then(res => {
            if(res.status == 200) 
                return res.json();
            else
                throw (res);
        })
        .then(resJson => {
            toast.success(resJson.message);
            addEvent(resJson.data);
            resetForm();
        })
        .catch(error => {
            return error.json();  
        })
        .then(errorJson => {
            if(errorJson){
                toast.error(errorJson.message);

                let errors = {};
                Object.keys(errorJson.errors).map((key) => {
                    errors[key] = errorJson.errors[key][0];
                })
                setServerValidationErrors(errors);
            }
        });
    }


    return (
        <>
            <div className='float-start'><h4>Add New Event</h4></div>
            <div className='float-end clearfix'>
                <Link className="btn btn-info" to="/">Back</Link>
            </div>
            <br/><br/><br/>

            <form onSubmit={onSubmitHandler}>
                <div className="form-group col-md-4"> 
                    <Input
                        {
                            ...{
                                name: "title",
                                type: "text",
                                placeholder: "Event Title",
                                className: 'form-control',
                                errorMessage: "Event Title should be minimum 5 characters and shouldn't include any special character!",
                                label: "Event Title: ",
                                pattern: "^[A-Za-z0-9 ,.]{5,}$",
                                required: true,
                            }
                        }
                        value={values['title']} 
                        onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                    />
                    <div className='error'>{serverValidationErrors?.title}</div>
                </div>

                <br/>
                <div className="form-group col-md-6">
                    <TextArea
                        {
                            ...{
                                name: "desc",
                                placeholder: "Event Description",
                                className: 'form-control',
                                errorMessage: "Event Description is required",
                                label: "Event Description: ",
                                required: true,
                            }
                        }
                        value={values['desc']} 
                        onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                    />
                    <div className='error'>{serverValidationErrors?.desc}</div>
                </div>

                <br/>
                <div className='form-group row'>
                    <div className="col-md-3">
                        <CustomDatePicker
                            {
                                ...{
                                    dateFormat: "yyyy-MM-dd HH:mm:ss",
                                    name: "start_date",
                                    className: 'form-control',
                                    showTimeSelect: true,
                                    errorMessage: "Start Date is required",
                                    label: "Start Date: ",
                                    required: true,
                                }
                            }
                            value={values['start_date']} 
                            onChange={(selectedDate) => {
                                let date = FormatDate(new Date(selectedDate));
                                onChangeHandler('start_date', date)
                            }} 
                        />
                        <div className='error'>{serverValidationErrors?.start_date}</div>
                    </div>

                    <div className="col-md-3">
                        <CustomDatePicker
                            {
                                ...{
                                    dateFormat: "yyyy-MM-dd HH:mm:ss",
                                    name: "end_date",
                                    className: 'form-control',
                                    showTimeSelect: true,
                                    errorMessage: "End Date is required",
                                    label: "End Date: ",
                                    required: true,
                                }
                            }
                            value={values['end_date']} 
                            onChange={(selectedDate) => {
                                let date = FormatDate(new Date(selectedDate));
                                onChangeHandler('end_date', date)
                            }} 
                        />
                        <div className='error'>{serverValidationErrors?.end_date}</div>
                    </div>
                </div>
                
                <br/>
                <div className="form-group">
                    <button className='btn btn-success' type='submit'>Save</button>
                </div>
            </form>
        </>
    );
}