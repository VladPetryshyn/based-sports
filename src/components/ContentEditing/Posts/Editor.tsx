import StarterKit from '@tiptap/starter-kit'
import { Editor as EditorI, EditorContent, useEditor } from "@tiptap/react"
import { FC, useEffect } from 'react'
import { Button, Grid, Typography } from '@mui/material'

interface MenuBarProps {
  editor: EditorI | null
}

export const MenuBar: FC<MenuBarProps> = ({ editor }) => {
  return editor && <div>
    <Button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      disabled={
        !editor.can()
          .chain()
          .focus()
          .toggleItalic()
          .run()
      }
      color={editor.isActive("italic") ? "success" : "info"}
    >
      Italic
    </Button>
    <Button
      onClick={() => editor.chain().focus().toggleBold().run()}
      disabled={
        !editor.can()
          .chain()
          .focus()
          .toggleBold()
          .run()
      }
      color={editor.isActive("bold") ? "success" : "info"}
    >
      Bold
    </Button>
    <Button
      onClick={() => editor.chain().focus().setParagraph().run()}
      color={editor.isActive("paragraph") ? "success" : "info"}
    >
      P
    </Button>
    <Button
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      color={editor.isActive("heading", { level: 1 }) ? "success" : "info"}
    >
      h1
    </Button>
    <Button
      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      color={editor.isActive("heading", { level: 2 }) ? "success" : "info"}
    >
      h2
    </Button>
    <Button
      onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      color={editor.isActive("heading", { level: 3 }) ? "success" : "info"}
    >
      h3
    </Button>
    <Button
      onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      color={editor.isActive("heading", { level: 4 }) ? "success" : "info"}
    >
      h4
    </Button>
    <Button
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      color={editor.isActive("orderedList") ? "success" : "info"}
    >
      List
    </Button>
  </div>
}

interface EditorProps {
  setEditor(editor: EditorI | null): void;
  error: string | undefined;
}

export const Editor: FC<EditorProps> = ({ setEditor, error }) => {
  const editor = useEditor({
    content: "",
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
  })

  useEffect(() => {
    setEditor(editor)
  }, [editor])

  return <Grid container direction="column" spacing={2}>
    <Grid item>
      <MenuBar editor={editor} />
    </Grid>
    <Grid item>
      <EditorContent
        editor={editor}
        className="editor"
        maxLength={500}
        rows={1}
        label="Content"
      />
    </Grid>
    <Grid item>
      <Typography variant="body1" color="error">
        {error}
      </Typography>
    </Grid>
  </Grid>
}
