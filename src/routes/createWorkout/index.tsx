import { useFieldArray, useForm } from "react-hook-form"
import { api } from "../../api/instance";
import { WorkoutsEditingForm } from "../../components/ContentEditing/Workouts/Form";


interface FormI {
  title: string;
  description: string;
  workouts: { title: string, time: any }[]
}

export const CreateWorkoutRoute = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormI>()
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


    const resp = await api.post("/user/workout", newBody)

    console.log(resp)
  })

  return <WorkoutsEditingForm
    fields={fields}
    onSubmit={onSubmit}
    control={control}
    append={append}
    remove={remove}
    errors={errors}
  />
}
