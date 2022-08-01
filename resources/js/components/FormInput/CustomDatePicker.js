import React, { forwardRef, useState } from "react";
import ReactDatePicker from "react-datepicker";

export default function CustomDatePicker(props) {
    const [selectedDate, setSelectedDate] = useState();
    const {label, onChange, errorMessage, ...inputProps} = props;

    const DatePickerCustomInput = forwardRef(({value, onClick, onChange, className}, ref) => {
        const [focused, setFocused] = useState(false);

        const handleFocus = (e) => {
            setFocused(true);
        };

        const handleBlur = (e) => {
            setFocused(false);
        };

        return(
            <>
                <input className={className} onClick={onClick} onChange={onChange} ref={ref} value={value} onBlur={handleBlur} focused={focused.toString()} onFocus={() => handleFocus()} required={inputProps.required}/>
                <span>{errorMessage}</span>
            </>
        )
        
    });

    return(
        <>
            <label>{label} </label>
            <ReactDatePicker
                {...inputProps}
                selected= {selectedDate}
                onChange={(selectedDate) => {
                    setSelectedDate(selectedDate);
                    onChange(selectedDate);
                }} 
                
                customInput={<DatePickerCustomInput />}
            />
            
        </>
    );
}