import { FC, useState } from "react";
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { Link, useNavigate } from "react-router-dom"
import CardActions from "@mui/material/CardActions"
import { LikeReaction } from "../../components/Reactions/Like"
import { DislikeReaction } from "../../components/Reactions/Dislike"
import { ContentI } from "../../api/types";
import { ReactToType } from "../Reactions/types";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { DeleteItem } from "../Deletion";

interface Props extends ContentI {
  type: ReactToType;
  removeItem(): void;
}

export const ContentCard: FC<Props> = ({
  title,
  authorUsername,
  description,
  isLiked,
  isDisliked,
  id,
  likes,
  dislikes,
  type,
  isOwner,
  removeItem
}) => {
  const [liked, setLike] = useState(isLiked)
  const [disliked, setDislike] = useState(isDisliked)
  const [dislks, setDislks] = useState(dislikes)
  const [liks, setLiks] = useState(likes)

  const onLike = () => {
    if (liked) {
      setLike(false)
      setLiks((like) => like - 1)
    } else {
      if (disliked) setDislks((dislike) => dislike - 1)
      setLike(true)
      setDislike(false)
      setLiks((like) => like + 1)
    }
  }
  const onDislike = () => {
    if (disliked) {
      setDislike(false)
      setDislks((dislike) => dislike - 1)
    } else {
      if (liked) setLiks((like) => like - 1)
      setLike(false)
      setDislike(true)
      setDislks((dislike) => dislike + 1)
    }
  }

  const navigate = useNavigate()
  const onEdit = () => navigate(`${type === "post" ? "/updatePost/" : "/updateWorkout/"}${id}`)

  return <Grid item>
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <Link to={`/${type}/${id}`}>
            {title}
          </Link>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          by @{authorUsername}
        </Typography>
        <Typography>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <LikeReaction
          type={type}
          id={id}
          isReacted={liked}
          amount={liks}
          onReact={onLike}
        />
        <DislikeReaction
          type={type}
          id={id}
          isReacted={disliked}
          amount={dislks}
          onReact={onDislike}
        />
        {
          isOwner
          &&
          <>
            <IconButton onClick={onEdit}>
              <Edit />
            </IconButton>
            <DeleteItem
              title={title}
              id={id}
              type={type}
              removeItem={removeItem}
            />
          </>
        }
      </CardActions>
    </Card>
  </Grid >
}
