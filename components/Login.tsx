import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import styles from "../styles/login.module.css";
import "animate.css";
import { motion } from "framer-motion";

type Props = {};

export default function Login({}: Props) {
  const [register, setRegister] = useState(false);
  const [open, setOpen] = useState(false);

  function loginHandler(e: any) {
    e.preventDefault();
    axios
      .post("http://122.248.194.111:3004/v1/auth/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        if (res.status == 200) {
          window.localStorage.setItem("user", JSON.stringify(res.data));
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err) {
          console.error(err);
        }
      });
  }

  function registerHandler(e: any) {
    e.preventDefault();
    axios
      .post("http://122.248.194.111:3004/v1/users", {
        email: e.target.email.value,
        password: e.target.password.value,
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        phone: e.target.phone.value,
        register: e.target.register.value,
      })
      .then((res) => {
        if (res.status == 200) {
          alert("amjilttai burtgelee");
          setRegister(false);
        }
      })
      .catch((err) => {
        if (err) {
          console.error(err);
        }
      });
  }

  function registerHandlerOpen() {
    setRegister(true);
  }
  return (
    <div className={styles.back}>
      <div className={styles.bg1}>
        <h1 className={styles.h1}>
          <span className="animate__animated animate__bounce">
            Video Streaming App
          </span>
        </h1>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {register === false ? (
            <Box
              component="form"
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              noValidate
              autoComplete="off"
              onSubmit={loginHandler}
            >
              <div className={styles.bg}>
                <TextField
                  required
                  label="Email"
                  name="email"
                  variant="standard"
                  type="email"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    color: "white",
                  }}
                />
                <TextField
                  id="standard-password-input"
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    color: "white",
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "green",
                    width: "100%",
                    marginTop: "20px",
                    background: "#006c6e",
                    color: "white",
                  }}
                >
                  login
                </Button>
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "green",
                    width: "100%",
                    marginTop: "20px",
                    background: "#006c6e",
                    color: "white",
                  }}
                  onClick={registerHandlerOpen}
                >
                  register
                </Button>
              </div>
            </Box>
          ) : (
            <Box
              component="form"
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                padding: "0% 35% 0% 35%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              noValidate
              autoComplete="off"
              onSubmit={registerHandler}
            >
              <div className={styles.bg}>
                <TextField
                  required
                  label="Email"
                  name="email"
                  variant="standard"
                  type="email"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    color: "white",
                  }}
                />
                <TextField
                  required
                  label="firstName"
                  defaultValue="Hello World"
                  variant="standard"
                  name="firstName"
                  type="text"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
                <TextField
                  required
                  label="lastName"
                  name="lastName"
                  defaultValue="Hello World"
                  variant="standard"
                  type="text"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
                <TextField
                  required
                  label="phone"
                  name="phone"
                  defaultValue="Hello World"
                  variant="standard"
                  type="number"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
                <TextField
                  required
                  label="register"
                  name="register"
                  defaultValue="Hello World"
                  variant="standard"
                  type="text"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
                <TextField
                  label="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  variant="standard"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "green",
                    width: "100%",
                    marginTop: "20px",
                    background: "#006c6e",
                  }}
                >
                  register
                </Button>
              </div>
            </Box>
          )}
        </motion.div>
      </div>
    </div>
  );
}
