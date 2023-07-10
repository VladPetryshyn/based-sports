import { createBrowserRouter } from "react-router-dom";
import { PostRoute } from "../../routes/post";
import { PostsRoute } from "../../routes/posts";
import { RegisterRoute } from "../../routes/register";
import { LoginRoute } from "../../routes/login";
import { ProfileRoute } from "../../routes/profile";
import { WorkoutsRoute } from "../../routes/workouts";
import { RootLayout } from "../../routes/root";
import { CreatePostRoute } from "../../routes/createPost";
import { WorkoutRoute } from "../../routes/workout";
import { CreateWorkoutRoute } from "../../routes/createWorkout";
import { UpdatePostRoute } from "../../routes/updatePost";
import { UpdateWorkoutRoute } from "../../routes/updateWorkout";
import { ProtectRoute } from "../../routes/protectRoute";
import { UnauthorizedRoute } from "../../routes/unauthorized";
import { ProtectUserRoute } from "../../routes/protectUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/workouts",
        element: <WorkoutsRoute />
      },
      {
        path: "/profile/:username",
        element: <ProfileRoute />
      },
      {
        path: "/login",
        element: <ProtectUserRoute Component={LoginRoute} />
      },
      {
        path: "/register",
        element: <ProtectUserRoute Component={RegisterRoute} />
      },
      {
        path: "/posts",
        element: <PostsRoute />
      },
      {
        path: "/post/:postId",
        element: <PostRoute />
      },
      {
        path: "/createPost",
        element: <ProtectRoute Component={CreatePostRoute} />
      },
      {
        path: "/workout/:workoutId",
        element: <WorkoutRoute />
      },
      {
        path: "/createWorkout",
        element: <ProtectRoute Component={CreateWorkoutRoute} />
      },
      {
        path: "/updatePost/:postId",
        element: <ProtectRoute Component={UpdatePostRoute} />
      },
      {
        path: "/updateWorkout/:workoutId",
        element: <ProtectRoute Component={UpdateWorkoutRoute} />
      },
      {
        path: "/unauthorized",
        element: <UnauthorizedRoute />
      }
    ]
  }
])
