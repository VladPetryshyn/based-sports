import { Avatar, CircularProgress, Grid, Stack, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { api } from "../../api/instance"
import { useQuery } from "react-query"
import { ContentI } from "../../api/types"
import { ContentCard } from "../../components/Card"
import { useEffect, useState } from "react"

export const ProfileRoute = () => {
  const { username } = useParams()

  const postsData = useQuery<ContentI[]>(`profilePosts${username}`, () => api.get(`/posts/user/${username}`).then(res => res.data))
  const workoutsData = useQuery<ContentI[]>(`profileWorkouts${username}`, () => api.get(`/workouts/user/${username}`).then(res => res.data))

  const [posts, setPosts] = useState<ContentI[]>([]);
  const [workouts, setWorkouts] = useState<ContentI[]>([]);

  useEffect(() => {
    if (postsData.data) setPosts(postsData.data)
    if (workoutsData.data) setWorkouts(workoutsData.data)
  }, [postsData.data, workoutsData.data])

  const removePost = (id: string) => () =>
    setPosts((posts) => posts.filter((post) => post.id !== id))
  const removeWorkout = (id: string) => () =>
    setPosts((posts) => posts.filter((post) => post.id !== id))


  return <Grid
    container
    direction="column">
    <Grid
      container
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Avatar
          sx={{
            width: 56,
            height: 56
          }}>
          {username?.[0]?.toUpperCase()}
        </Avatar>
      </Grid>
      <Grid item>
        <Typography variant="h3">
          {username}
        </Typography>
      </Grid>
    </Grid>
    <Grid item sx={{ my: 3 }}>
      <Typography variant="h4" sx={{ my: 2 }}>
        Posts
      </Typography>
      <Stack spacing={2} direction="row" sx={{ overflow: "auto", maxWidth: 1000, pb: 3 }}>
        {postsData.isLoading ? <CircularProgress /> :
          <>
            {posts?.map((val) =>
              <ContentCard
                {...val}
                type="post"
                removeItem={removePost(val.id)}
              />
            )}
          </>
        }
      </Stack>
    </Grid>
    <Grid item>
      <Typography variant="h4" sx={{ my: 2 }}>
        Workouts
      </Typography>
      <Stack spacing={2} direction="row" sx={{ overflow: "auto", maxWidth: 1000, pb: 3 }}>
        {workoutsData.isLoading ? <CircularProgress /> :
          <>
            {workouts?.map((val) =>
              <ContentCard
                {...val}
                type="workout"
                removeItem={removeWorkout(val.id)}
              />
            )}
          </>
        }
      </Stack>
    </Grid>
  </Grid >
}
