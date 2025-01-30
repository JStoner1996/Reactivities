import React from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";

import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

const DateInput: React.FC<DatePickerProps> = (props: DatePickerProps) => {
  const [field, meta, helpers] = useField(props.name!);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(value: any) => helpers.setValue(value)}
        popperPlacement="bottom-start"
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default DateInput;
