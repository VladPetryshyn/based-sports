import { Button, Grid, Typography } from "@mui/material"
import dayjs from "dayjs"
import { FC, useEffect, useState } from "react"

interface Props {
  content: { time: string, title: string }[]
  finish(): void;
}

export const Workout: FC<Props> = ({ content, finish }) => {
  const [current, setCurrent] = useState(0);
  const [time, setTime] = useState(0)

  useEffect(() => {
    setTime(new Date(content[current].time).getMinutes() * 60 * 1000 + new Date(content[current].time).getSeconds() * 1000)
  }, [current])

  useEffect(() => {
    const inter = setInterval(() => {
      if (time - 1000 >= 0) {
        setTime(t => t - 1000)
      } else {
        if (current + 1 <= content.length - 1) {
          setCurrent(curr => curr + 1)
        } else {
          finish()
        }
      }
    }, 1000)

    return () => {
      clearInterval(inter)
    }

  }, [time])

  const onSkip = () => {
    if (current + 1 <= content.length - 1) {
      setCurrent(curr => curr + 1)
    } else {
      finish()
    }
  }

  return <Grid
    container
    alignItems="center"
    justifyContent="center"
    direction="column"
    spacing={5}
  >
    <Grid item>
      <Typography variant="h1">
        {content[current].title}
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant="h1">
        {dayjs(time).format("mm:ss")}
      </Typography>
    </Grid>
    <Grid item>
      <Button onClick={onSkip}>
        Skip
      </Button>
    </Grid>
  </Grid>
}
