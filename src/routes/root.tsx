import { Container, Paper } from "@mui/material"
import { Header } from "../components/Header"
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return <Paper sx={{ height: "100%" }}>
    <Header />
    <Container sx={{
      paddingTop: "3rem",
      paddingBottom: "3rem"
    }}>
      <Outlet />
    </Container>
  </Paper>
}
