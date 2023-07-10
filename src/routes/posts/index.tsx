import { useQuery } from "react-query"
import { api } from "../../api/instance"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { ContentI } from "../../api/types"
import { ContentCard } from "../../components/Card"
import { useEffect, useState } from "react"
import { LoaderWrapper } from "../../components/Loader"

export const PostsRoute = () => {
  const { isLoading, data } = useQuery<ContentI[]>(["posts"], () => api.get("/posts").then(res => res.data))
  const [posts, setPosts] = useState<ContentI[]>([]);

  useEffect(() => {
    if (data) setPosts(data)
  }, [data])

  const removePost = (id: string) => () =>
    setPosts((posts) => posts.filter((post) => post.id !== id))

  return <>
    <Typography variant="h2" color="text.primary" sx={{ mb: 1.5 }} component="div">
      Posts
    </Typography >
    <Grid container spacing={2}>
      <LoaderWrapper isLoading={isLoading} hasData={!!data}>
        {posts.map((val) =>
          <ContentCard
            {...val}
            type="post"
            removeItem={removePost(val.id)}
          />
        )}
      </LoaderWrapper>
    </Grid>
  </>
}
