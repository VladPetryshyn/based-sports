import { CircularProgress, Grid, Typography } from "@mui/material"
import { useQuery } from "react-query"
import { api } from "../../api/instance"
import { ContentI } from "../../api/types"
import { ContentCard } from "../../components/Card"
import { useEffect, useState } from "react"

export const WorkoutsRoute = () => {
  const { isLoading, data } = useQuery<ContentI[]>(["workouts"], () => api.get("/workouts").then(res => res.data))
  const [workouts, setWorkouts] = useState<ContentI[]>([]);

  useEffect(() => {
    if (data) setWorkouts(data)
  }, [data])

  const removeWorkout = (id: string) => () =>
    setWorkouts((workouts) => workouts.filter((workout) => workout.id !== id))

  return <>
    <Typography variant="h2" color="text.primary" sx={{ mb: 1.5 }} component="div">
      Workouts
    </Typography >
    <Grid container spacing={2}>
      {isLoading || !data ? <Grid item>
        <CircularProgress />
      </Grid> : workouts.map((val) =>
        <ContentCard
          {...val}
          type="workout"
          removeItem={removeWorkout(val.id)}
        />
      )}
    </Grid>
  </>
}
