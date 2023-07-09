import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../api/instance";
import { CircularProgress, Grid, Typography } from "@mui/material";
import DOMPurify from 'dompurify';
import { LikeReaction } from "../../components/Reactions/Like";
import { DislikeReaction } from "../../components/Reactions/Dislike";
import { DeleteItem } from "../../components/Deletion";
import { useReactions } from "../../hooks/useReactions";
import { PostI } from "../../api/types";


export const PostRoute = () => {
  const { postId } = useParams()
  const { isLoading, data } = useQuery<PostI>(`post${postId}`, () =>
    api.get(`/posts/post/${postId}`).then(res => res.data))

  const {
    disliked,
    liked,
    dislikes,
    likes,
    onLike,
    onDislike
  } = useReactions(data)


  const navigate = useNavigate()
  const removeItem = () => navigate("/posts")

  return isLoading || !data ? <CircularProgress /> : <div>
    <Typography variant="h2">
      {data.title}
    </Typography>
    <Typography variant="h5" color="text.secondary">
      By @{data.authorUsername}
    </Typography>
    <Grid container alignItems="center" sx={{ my: 1.5 }}>
      <LikeReaction
        id={data.id}
        type="post"
        amount={likes}
        isReacted={liked}
        onReact={onLike}
      />
      <DislikeReaction
        id={data.id}
        type="post"
        amount={dislikes}
        isReacted={disliked}
        onReact={onDislike}
      />
      <DeleteItem
        removeItem={removeItem}
        id={data.id}
        type="post"
        title={data.title}
      />
    </Grid>
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content, { USE_PROFILES: { html: true } }) }} />
  </div>
}
