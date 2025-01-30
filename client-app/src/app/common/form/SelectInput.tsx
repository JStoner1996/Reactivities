import { useField } from "formik";
import React from "react";
import { Form, Label, Select } from "semantic-ui-react";

interface SelectInputProps {
  placeholder: string;
  name: string;
  options: Options;
  label?: string;
}

const SelectInput: React.FC<SelectInputProps> = (props: SelectInputProps) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(_, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default SelectInput;
