import { ErrorMessage, Form, Formik } from "formik";
import TextInput from "../../app/common/form/TextInput";
import { Button, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

function LoginForm(): JSX.Element {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch(() => setErrors({ error: "Invalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <TextInput placeholder="email" name="email" />
          <>bob@test.com - FOR TESTING PURPOSES</>
          <TextInput placeholder="password" name="password" type="password" />
          <>Pa$$w0rd - FOR TESTING PURPOSES</>
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            positive
            content="Login"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}

export default observer(LoginForm);
