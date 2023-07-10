import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../../api/instance";
import { Editor as EditorI } from "@tiptap/react";
import { PostFormI, PostsEditingForm } from "../../components/ContentEditing/Posts/Form";
import { Typography } from "@mui/material";

export const CreatePostRoute = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<PostFormI>()
  const [editor, setEditor] = useState<EditorI | null>();
  const [contentErr, setContentErr] = useState("");

  const onSubmit = handleSubmit((body) => {
    if (editor?.isEmpty)
      setContentErr("This field is required")
    else {
      setContentErr("")
      try {
        api.post("/user/post", { ...body, content: editor?.getHTML() })
      } catch (err) {
        console.log(err)
      }
    }
  })

  return <>
    <Typography variant="h2" sx={{ mb: 5 }}>
      Create Post
    </Typography>
    <PostsEditingForm
      control={control}
      errors={errors}
      onSubmit={onSubmit}
      contentErr={contentErr}
      setEditor={setEditor}
    />
  </>
}
