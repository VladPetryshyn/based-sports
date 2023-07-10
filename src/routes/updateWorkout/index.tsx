import { useFieldArray, useForm } from "react-hook-form"
import { api } from "../../api/instance";
import { WorkoutFormI, WorkoutsEditingForm } from "../../components/ContentEditing/Workouts/Form";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { WorkoutI } from "../../api/types";
import { LoaderWrapper } from "../../components/Loader";

export const UpdateWorkoutRoute = () => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<WorkoutFormI>()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "workouts",
  })


  const { workoutId } = useParams()
  const { isLoading, data } = useQuery<WorkoutI>(`workout${workoutId}`, () =>
    api.get(`/workouts/workouts/${workoutId}`).then(res => res.data))

  useEffect(() => {
    if (data) {
      setValue("title", data.title)
      setValue("description", data.description)
      data.content.forEach((cont, i) => update(i, cont))
    }
  }, [data])

  const onSubmit = handleSubmit(async (body) => {
    const newBody = {
      ...body,
      content: body.workouts.map((workout) => ({
        ...workout,
        time: new Date(workout.time)
      }))
    }

    await api.put(`/user/workout/${workoutId}`, newBody)
  })

  return <LoaderWrapper
    isLoading={isLoading}
    hasData={!!data}
  >
    <Typography variant="h2" sx={{ mb: 5 }}>
      Update Workout
    </Typography>
    <WorkoutsEditingForm
      fields={fields}
      onSubmit={onSubmit}
      control={control}
      append={append}
      remove={remove}
      errors={errors}
    />
  </LoaderWrapper>
}
