import { useFieldArray, useForm } from "react-hook-form"
import { api } from "../../api/instance";
import { WorkoutsEditingForm } from "../../components/ContentEditing/Workouts/Form";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { WorkoutI } from "../../api/types";

type workout = { title: string, time: any }

interface FormI {
  title: string;
  description: string;
  workouts: workout[]
}

export const UpdateWorkoutRoute = () => {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormI>()
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
      data.content.forEach((cont: workout, i: number) => update(i, cont))
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

  return isLoading ? <CircularProgress /> : <WorkoutsEditingForm
    fields={fields}
    onSubmit={onSubmit}
    control={control}
    append={append}
    remove={remove}
    errors={errors}
  />
}
