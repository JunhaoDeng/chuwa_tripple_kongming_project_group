import "../styles/Form.css";
import Field from "./Field";
import CheckboxRow from "./CheckboxRow";
import { CloseOutlined } from "@ant-design/icons";
import { RootState, AppDispatch } from "../redux/store";
import {
  signupSetEmail,
  signupSetEmailErrormsg,
  signupSetIsvendor,
  signupSetPassword,
  signupSetPasswordErrormsg,
} from "../redux/slice";
import { useDispatch, useSelector } from "react-redux";
// import { hash } from "bcrypt"; // bcrypt cause react unable to run so I use native crypto instead.
import { HOST } from "../config";
import { useNavigate } from "react-router-dom";
import { signupClearEmail, signupClearPassword } from "../redux/slice";
import CloseIcon from "./CloseIcon";
import React, { useState } from "react";

// a's will be replaced by Link element in the future

type SignupDataType = {
  id: number;
  email: string;
  enc_password: string;
  type: string;
};

export default function SignUpForm() {
  const [isFormValid, setIsFormValid] = useState(false); // state to track overall form validity
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const checkEmailFunc = (data: string) => {
    // eslint-disable-next-line no-useless-escape
    const re: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(data)) {
      return "";
    } else {
      return "Invalid email address";
    }
  };

  const checkPasswordFunc = (data: string) => {
    if (data.length < 8 || data.length > 16) {
      return "Password must contain 8-16 characters";
    }
    if (/\s/.test(data)) {
      return "Password cannot contain whitespace";
    }
    if (!/[A-Z]/.test(data)) {
      return "Password must contain uppercase letter";
    }
    if (!/[a-z]/.test(data)) {
      return "Password must contain lowercase letter";
    }
    if (!/[0-9]/.test(data)) {
      return "Password must contain digit";
    }
    if (!/[^a-zA-Z0-9\s]/.test(data)) {
      return "Password must contain special character";
    }
    return "";
  };

  const email_selector = (state: RootState) => state.signup.email;

  const email_errormsg_selector = (state: RootState) =>
    state.signup.email_errormsg;

  const pwd_selector = (state: RootState) => state.signup.password;

  const pwd_errormsg_selector = (state: RootState) =>
    state.signup.password_errormsg;

  const vendorchecked_selector = (state: RootState) =>
    state.signup.isvendor_checked;

  const email: string = useSelector(email_selector);
  const password: string = useSelector(pwd_selector);
  const is_vendor: boolean = useSelector(vendorchecked_selector);

  // const emailError = useSelector(email_errormsg_selector);
  // const passwordError = useSelector(pwd_errormsg_selector);

  // const hasError = emailError !== "" || passwordError !== "";

  const handleFormSubmit = () => {
    const signup_data: SignupDataType = {
      id: 0,
      email: email,
      enc_password: password,
      type: is_vendor ? "vendor" : "user",
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signup_data),
    };
    fetch(`${HOST}/api/auth/signup`, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const token = sessionStorage.getItem("token");
        //clear session storage
        sessionStorage.clear();
        sessionStorage.setItem("token", token as string);
        dispatch(signupSetEmail(""));
        dispatch(signupSetEmailErrormsg(""));
        dispatch(signupSetPassword(""));
        dispatch(signupSetPasswordErrormsg(""));
        // alert("Signup Success: " + data.message);
        navigate("/signin");
      }) // TODO: other things
      .catch((err) => {
        // TODO: redirect to something went wrong page
        alert("Signup Error: " + err);
      });
  };

  const handleSigninNav = () => {
    // dispatch(signupClearEmail());
    // dispatch(signupClearPassword());
    navigate("/signin");
  };

  const handleInputChange = (value: string, valid: boolean) => {
    // logic to handle input change and validity
    setIsFormValid(valid);
  };

  return (
    <div className="form_container">
      <div className="form">
        <CloseIcon />
        <div className="form_title">Sign up an account</div>
        <Field
          label="Email"
          ssid="signup_email"
          type="email"
          checkFunc={checkEmailFunc}
          placeholder="Enter your email"
          inputDataSelectorFunc={email_selector}
          errormsgDataSelectorFunc={email_errormsg_selector}
          inputDataAction={signupSetEmail}
          errormsgAction={signupSetEmailErrormsg}
          onInputChange={handleInputChange}
        />
        <Field
          label="Password"
          ssid="signup_password"
          type="password"
          checkFunc={checkPasswordFunc}
          placeholder="Enter your password"
          inputDataSelectorFunc={pwd_selector}
          errormsgDataSelectorFunc={pwd_errormsg_selector}
          inputDataAction={signupSetPassword}
          errormsgAction={signupSetPasswordErrormsg}
          onInputChange={handleInputChange}
        />
        <CheckboxRow
          label="This is a vendor account"
          ssid="signup_checkbox"
          dataSelectorFunc={vendorchecked_selector}
          clickAction={signupSetIsvendor}
        />
        <button
          className="form_submit_button"
          onClick={handleFormSubmit}
          disabled={!isFormValid}
        >
          Create Account
        </button>
        <div className="alt_label">
          Already have an account?{" "}
          <a className="link" onClick={handleSigninNav}>
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
