import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

interface ActivityListItemProps {
  activity: Activity;
}

const ActivityListItem: React.FC<ActivityListItemProps> = ({ activity }) => {
  const { activityStore } = useStore();
  const { loading, deleteActivity } = activityStore;

  const [target, setTarget] = useState<string>("");

  const handleDeleteActivity = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  };

  return (
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
            as={Link}
            to={`/activities/${activity.id}`}
          />
          <Button
            name={activity.id}
            floated="right"
            content="Delete"
            color="red"
            loading={loading && target === activity.id}
            onClick={(e) => handleDeleteActivity(e, activity.id)}
          />
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ActivityListItem;
