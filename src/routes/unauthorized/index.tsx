import { Button, Typography } from "@mui/material"

export const UnauthorizedRoute = () => {
  return <>
    <Typography variant="h1">
      Unauthorized
    </Typography>
    <Button href="/login">
      Authorize
    </Button>
  </>
}
