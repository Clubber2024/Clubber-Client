import { InputHTMLAttributes } from "react";

export default function CheckBox({
    id,
    name,
    text,
    onChange,
    type,
    checked,
}) {
    return (
        <div className="checkbox_container">
            <input
                type="checkbox"
                id={id}
                name={name}
                onChange={onChange}
                $isCircle={type === "circle"}
                checked={checked}
            />
            <label htmlFor={id}>{text}</label>
        </div>
    );
}