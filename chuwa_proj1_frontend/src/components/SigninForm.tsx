import '../styles/Form.css';
import Field from './Field';
import { CloseOutlined } from '@ant-design/icons';

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
  
    return (
        <div className='form_container'>
          <div className='form'>
            <div className='close_icon_container'><CloseOutlined /></div>
            <div className='form_title'>Sign in to your account</div>
            <Field label='Email' type='email' checkFunc={ checkEmailFunc } 
                placeholder='Enter your email' inputDataSelectorFunc={ () => {} }/>
            <Field label='Password' type='password' checkFunc={ checkPasswordFunc }
                placeholder='Enter your password' inputDataSelectorFunc={ () => {} }/>
            <button className='form_submit_button'>Sign in</button>
            <div className='bottomrow'> 
                <div className='alt'>Don't have an account? <a className='link' href='google.com'>Sign up</a></div>
                <a className='link' href='google.com'>Forgot password?</a>
            </div>
          </div>
        </div>
    )
}