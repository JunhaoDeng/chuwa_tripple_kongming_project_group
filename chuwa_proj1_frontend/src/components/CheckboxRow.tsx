import { AppDispatch } from "../redux/store";
import "../styles/CheckboxRow.css"
import { useDispatch, useSelector } from "react-redux";
/* eslint-disable @typescript-eslint/no-explicit-any */
type CheckboxRowPropType = {
    label: string,
    dataSelectorFunc: (state: any) => any,
    clickAction: any
}

export default function CheckboxRow(props: CheckboxRowPropType) {
    const isChecked = useSelector( props.dataSelectorFunc );
    // const [isChecked, setisChecked] = useState<boolean>(false); // test
    const dispatch: AppDispatch = useDispatch()

    const handleCheckboxChange = (e: any) => {
        dispatch(props.clickAction(e.target.checked));        
    }

    return <div className="checkbox_row">
        <div className="checkbox_label">{ props.label }</div>
        <input className="checkbox" type="checkbox" checked={ isChecked } onChange={ handleCheckboxChange }/>
    </div>
}