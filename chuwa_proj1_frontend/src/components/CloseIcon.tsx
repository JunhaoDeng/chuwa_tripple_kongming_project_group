import { CloseOutlined } from "@ant-design/icons";
import { NavigateFunction, useNavigate } from "react-router-dom"
import '../styles/Form.css';

export default function CloseIcon() {
    const navigate: NavigateFunction = useNavigate();
    return <div className='close_icon_container' onClick={ () => navigate("/products") }><CloseOutlined /></div>
}