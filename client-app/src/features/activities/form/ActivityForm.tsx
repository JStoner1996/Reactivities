import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Button, Header, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import { categoryOptions } from "../../../app/common/form/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";

const ActivityForm: React.FC = () => {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loadActivity,
    loading,
    loadingInitial,
  } = activityStore;

  const { id } = useParams();

  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: null,
    city: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required."),
    description: Yup.string().required("The activity description is required."),
    category: Yup.string().required("The category is required."),
    date: Yup.string().required("The date is required."),
    venue: Yup.string().required("A venue is required."),
    city: Yup.string().required("A city is required."),
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: Activity) => {
    if (!activity.id) {
      activity.id == uuid();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  };

  if (loadingInitial) return <LoadingComponent content="Loading Activity..." />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <TextInput name="title" placeholder="Title" />
            <TextArea name="description" placeholder="Description" rows={3} />
            <SelectInput
              name="category"
              placeholder="Category"
              options={categoryOptions}
            />
            <DateInput
              name="date"
              placeholderText="Date"
              showTimeSelect
              timeCaption="Time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
            />
            <Header content="Location Details" sub color="teal" />
            <TextInput name="city" placeholder="City" />
            <TextInput name="venue" placeholder="Venue" />
            <Button
              floated="right"
              positive
              type="submit"
              content="Submit"
              loading={loading}
              disabled={isSubmitting || !dirty || !isValid}
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
