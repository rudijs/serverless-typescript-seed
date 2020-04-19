import React from "react"
import { Typography } from "@material-ui/core"
import { observer } from "mobx-react-lite"
import { useAppState } from "../context"

export const Counter: React.FC = observer(() => {
  const appState = useAppState()
  return <Typography>Counter Observer: {appState.groups}</Typography>
})
