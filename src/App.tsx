import { RouterProvider } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from './hooks/redux'
import { setData } from './store/reducers/user'
import { router } from './configs/routing'
import { api } from './api/instance'


function App() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const [isGettingToken, setIsGettingToken] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")

    api.defaults.headers.common.token = token

    if (token && username)
      dispatch(setData({ token, username }))


    setIsGettingToken(false)
  }, [])


  return !token && isGettingToken ? "No token" : <RouterProvider router={router} />
}

export default App
