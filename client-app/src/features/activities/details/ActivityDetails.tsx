import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Image,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponents";

const ActivityDetails: React.FC = () => {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    openForm,
    cancelSelectedActivity: cancelSelectedAcitivity,
  } = activityStore;

  if (!activity) return <LoadingComponent />;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span>{activity.date}</span>
        </CardMeta>
        <CardDescription>{activity.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <Button.Group widths="2">
          <Button
            basic
            colour="blue"
            content="Edit"
            onClick={() => openForm(activity.id)}
          />
          <Button
            basic
            colour="grey"
            content="Cancel"
            onClick={cancelSelectedAcitivity}
          />
        </Button.Group>
      </CardContent>
    </Card>
  );
};

export default ActivityDetails;
