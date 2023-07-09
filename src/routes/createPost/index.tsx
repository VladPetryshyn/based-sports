import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../../api/instance";
import { Editor as EditorI } from "@tiptap/react";
import { PostsEditingForm } from "../../components/ContentEditing/Posts/Form";

interface FormI {
  title: string;
  description: string;
}

export const CreatePostRoute = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormI>()
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

  return <PostsEditingForm
    control={control}
    errors={errors}
    onSubmit={onSubmit}
    contentErr={contentErr}
    setEditor={setEditor}
  />
}
