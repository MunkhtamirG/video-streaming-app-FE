import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  NativeSelect,
  TextField,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const genre = ["Music", "Animation", "Gaming", "Entertainment", "Comedy"];
export default function Id({ mediaa }: any) {
  const [media, setMedia] = useState<any>([]);
  const [mediaEdit, setMediaEdit] = useState<any>();
  const [open, setOpen] = useState(false);
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

  const router = useRouter();
  const { id } = router.query;

  const handleOpen = (id: any) => {
    setMediaEdit(id);
    setOpen(true);
  };

  const watchMedia = mediaa.filter((video: any, i: number) => {
    if (video._id === mediaEdit) {
      return video;
    }
  });

  const handleClose = () => setOpen(false);
  useEffect(() => {
    axios
      .get(`http://122.248.194.111:3004/v1/media/video/by/${id}`)
      .then((res) => {
        setMedia(res.data.data);
      });
  }, [id]);

  function handlerDlt(id: any) {
    axios
      .delete(`http://122.248.194.111:3004/v1/media/delete/${id}`)
      .then((res) => {
        if (res.status === 200) {
          router.push("/");
          alert("ustsan");
        }
      });
  }

  function editVideoDesc(e: any) {
    e.preventDefault();
    axios
      .put(
        `http://122.248.194.111:3004/v1/media/update/${mediaEdit && mediaEdit}`,
        {
          title: e.target.title.value,
          description: e.target.description.value,
          genre: e.target.genre.value,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Update hiigdlee");
          setOpen(false);
        }
      })
      .catch((err) => {
        if (err) {
          console.error(err);
        }
      });
  }
  function handlerOpenVideo(id: any) {
    router.push(`/watch?video=${id}`);
  }

  return (
    <div
      style={{
        height: "100%",
        padding: "30px",
        color: "white",
        backgroundColor: "#343a40",
      }}
      className="grid grid-cols-4 gap-7"
    >
      {media.map((video: any, i: number) => {
        return (
          <motion.div
            key={i}
            className="box"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div>
              <ReactPlayer
                key={i}
                url={`http://122.248.194.111:3004/v1/media/video/${video._id}`}
                controls={true}
                width="100%"
                height="25vh"
                onClick={() => handlerOpenVideo(video._id)}
              />

              <div className="flex justify-between">
                <div>
                  <p className="text-[20px]">{video.title}</p>
                  <span className="text-[12px] text-[gray]">
                    Views {video.views}
                  </span>
                </div>

                <div className="flex gap-2 py-2">
                  <Button
                    variant="contained"
                    color="info"
                    className="bg-[#0288d1]"
                    onClick={() => handleOpen(video._id)}
                  >
                    edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    className="bg-[#d32f2f]"
                    onClick={() => handlerDlt(video._id)}
                  >
                    delete
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style} onSubmit={editVideoDesc}>
            {watchMedia.map((desc: any, i: number) => {
              return (
                <div key={i}>
                  <TextField
                    required
                    label="Title"
                    variant="standard"
                    name="title"
                    type="text"
                    defaultValue={desc.title}
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
                    defaultValue={desc.description}
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
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Genre
                    </InputLabel>
                    <NativeSelect name="genre" defaultValue={desc.genre}>
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
                    UPDATE
                  </Button>
                </div>
              );
            })}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

Id.getInitialProps = async (ctx: any) => {
  const res = await axios.get("http://122.248.194.111:3004/v1/media");
  const json = await res.data.data;
  return { mediaa: json };
};
