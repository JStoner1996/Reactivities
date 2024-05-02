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
import { Activity } from "../../../app/models/activity";

interface IActivityDetailsProps {
  activity: Activity;
}

const ActivityDetails: React.FC<IActivityDetailsProps> = ({
  activity,
}: IActivityDetailsProps) => {
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
          <Button basic colour="blue" content="Edit" />
          <Button basic colour="grey" content="Cancel" />
        </Button.Group>
      </CardContent>
    </Card>
  );
};

export default ActivityDetails;
