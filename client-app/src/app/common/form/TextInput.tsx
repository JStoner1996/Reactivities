import React from "react";
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface TextInputProps {
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
}

const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} value={field.value ?? ""} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default TextInput;
