import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

function NotFound(): JSX.Element {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - We've searched everywhere but could not find what you are looking
        for!
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities">
          Return to Activities page
        </Button>
      </Segment.Inline>
    </Segment>
  );
}

export default NotFound;
