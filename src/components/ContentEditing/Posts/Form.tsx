import { Button, Grid, TextField, Typography } from "@mui/material"
import { Editor } from "./Editor"
import { Control, Controller, FieldErrors, } from "react-hook-form";
import { FC } from "react";
import { Editor as EditorI } from "@tiptap/react";

interface FormI {
  title: string;
  description: string;
}

interface Props {
  errors: FieldErrors<FormI>
  control: Control<FormI, any>
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
  contentErr: string;
  setEditor: (editor: EditorI | null) => void
}

export const PostsEditingForm: FC<Props> = ({
  errors,
  control,
  onSubmit,
  contentErr,
  setEditor,
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
              fullWidth
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
              fullWidth
            />
          }
        />
      </Grid>
      <Grid item>
        <Editor
          setEditor={setEditor}
          error={contentErr}
        />
      </Grid>
      <Grid item>
        <Button onClick={onSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  </form>
}
