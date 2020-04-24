import React, { useState, useRef } from "react"
import { useHistory } from "react-router-dom"

import { observer } from "mobx-react-lite"
import { useAppState } from "../context"

import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import { Auth } from "aws-amplify"
import "./SignInPage.css"

import { makeStyles } from "@material-ui/core/styles"
import { Box, Paper, Typography, TextField, Button, Chip, CircularProgress } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3, 2),
    animation: "fadein 1s",
    "-moz-animation": "fadein 1s" /* Firefox */,
    "-webkit-animation": "fadein 1s" /* Safari and Chrome */,
    "-o-animation": "fadein 1s" /* Opera */,
  },
  progresStyle: {
    marginLeft: "1rem",
    color: "blue",
  },
  formInput: {
    width: "100%",
    marginTop: theme.spacing(4),
  },
  authError: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
}))

export const SignInPage: React.FC = observer(() => {
  const classes = useStyles()

  const appState = useAppState()

  let history = useHistory()

  const [authError, setAuthError] = useState(null)

  const loadingEl = useRef<HTMLElement>(null)

  const authErrorDelete = () => {
    setAuthError(null)
  }

  return (
    <Box className={classes.container} mx="auto">
      <Paper className={classes.paper}>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            password: Yup.string().min(6, "Must be 6 to 12 characters in length").max(12, "Must be 6 to 12 characters in length").required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            setAuthError(null)

            const { email, password } = values

            try {
              await Auth.signIn(email, password)

              const currentSession = await Auth.currentSession()

              const groups = currentSession.getIdToken().payload["cognito:groups"]
              if (groups) {
                appState.setGroup(groups[0])
              }

              history.push("/profile")
            } catch (e) {
              setAuthError(e.message)
              // simple current.focus() did not work, had to querySelect the input elemet (material-ui specific I think)
              // inputEl.current.querySelector('input').focus()
              resetForm()
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => {
            // animation cicular spinner
            if (loadingEl.current) {
              isSubmitting ? (loadingEl.current.dataset.state = "loading") : (loadingEl.current.dataset.state = "idle")
            }

            return (
              <Form id="signInForm">
                <Typography variant="h3">Sign In</Typography>

                {authError ? (
                  <Box className={classes.authError}>
                    <Chip label={authError} color="secondary" onDelete={authErrorDelete} />
                  </Box>
                ) : (
                  ""
                )}

                <Field
                  type="email"
                  className={classes.formInput}
                  name="email"
                  id="email"
                  // autoFocus
                  // innerRef={inputEl}
                  as={TextField}
                  label="Email Address"
                  helperText={touched.email ? errors.email : ""}
                  error={touched.email && Boolean(errors.email)}
                />

                <br />

                <Field
                  type="password"
                  className={classes.formInput}
                  name="password"
                  id="password"
                  as={TextField}
                  label="Password"
                  helperText={touched.password ? errors.password : ""}
                  error={touched.password && Boolean(errors.password)}
                />

                <div>
                  <Button id="signInButton" variant="contained" className={classes.formInput} color="primary" disabled={isSubmitting} type="submit">
                    {isSubmitting ? (
                      <>
                        Submitting...
                        {/* <CircularProgress size="1rem" className={classes.progresStyle} /> */}
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "Center",
                      marginTop: "2rem",
                    }}
                  >
                    <CircularProgress data-state="idle" size="3rem" innerRef={loadingEl} color="primary" />
                  </Box>
                </div>
              </Form>
            )
          }}
        </Formik>
      </Paper>
    </Box>
  )
})
