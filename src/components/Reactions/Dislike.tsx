import { FC } from "react"
import { ReactToType } from "./types"
import { ThumbDownAlt, ThumbDownOffAltOutlined, } from "@mui/icons-material"
import { Grid, IconButton, Typography } from "@mui/material"
import { api } from "../../api/instance"


interface Props {
  type: ReactToType,
  id: string,
  isReacted: boolean,
  amount: number
  onReact(): void;
}

export const DislikeReaction: FC<Props> = ({ type, id, isReacted, amount, onReact }) => {
  const like = async () => {
    try {
      await api.put(`/user/${type}/dislike/${id}`)
      onReact()
    } catch (err) {
      console.error(err)
    }
  }

  return <Grid container alignItems="center" sx={{ width: "fit-content" }}>
    <Grid item>
      <IconButton onClick={like}>
        {isReacted ?
          <ThumbDownAlt />
          :
          <ThumbDownOffAltOutlined />
        }
      </IconButton>
    </Grid>
    <Grid item>
      <Typography color="text.secondary">
        {amount}
      </Typography>
    </Grid>
  </Grid>
}
