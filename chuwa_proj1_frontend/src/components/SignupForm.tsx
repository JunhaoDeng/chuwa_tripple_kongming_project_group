import '../styles/Form.css';
import Field from './Field';
import CheckboxRow from './CheckboxRow';
import { CloseOutlined } from '@ant-design/icons';
import { RootState } from '../redux/store';
import { signupSetEmail, signupSetEmailErrormsg, signupSetPassword, signupSetPasswordErrormsg } from '../redux/slice';

// a's will be replaced by Link element in the future

export default function SignUpForm() {
    const checkEmailFunc = (data: string) => {
      // eslint-disable-next-line no-useless-escape
      const re: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(data)) {
        return "";
      } else {
        return "Invalid email address"
      }
    }

    const checkPasswordFunc = (data: string) => {
      if (data.length < 8 || data.length > 16) {
        return "Password must contain 8-16 characters";
      }
      if(/\s/.test(data)) {
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
    }

    return (
      <div className='form_container'>
        <div className='form'>
          <div className='close_icon_container'><CloseOutlined /></div>
          <div className='form_title'>Sign up an account</div>
          <Field label='Email' type='email' checkFunc={ checkEmailFunc } 
              placeholder='Enter your email' inputDataSelectorFunc={ (state: RootState) => state.signup.email }
              errormsgDataSelectorFunc={ (state: RootState) => state.signup.email_errormsg }
              inputDataAction={ signupSetEmail }
              errormsgAction={ signupSetEmailErrormsg }/>
          <Field label='Password' type='password' checkFunc={ checkPasswordFunc }
              placeholder='Enter your password' inputDataSelectorFunc={ (state: RootState) => state.signup.password }
              errormsgDataSelectorFunc={ (state: RootState) => state.signup.password_errormsg}
              inputDataAction={ signupSetPassword }
              errormsgAction={ signupSetPasswordErrormsg }/>
          <CheckboxRow label='This is a vendor account' dataSelectorFunc={ () => {} }/>
          <button className='form_submit_button'>Create Account</button>
          <div className='alt_label'>Already have an account? <a className='link' href='google.com'>Sign in</a></div>
        </div>
      </div>
    )
}