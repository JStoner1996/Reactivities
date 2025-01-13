import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../API/agent";
import LoadingComponent from "./LoadingComponents";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  const handleCreateOrEditActivity = (activity: Activity) => {
    setSubmitting(true);
    const saveActivity = activity.id
      ? agent.Activities.update(activity).then(() => {
          setActivities(
            activities.map((x) => (x.id === activity.id ? activity : x))
          );
        })
      : agent.Activities.create({ ...activity, id: uuid() }).then(() => {
          setActivities([...activities, activity]);
        });

    saveActivity.finally(() => {
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    });
  };

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  };

  if (activityStore.loadingInitial) return <LoadingComponent />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default observer(App);
