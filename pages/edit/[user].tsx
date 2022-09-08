import axios from "axios";
import React, { useRef } from "react";
import { useRouter } from "next/router";
import { Box, Button, TextField } from "@mui/material";
import styles from "../../styles/login.module.css";
import { motion } from "framer-motion";

export default function User({ users }: any) {
  const router = useRouter();
  const { user } = router.query;

  function handleUpdate(e: any) {
    e.preventDefault();
    axios
      .post(`http://122.248.194.111:3004/v1/users/update/${user}`, {
        email: e.target.email.value,
        firstName: e.target.firstname.value,
        lastName: e.target.lastname.value,
        phone: e.target.phone.value,
        register: e.target.register.value,
        password: e.target.password.value,
      })
      .then((res) => {
        if (res.statusText === "OK") {
          alert("amjiltai update hiigdlee");
        }
      })
      .catch((err) => {
        if (err) {
          console.error(err);
        }
      });
  }

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {users.map((user1: any, i: number) => {
        if (user1._id === user) {
          return (
            <Box
              key={i}
              component="form"
              sx={{
                display: "flex",
                height: "89vh",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleUpdate}
            >
              <div
                className="w-[25vw] rounded"
                style={{ backgroundColor: "#20ab9c", padding: "40px" }}
              >
                <TextField
                  required
                  label="Email"
                  name="email"
                  variant="standard"
                  type="email"
                  defaultValue={user1.email}
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
                <br />
                <TextField
                  required
                  label="Firstname"
                  name="firstname"
                  variant="standard"
                  type="text"
                  defaultValue={user1.firstName}
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
                <br />
                <TextField
                  required
                  label="Lastname"
                  name="lastname"
                  variant="standard"
                  type="text"
                  defaultValue={user1.lastName}
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
                <br />

                <TextField
                  required
                  label="Phone"
                  name="phone"
                  variant="standard"
                  type="text"
                  defaultValue={user1.phone}
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
                <br />
                <TextField
                  required
                  label="Register"
                  name="register"
                  variant="standard"
                  type="text"
                  defaultValue={user1.register}
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
                <br />
                <TextField
                  id="standard-password-input"
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  defaultValue="{user1.password}"
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                  }}
                />
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
                >
                  Update
                </Button>
                <br />
              </div>
            </Box>
          );
        }
      })}
    </motion.div>
  );
}

User.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://122.248.194.111:3004/v1/users");
  const json = await res.data.data;
  return { users: json };
};
