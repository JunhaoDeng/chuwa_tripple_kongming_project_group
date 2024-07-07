import '../styles/Form.css';
import Field from './Field';
import { CloseOutlined } from '@ant-design/icons';
import { RootState } from '../redux/store';
import { signinSetEmail, signinSetEmailErrormsg, signinSetPassword, signinSetPasswordErrormsg } from '../redux/slice';
import { HOST } from '../config';
import { useSelector } from 'react-redux';

type SigninDataType = {
  email: string,
  enc_password: string
};

// a's will be replaced by Link element in the future

export default function SigninForm() {
    const checkEmailFunc = (data: string) => {
        // eslint-disable-next-line no-useless-escape
        if (data.length === 0) {
            return "Email cannot be empty";
        }
        return "";
      }
  
    const checkPasswordFunc = (data: string) => {
        if (data.length === 0) {
            return "Password cannot be empty";
        }
        return "";
      }
    
    const emailSelector = (state: RootState) => state.signin.email;
    
    const passwordSelector = (state: RootState) => state.signin.password;
  
    let email: string = useSelector(emailSelector);
    let password: string = useSelector(passwordSelector);

    const handleFormSubmit = () => {
      const signinData: SigninDataType = {
        email: email,
        enc_password: password
      };
      console.log(signinData);
      
      const options = {
        method: "POST",
        body: JSON.stringify(signinData),
        headers: {
          "Content-Type": "application/json"
        }
      }
      fetch(`${HOST}/api/auth/signin`, options)
      .then(response => response.json())
      .then(data => {
        console.log("success");
        console.log(data.token);
        sessionStorage.setItem("token", data.token)
      })
      .catch(err => {
        alert("Authentication failed: " + err);
      })
    }
    return (
        <div className='form_container'>
          <div className='form'>
            <div className='close_icon_container'><CloseOutlined /></div>
            <div className='form_title'>Sign in to your account</div>
            <Field label='Email' ssid='signin_email' type='email' checkFunc={ checkEmailFunc } 
                placeholder='Enter your email' 
                inputDataSelectorFunc={ emailSelector }
                errormsgDataSelectorFunc={ (state: RootState) => state.signin.email_errormsg }
                inputDataAction={ signinSetEmail }
                errormsgAction={ signinSetEmailErrormsg }/>
            <Field label='Password' ssid='signin_password' type='password' checkFunc={ checkPasswordFunc }
                placeholder='Enter your password' 
                inputDataSelectorFunc={ passwordSelector }
                errormsgDataSelectorFunc={ (state: RootState) => state.signin.password_errormsg}
                inputDataAction={ signinSetPassword }
                errormsgAction={ signinSetPasswordErrormsg }/>
            <button className='form_submit_button' onClick={ handleFormSubmit }>Sign in</button>
            <div className='bottomrow'> 
                <div className='alt'>Don't have an account? <a className='link' href='google.com'>Sign up</a></div>
                <a className='link' href='google.com'>Forgot password?</a>
            </div>
          </div>
        </div>
    )
}