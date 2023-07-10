import { Button, Grid, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { api } from "../../api/instance";
import { AxiosError } from "axios";
import { useDispatch } from "../../hooks/redux";
import { setData } from "../../store/reducers/user";
import { useNavigate } from "react-router-dom";

interface FormI {
  username: string;
  password: string;
}

export const LoginRoute = () => {
  const { control, handleSubmit, formState: { errors }, setError } = useForm<FormI>()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submit = handleSubmit(async (body) => {
    try {
      const { data } = await api.post("/auth/login", body)
      if (data.token) {
        dispatch(setData({ username: body.username, token: data.token }))
        navigate(`/profile/${body.username}`)
        api.defaults.headers.common.token = data.token
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err?.response?.data) Object.keys(err.response.data).forEach((key) => {
          if (err instanceof AxiosError)
            setError(key as keyof FormI, { message: err?.response?.data[key] })
        })
      }
    }
  })

  return <form onSubmit={submit}>
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h2">
          Login
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
          onClick={submit}
          color={Object.keys(errors).length > 0 ? "error" : undefined}
        >Login</Button>
      </Grid>
    </Grid>
  </form>
}
