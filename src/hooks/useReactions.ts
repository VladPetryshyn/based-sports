import { useEffect, useState } from "react"
import { ContentI } from "../api/types"


export const useReactions = (data: ContentI | undefined) => {
  // eslint-disable-next-line 
  const [liked, setLike] = useState(data?.isLiked!)
  // eslint-disable-next-line 
  const [disliked, setDislike] = useState(data?.isDisliked!)
  // eslint-disable-next-line 
  const [dislks, setDislks] = useState(data?.dislikes!)
  // eslint-disable-next-line 
  const [liks, setLiks] = useState(data?.likes!)

  useEffect(() => {
    if (data) {
      setLike(data.isLiked)
      setDislike(data.isDisliked)
      setDislks(data.dislikes)
      setLiks(data.likes)
    }
  }, [data])

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

  return { disliked, liked, dislikes: dislks, likes: liks, onLike, onDislike }
}
