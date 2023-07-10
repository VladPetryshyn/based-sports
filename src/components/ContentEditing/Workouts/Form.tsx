import { Add, Delete } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField } from "@mui/material"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { FC } from "react";
import { Control, Controller, FieldArrayWithId, FieldErrors, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form";

export interface WorkoutFormI {
  title: string;
  description: string;
  workouts: { title: string, time: any }[]
}

interface Props {
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
  errors: FieldErrors<WorkoutFormI>
  control: Control<WorkoutFormI, any>,
  fields: FieldArrayWithId<WorkoutFormI, "workouts", "id">[]
  append: UseFieldArrayAppend<WorkoutFormI, "workouts">,
  remove: UseFieldArrayRemove,
}

export const WorkoutsEditingForm: FC<Props> = ({
  onSubmit,
  errors,
  control,
  fields,
  append,
  remove
}) => {
  return <form onSubmit={onSubmit}>
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Controller
          control={control}
          name="title"
          rules={{
            required: { value: true, message: "This field is required" },
            minLength: { value: 8, message: "Min length for the title is 8" }
          }}
          render={({ field }) =>
            <TextField
              {...field}
              error={!!errors.title}
              helperText={errors.title?.message}
              variant="filled"
              label="Title"
            />
          }
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          name="description"
          rules={{ required: { value: true, message: "This field is required" } }}
          render={({ field }) =>
            <TextField
              {...field}
              error={!!errors?.description}
              helperText={errors?.description?.message}
              variant="filled"
              multiline
              maxRows={4}
              label="Description"
            />
          }
        />
      </Grid>
      {fields.map((field, index) =>
        <Grid item key={field.id}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Controller
                control={control}
                name={`workouts.${index}.title`}
                rules={{
                  required: { value: true, message: "This field is required." },
                  minLength: { value: 3, message: "Min length is 3." }
                }}
                render={({ field }) =>
                  <TextField
                    {...field}
                    label={`Title #${index + 1}`}
                    helperText={errors?.workouts?.[index]?.title?.message}
                    error={!!errors?.workouts?.[index]?.title?.message}
                  />
                }
              />
            </Grid>
            <Grid item>
              <Controller
                name={`workouts.${index}.time`}
                control={control}
                rules={{
                  required: { value: true, message: "This field is required." },
                }}
                render={({ field }) =>
                  <TimePicker
                    {...field}
                    views={['minutes', 'seconds']}
                    format="mm:ss"
                  />}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={() => remove(index)}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item>
        <Button onClick={() => append({ time: null, title: "" })}>
          <Add />
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={onSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  </form>
}
