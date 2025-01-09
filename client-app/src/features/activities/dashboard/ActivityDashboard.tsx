import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface IActivityDashboardProps {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  editMode: boolean;
  submitting: boolean;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

const ActivityDashboard: React.FC<IActivityDashboardProps> = ({
  activities,
  selectedActivity,
  editMode,
  submitting,
  selectActivity,
  cancelSelectActivity,
  openForm,
  closeForm,
  createOrEdit,
  deleteActivity,
}: IActivityDashboardProps) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectedActivity={cancelSelectActivity}
            openForm={openForm}
          />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity}
            submitting={submitting}
            closeForm={closeForm}
            createOrEdit={createOrEdit}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
