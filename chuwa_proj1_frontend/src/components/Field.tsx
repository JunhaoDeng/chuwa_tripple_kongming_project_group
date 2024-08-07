/* eslint-disable @typescript-eslint/no-explicit-any */
import "../styles/Field.css";
import { RootState, AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import React, { useState } from "react";

type FieldPropType = {
  label: string;
  ssid?: string; // id for retrieving session storage
  type: string;
  // this check function will check if current input data (which is stored in redux) is valid.
  // if valid, return an empty string
  // if invalid, return error message
  checkFunc: (data: string) => string;
  placeholder: string;
  inputDataSelectorFunc: (state: RootState) => any;
  errormsgDataSelectorFunc: (state: RootState) => any;
  onInputChange: (value: string, valid: boolean) => void; // callback function
  inputDataAction: any;
  errormsgAction: any;
  label_bold?: boolean;
  input_disabled?: boolean;
  additional_styles?: any;
};

export default function Field(props: FieldPropType) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isValid, setIsValid] = useState(true); // state to track input validity
  const input_data = useSelector(props.inputDataSelectorFunc);
  const error_msg = useSelector(props.errormsgDataSelectorFunc);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (props.ssid !== undefined) {
      const data = sessionStorage.getItem(props.ssid);
      if (data !== null) {
        dispatch(props.inputDataAction(data));
      }
    }
  }, [dispatch]);

  const handleInputChange = (value: string) => {
    dispatch(props.inputDataAction(value));
    props.onInputChange(input_data, false);
    // console.log(input_data);
    // const msg: string = props.checkFunc(input_data);
    // setIsValid(msg === ""); // update validity state
    // props.onInputChange(value, msg === ""); // notify parent component
    // dispatch(props.errormsgAction(msg));
    if (props.ssid !== undefined) {
      sessionStorage.setItem(props.ssid, value);
    }
  };

  const handleCheck = () => {
    const msg: string = props.checkFunc(input_data);
    setIsValid(msg === ""); // update validity state
    props.onInputChange(input_data, msg === ""); // notify parent component
    dispatch(props.errormsgAction(msg));
  };

  return (
    <div className="field">
      <div className={"field_label " + (props.label_bold ? "bold" : "")}>
        {props.label}
      </div>
      <input
        className={"field_input" + (error_msg === "" ? "" : " redborder")}
        type={props.type}
        placeholder={props.placeholder}
        disabled={props.input_disabled}
        value={input_data}
        onChange={(e) => handleInputChange(e.target.value)}
        onBlur={handleCheck}
        style={props.additional_styles}
      />
      <div className="error_msg">{error_msg}</div>
    </div>
  );
}
