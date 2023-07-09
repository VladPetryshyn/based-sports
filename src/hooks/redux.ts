import { TypedUseSelectorHook, useDispatch as useDispatchT, useSelector as useSelectorT } from "react-redux"
import { AppDispatch, RootState } from "../store/redux"

export const useDispatch: () => AppDispatch = useDispatchT
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorT
