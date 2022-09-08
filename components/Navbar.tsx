import React, { useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import style from "../styles/header.module.css";
import axios from "axios";
import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const genre = ["Music", "Animation", "Gaming", "Entertainment", "Comedy"];

const Navbar = () => {
  const [values, setValues] = useState({
    title: "",
    video: "",
    description: "",
    genre: "",
    redirect: false,
    error: "",
    mediaId: "",
  });
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const router = useRouter();
  const [user, setUser] = React.useState<any>();
  const [like, setLike] = React.useState<any>();

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "user"));
  }, []);
  if (localStorage.getItem("like")) {
    React.useEffect(() => {
      setLike(JSON.parse(localStorage.getItem("like") || "like"));
    }, []);
  }

  function logoutHandler(e: any) {
    e.preventDefault();
    window.localStorage.removeItem("user");
    window.location.reload();
  }

  // UPLOAD, SEARCH
  const searchHandler = (e: any) => {
    e.preventDefault();
    router.push(`/search/${e.target.search.value}`);
  };

  const handleOpenUpload = () => {
    setOpen(true);
  };

  // modal upload
  const handleCloseUpload = () => {
    setOpen(false);
  };
  const handleChange = (name: any) => (event: any) => {
    const value = name === "video" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleUploadSelect = (e: any) => {
    e.preventDefault();
    let formData = new FormData();
    if (user) {
      formData.append("video", values.video as any);
      formData.append("title", e.target.title.value);
      formData.append("description", e.target.description.value);
      formData.append("genre", e.target.genre.value);
      formData.append("userId", user?.user._id);
      axios({
        method: "post",
        url: `http://122.248.194.111:3004/v1/media/upload`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          if (res.status == 200) {
            alert("upload amjiltai hiigdlee");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: "#006c6e", padding: "0 50px 0 50px" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Video Streaming App
          </Typography>

          {/* <Box sx={{ flexGrow: 1 }}></Box> */}
          <Box
            component="form"
            sx={{ flexGrow: 1, marginRight: "10px" }}
            onSubmit={searchHandler}
          >
            <TextField
              label="Search"
              type="search"
              name="search"
              style={{
                color: "white",
                backgroundColor: "white",
                margin: "10px",
                width: "60%",
                marginRight: "50px",
                borderRadius: "5px",
                border: "none",
              }}
            />
          </Box>
          <div className={style.flex}>
            <Box
              sx={{
                background: "none",
                border: "none",
              }}
              component="button"
            >
              {like === 0 ? (
                <p></p>
              ) : (
                <p className="absolute bg-[red] rounded-full text-xs px-1">
                  {like}
                </p>
              )}
              <NotificationsActiveIcon />
            </Box>
            <Box
              sx={{
                background: "none",
                border: "none",
                padding: "0 20px 0 20px",
              }}
              component="button"
              onClick={handleOpenUpload}
            >
              <VideoCallIcon />
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, textTransform: "uppercase" }}
                >
                  <Avatar alt="Remy Sharp">
                    {user && user.user.email.slice(0, 1)}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
              >
                <MenuItem onClick={logoutHandler}>
                  <Typography textAlign="center">Sing in</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      {/* upload modal */}
      <Modal
        open={open}
        onClose={handleCloseUpload}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <div className={style.bg}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload videos
            </Typography>
            <img src="upload1.gif" alt="" className={style.img} />
            {/* <Button onClick={handleUploadSelect}>SELECT FILES</Button> */}
            <Box
              component="form"
              onSubmit={handleUploadSelect}
              noValidate
              autoComplete="off"
              encType="multipart/form-data"
            >
              <input
                accept="video/*"
                type="file"
                onChange={handleChange("video")}
                id="icon-button-file"
                multiple
              />

              <TextField
                required
                label="Title"
                variant="standard"
                name="title"
                type="text"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              />
              <TextField
                required
                label="Description"
                variant="standard"
                name="description"
                type="text"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              />

              <FormControl
                fullWidth
                style={{
                  marginTop: "10px",
                  marginBottom: "30px",
                }}
              >
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Genre
                </InputLabel>
                <NativeSelect name="genre">
                  {genre.map((genre: any, i: number) => {
                    return (
                      <option key={i} value={genre}>
                        {genre}
                      </option>
                    );
                  })}
                </NativeSelect>
              </FormControl>

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
                UPLOAD
              </Button>
            </Box>
          </div>
        </Box>
      </Modal>
    </>
  );
};
export default Navbar;
