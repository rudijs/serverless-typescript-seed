import React from "react"

import { appState } from "./models/state"

export const useAppState = () => React.useContext(React.createContext(appState))
