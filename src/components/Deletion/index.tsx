import { Delete } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, IconButton, Modal, Typography } from "@mui/material"
import { FC, useState } from "react";
import { ReactToType } from "../Reactions/types";
import { api } from "../../api/instance";

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  title: string;
  id: string;
  type: ReactToType;
  removeItem(): void;
}

export const DeleteItem: FC<Props> = ({ title, id, type, removeItem }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true)
    try {
      const resp = await api.delete(`/user/${type}/${id}`)
      if (resp.data.message) {
        removeItem()
        handleClose()
      }
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }

  return <>
    <IconButton onClick={handleOpen}>
      <Delete />
    </IconButton>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" color="text.primary">
          Delete post "{title}"?
        </Typography>
        {isLoading ? <CircularProgress /> : <Typography id="modal-modal-description" sx={{ mt: 2 }} color="text.secondary">
          When you delete this {type}, it will be gone forever, are you sure you wanna proceed?
        </Typography>
        }
        <Grid container sx={{ pt: 3 }}>
          <Button onClick={handleClose}>
            CANCEl
          </Button>
          <Button
            color="error"
            onClick={onDelete}
          >
            OK
          </Button>
        </Grid>
      </Box>
    </Modal>
  </>
}
