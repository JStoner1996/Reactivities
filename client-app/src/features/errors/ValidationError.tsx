import { Message } from "semantic-ui-react";

interface ValidationErrorProps {
  errors: string[];
}

const ValidationError: React.FC<ValidationErrorProps> = ({ errors }) => {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((error: string, i) => (
            <Message.Item key={i}>{error}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
};

export default ValidationError;
