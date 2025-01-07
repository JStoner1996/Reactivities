import React from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface IActivityListProps {
  activities: Activity[];
  selectActivity: (id: string) => void;
}

const ActivityList: React.FC<IActivityListProps> = ({
  activities,
  selectActivity,
}: IActivityListProps) => {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>

              <Item.Meta>{activity.date}</Item.Meta>

              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>

              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => selectActivity(activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
