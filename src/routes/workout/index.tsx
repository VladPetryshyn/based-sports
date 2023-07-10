import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../api/instance"
import { Button, Grid, Typography } from "@mui/material"
import { useState } from "react"
import { Workout } from "./component/Workout"
import { LikeReaction } from "../../components/Reactions/Like"
import { DislikeReaction } from "../../components/Reactions/Dislike"
import { DeleteItem } from "../../components/Deletion"
import { Link } from "react-router-dom"
import { useReactions } from "../../hooks/useReactions"
import { WorkoutI } from "../../api/types"
import { LoaderWrapper } from "../../components/Loader"

export const WorkoutRoute = () => {
  const { workoutId } = useParams()
  const { isLoading, data } = useQuery<WorkoutI>(`workout${workoutId}`, () =>
    api.get(`/workouts/workouts/${workoutId}`).then(res => res.data))

  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const {
    disliked,
    liked,
    dislikes,
    likes,
    onLike,
    onDislike
  } = useReactions(data)

  const navigate = useNavigate()
  const removeItem = () => navigate("/workouts")
  const finish = () => setIsFinished(true)

  return <LoaderWrapper isLoading={isLoading} hasData={!!data} >
    {isFinished ?
      <div>
        <Typography variant="h2">
          You successfully finished this workout
        </Typography>
        <Link to="/workouts">
          <Button>
            Go To All workouts
          </Button>
        </Link>
      </div>
      :
      <div>
        {
          hasStarted ?
            <Workout
              content={data?.content}
              finish={finish}
            />
            :
            <>
              <Typography variant="h2">
                {data?.title}
              </Typography>
              <Typography variant="h3" color="text.secondary">
                {data?.description}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                By @{data?.authorUsername}
              </Typography>
              <Grid container alignItems="center" sx={{ my: 1.5 }}>
                <LikeReaction
                  id={data?.id}
                  type="workout"
                  amount={likes}
                  isReacted={liked}
                  onReact={onLike}
                />
                <DislikeReaction
                  id={data?.id}
                  type="workout"
                  amount={dislikes}
                  isReacted={disliked}
                  onReact={onDislike}
                />
                <DeleteItem
                  removeItem={removeItem}
                  id={data?.id}
                  type="workout"
                  title={data?.title}
                />
              </Grid>
              <Grid container alignItems="center" justifyContent="center" sx={{ my: 30 }}>
                <Button size="large" onClick={() => setHasStarted(true)}>
                  Start workout
                </Button>
              </Grid>
            </>
        }
      </div>
    }
  </LoaderWrapper>
}
