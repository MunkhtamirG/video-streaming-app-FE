import { Avatar, Button } from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

const genre = ["Music", "Animation", "Gaming", "Entertainment", "Comedy"];
export default function Main() {
  const router = useRouter();
  const [media, setMedia] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    axios.get("http://122.248.194.111:3004/v1/media").then((res) => {
      setMedia(res.data.data);
    });
    axios.get("http://122.248.194.111:3004/v1/users").then((res) => {
      setUsers(res.data.data);
    });
  }, []);
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  function handlerOpenVideo(id: any) {
    router.push(`/watch?video=${id}`);
  }

  return (
    <>
      <div className="p-4 flex gap-4">
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
          onClick={() => {
            axios.get("http://122.248.194.111:3004/v1/media").then((res) => {
              setMedia(res.data.data);
            });
          }}
        >
          All
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
          onClick={() => {
            axios
              .get("http://122.248.194.111:3004/v1/media/by/music")
              .then((res) => {
                setMedia(res.data.data);
              });
          }}
        >
          Music
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
          onClick={() => {
            axios
              .get("http://122.248.194.111:3004/v1/media/by/animation")
              .then((res) => {
                setMedia(res.data.data);
              });
          }}
        >
          Animation
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
          onClick={() => {
            axios
              .get("http://122.248.194.111:3004/v1/media/by/gaming")
              .then((res) => {
                setMedia(res.data.data);
              });
          }}
        >
          Gaming
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
          onClick={() => {
            axios
              .get("http://122.248.194.111:3004/v1/media/by/entertainment")
              .then((res) => {
                setMedia(res.data.data);
              });
          }}
        >
          Entertainment
        </Button>
        <Button
          variant="outlined"
          sx={{ color: "white", border: "0.2px solid #006c6e" }}
          onClick={() => {
            axios
              .get("http://122.248.194.111:3004/v1/media/by/comedy")
              .then((res) => {
                setMedia(res.data.data);
              });
          }}
        >
          Comedy
        </Button>
      </div>
      <div
        style={{
          backgroundColor: "#343a40",
          minHeight: "85vh",
          padding: "30px",
        }}
      >
        <div className="grid grid-cols-4 gap-7">
          {media.map((video: any, i: number) => {
            return (
              <motion.div
                key={i}
                className="box"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ReactPlayer
                  url={`http://122.248.194.111:3004/v1/media/video/${video._id}`}
                  controls={true}
                  width="100%"
                  height="25vh"
                  onClick={() => handlerOpenVideo(video._id)}
                />

                <div className="text-white ">
                  <div className="flex items-start p-2 gap-2">
                    <div>
                      {users.map((user: any, i: number) => {
                        if (user._id === video.postedBy) {
                          return (
                            <div className="flex gap-3" key={i}>
                              <Avatar
                                alt="Remy Sharp"
                                style={{
                                  backgroundColor:
                                    "rgb(" +
                                    Math.floor(Math.random() * 255) +
                                    "," +
                                    Math.floor(Math.random() * 255) +
                                    "," +
                                    Math.floor(Math.random() * 255) +
                                    ")",
                                }}
                              >
                                {user.firstName.slice(0, 1)}
                              </Avatar>
                              <div>
                                <p style={{ fontSize: "18px" }}>
                                  {video.title}
                                </p>

                                <p className="text-gray-400 text-[14px] flex items-center">
                                  {user.firstName}

                                  <CheckCircleIcon
                                    className="text-[14px] ml-1"
                                    color="info"
                                  />
                                </p>
                                <p className="text-gray-400 text-[14px]">
                                  Views {video.views} &#8226;{" "}
                                  {moment(video.created).format("MMM DD,YYYY")}
                                </p>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
