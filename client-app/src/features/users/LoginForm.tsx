import { Form, Formik } from "formik";
import TextInput from "../../app/common/form/TextInput";
import { Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

const LoginForm: React.FC = () => {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => userStore.login(values)}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <TextInput placeholder="email" name="email" />
          <TextInput placeholder="password" name="password" type="password" />
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
};

export default observer(LoginForm);
