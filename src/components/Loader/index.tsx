import { CircularProgress, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

interface Props {
  isLoading: boolean;
  hasData: boolean;
  children: ReactNode
}

export const LoaderWrapper: FC<Props> = ({ isLoading, hasData, children }) => (
  isLoading ?
    <CircularProgress />
    :
    !hasData ?
      <Typography variant="h4">
        Seems like nothing here
      </Typography>
      : children
)
