import { useState } from "react"
import "../styles/CheckboxRow.css"
/* eslint-disable @typescript-eslint/no-explicit-any */
type CheckboxRowPropType = {
    label: string,
    dataSelectorFunc: (state: any) => any
}

export default function CheckboxRow(props: CheckboxRowPropType) {
    // const isChecked = useSelector( props.dataSelectorFunc );
    const [isChecked, setisChecked] = useState<boolean>(false); // test

    const handleCheckboxChange = (e: any) => {
        setisChecked(e.target.checked);
    }

    return <div className="checkbox_row">
        <div className="checkbox_label">{ props.label }</div>
        <input className="checkbox" type="checkbox" checked={ isChecked } onChange={ handleCheckboxChange }/>
    </div>
}