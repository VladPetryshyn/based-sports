import { Button, Grid, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import { api } from "../../api/instance";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface FormI {
  username: string;
  password: string;
}

export const RegisterRoute = () => {
  const { control, handleSubmit, formState: { errors }, setError } = useForm<FormI>()
  const navigate = useNavigate()

  const submit = handleSubmit(async (body) => {
    try {
      await api.post("/auth/register", body)
      return navigate("/login")
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err?.response?.data) Object.keys(err.response.data).forEach((key) => {
          setError(key as keyof FormI, { message: err.response.data[key] })
        })
      }
    }
  })

  return <form onSubmit={submit}>
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h2">
          Register
        </Typography>
      </Grid>
      <Grid item>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "This field is required" },
            minLength: { value: 4, message: "Minimum length is 4" },
            maxLength: { value: 13, message: "Minimum length is 13" },
          }}
          render={({ field }) => <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            {...field}
            error={!!errors.username}
            helperText={errors.username?.message}
          />}
          name="username"
        />
      </Grid>
      <Grid item>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "This field is required" },
            minLength: { value: 8, message: "Minimum length is 8" },
          }}
          render={({ field }) => <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            {...field}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          }
          name="password"
        />
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={submit}>Register </Button>
      </Grid>
    </Grid>
  </form>
}
