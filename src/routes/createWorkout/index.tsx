import { useFieldArray, useForm } from "react-hook-form"
import { api } from "../../api/instance";
import { WorkoutFormI, WorkoutsEditingForm } from "../../components/ContentEditing/Workouts/Form";
import { Typography } from "@mui/material";


export const CreateWorkoutRoute = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<WorkoutFormI>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workouts",
  })

  const onSubmit = handleSubmit(async (body) => {
    const newBody = {
      ...body,
      content: body.workouts.map((workout) => ({
        ...workout,
        time: new Date(workout.time)
      }))
    }

    await api.post("/user/workout", newBody)
  })

  return <>
    <Typography variant="h2" sx={{ mb: 5 }}>
      Create Workout
    </Typography>
    <WorkoutsEditingForm
      fields={fields}
      onSubmit={onSubmit}
      control={control}
      append={append}
      remove={remove}
      errors={errors}
    />
  </>
}
