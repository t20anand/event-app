import { useState } from 'react';
import './FormInput.css';

export default function TextArea(props) {
    const [focused, setFocused] = useState(false);
    const{label, errorMessage, onChange, ...inputProps} = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    const handleBlur = (e) => {
        setFocused(false);
    };

    return(
        <>
        <div>
            <label>{label} </label>
            <textarea 
                {...inputProps}
                onChange={onChange} 
                onBlur={handleBlur}
                focused={focused.toString()}
                onFocus={() => {
                    handleFocus();
                }}
            >
            </textarea>
            <span>{errorMessage}</span>
        </div>
        </>
    );
}