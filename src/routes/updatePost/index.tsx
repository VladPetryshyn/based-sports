import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { api } from "../../api/instance";
import { Editor as EditorI } from "@tiptap/react";
import { PostFormI, PostsEditingForm } from "../../components/ContentEditing/Posts/Form";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Typography } from "@mui/material";
import { PostI } from "../../api/types";
import { LoaderWrapper } from "../../components/Loader";

export const UpdatePostRoute = () => {
  // form control
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<PostFormI>()
  const [editor, setEditor] = useState<EditorI | null>();
  const [contentErr, setContentErr] = useState("");

  // data fethcing
  const { postId } = useParams()
  const { isLoading, data } = useQuery<PostI>(`post${postId}`, () =>
    api.get(`/posts/post/${postId}`).then(res => res.data))

  useEffect(() => {
    if (data) {
      setValue("title", data.title)
      setValue("description", data.description)
    }
    if (editor && data) editor.commands.setContent(data.content)
  }, [data, editor])


  // form submit
  const onSubmit = handleSubmit((body) => {
    if (editor?.isEmpty)
      setContentErr("This field is required")
    else {
      setContentErr("")
      try {
        api.put(`/user/post/${postId}`, { ...body, content: editor?.getHTML() })
      } catch (err) {
        console.log(err)
      }
    }
  })

  return <LoaderWrapper
    isLoading={isLoading}
    hasData={!!data}
  >
    <Typography variant="h2" sx={{ mb: 5 }}>
      Update Post
    </Typography>
    <PostsEditingForm
      control={control}
      errors={errors}
      onSubmit={onSubmit}
      contentErr={contentErr}
      setEditor={setEditor}
    />
  </LoaderWrapper>
}
