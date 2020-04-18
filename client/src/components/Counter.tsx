import React, { useContext } from "react"
// import { MyContext } from "../context"
// import { Typography } from "@material-ui/core"
import { observer } from "mobx-react-lite"
import { MyContext } from "../context"

// export const Counter: React.FC = () => {
//   return (
//     <MyContext.Consumer>
//       {(context) => (
//         <React.Fragment>
//           {/* <Typography>Counter: {context.count}</Typography> */}
//           <Typography>IsAuthenticated: {context.IsAuthenticated ? "Logged In" : "Logged Out"}</Typography>
//           <Typography>Groups: {context.groups}</Typography>
//         </React.Fragment>
//       )}
//     </MyContext.Consumer>
//   )
// }

export const Counter: React.FC = observer(() => {
  const appState = useContext(MyContext)
  return <p>Counter Observer: {appState.groups}</p>
})
// export const Counter = () => <p>Counter!!</p>
