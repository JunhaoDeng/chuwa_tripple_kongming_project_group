import { NavigateFunction, useNavigate } from 'react-router-dom';
import { updatePasswordSetEmail, updatePasswordSetEmailErrormsg } from '../redux/slice';
import { RootState } from '../redux/store';
import '../styles/Form.css';
import Field from './Field';
import { CloseOutlined } from '@ant-design/icons';
import CloseIcon from './CloseIcon';

export default function UpdatePwdForm() {
    const navigate: NavigateFunction = useNavigate();

    const checkEmailFunc = (data: string) => {
        // eslint-disable-next-line no-useless-escape
        if (data.length === 0) {
            return "Email cannot be empty";
        }
        return "";
    }

    return (
        <div className='form_container'>
          <div className='form'>
            <CloseIcon />
            <div className='form_title' style={{marginBottom: "2rem"}}>Update your password</div>
            <div className='email_row'>Enter you email link, we will send you the recovery link</div>
            <Field label='Email' type='email' checkFunc={ checkEmailFunc } 
                placeholder='Enter your email' inputDataSelectorFunc={ (state: RootState) => state.update_password.email }
                errormsgDataSelectorFunc={ (state: RootState) => state.update_password.email_errormsg }
                inputDataAction={ updatePasswordSetEmail }
                errormsgAction={ updatePasswordSetEmailErrormsg }/>
            <button className='form_submit_button' onClick={() => navigate("/update-success")}>Update password</button>
          </div>
        </div>
    )
}