import { CloseOutlined } from "@ant-design/icons"
import "../styles/EmailNotification.css"
import "../styles/Form.css"
import image from "./emailicon.png"
import CloseIcon from "./CloseIcon"


export default function EmailNotification() {
    return (
        <div className='form_container'>
          <div className='form'>
            <CloseIcon />
            <div className="emailnote">
                <div className="mailicon_container"><img src={ image } alt="email sent"/></div>
                <div className="mailsent_text">
                    We have sent the update password link to your email, please check that!
                </div>
            </div>
          </div>
        </div>
    )
}