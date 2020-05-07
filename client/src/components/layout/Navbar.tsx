import React from "react"

import { observer } from "mobx-react-lite"
import { useAppState } from "../../context"
import { Auth } from "aws-amplify"
import { Link, useHistory, useLocation } from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, Typography, Button, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import { Home, AccountCircle, Menu, Star } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  list: {
    width: 250,
  },
}))

export const Navbar: React.FC = observer(() => {
  const classes = useStyles()
  const appState = useAppState()
  const history = useHistory()
  const location = useLocation()

  const signOutHandler = async () => {
    try {
      await Auth.signOut()
    } catch (e) {
      console.log(e)
    } finally {
      appState.signOut()
      history.push("/")
    }
  }

  const [open, setOpen] = React.useState(false)

  // const [subOpen, setSubOpen] = React.useState(true)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const sideList = () => {
    return (
      <div className={classes.list} role="presentation">
        <List component="nav">
          <ListItem
            button
            id="leftDrawerHome"
            selected={location.pathname === "/"}
            onClick={() => {
              history.push("/")
              toggleDrawer()
            }}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          {!appState.isAuthenticated && (
            <ListItem
              button
              id="leftDrawerSignIn"
              selected={location.pathname === "/signin"}
              onClick={() => {
                history.push("/signin")
                toggleDrawer()
              }}
            >
              <ListItemIcon>
                <Star />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItem>
          )}

          {appState.isAuthenticated && (
            <ListItem
              button
              id="leftDrawerProfile"
              selected={location.pathname === "/profile"}
              onClick={() => {
                history.push("/profile")
                toggleDrawer()
              }}
            >
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          )}
        </List>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer} id="appBarMenuIcon">
            <Menu />
          </IconButton>
          <div
            role="button"
            tabIndex={0}
            className={classes.title}
            onClick={() => {
              history.push("/")
            }}
            onKeyDown={() => {
              history.push("/")
            }}
          >
            <Typography id="appBarHome" variant="h6">
              Home
            </Typography>
          </div>
          {!appState.isAuthenticated ? (
            <Button component={Link} to={"/signin"} color="inherit" id="navSignInButton">
              Sign In
            </Button>
          ) : (
            <Button onClick={signOutHandler} color="inherit" id="navSignOutButton">
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <SwipeableDrawer open={open} onOpen={toggleDrawer} onClose={toggleDrawer}>
        {sideList()}
      </SwipeableDrawer>
    </div>
  )
})
