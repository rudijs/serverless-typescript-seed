import React from "react"

import { appState } from "./models/state"

export const MyContext = React.createContext(appState)

// export const useAppState = () => React.useContext(React.createContext(appState))

// export const MyProvider: React.FC = ({ children }) => {
//   // const [count, setCount] = useState(0)
//   return <MyContext.Provider value={state}>{children}</MyContext.Provider>
// }
