import { FC } from "react"
import { useSelector } from "../../hooks/redux"
import { Navigate } from "react-router-dom"

interface Props {
  Component: FC<any>
}

export const ProtectUserRoute: FC<Props> = ({ Component }) => {
  const user = useSelector((state) => state.user.token)

  return user ? <Navigate to="/posts" /> : <Component />
}
