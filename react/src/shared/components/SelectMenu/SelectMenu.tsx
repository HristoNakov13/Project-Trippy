import React, { useMemo } from "react";

import { Form } from "react-bootstrap";
import SelectMenuValue from "./select-menu-values-interface";

interface Props {
    onChange: any,
    onBlur: any,
    name: string,
    isInvalid?: boolean,
    disabledOption?: string,
    selected?: any,
    values: Array<SelectMenuValue>,
}

const SelectMenu: React.FC<Props> = ({ onChange, onBlur, isInvalid = false, name, disabledOption, values, selected }) => {
    const options = useMemo(() =>
        (values.map((current: SelectMenuValue) => {
            return <option
                key={current.id}
                value={current.id}
                selected={current.value === selected}
            >
                {current.value}
            </option>
        })), [values, selected]);

    return <Form.Control as="select"
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        isInvalid={isInvalid}>
        {disabledOption && <option selected disabled>{disabledOption}</option>}
        {options}
    </Form.Control>
};

export default SelectMenu;


