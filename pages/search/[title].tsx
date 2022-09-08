import { Button } from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Title() {
  const [media, setMedia] = useState([]);
  const router = useRouter();
  const { title } = router.query;

  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  useEffect(() => {
    axios
      .get(`http://122.248.194.111:3004/v1/media/search/by/${title}`)
      .then((res) => {
        setMedia(res.data.data);
      })
      .catch((error) => console.log(error));
  }, [title]);

  function handlerOpenVideo(id: any) {
    router.push(`/watch?video=${id}`);
  }
  return (
    <>
      <div style={{ backgroundColor: "#343a40", height: "100%" }}>
        {/* {title} */}
        <p className="p-6 text-white">
          Таны хайлт : <span className="text-red text-2xl">{title}</span>
        </p>
        <div className="grid grid-cols-4 gap-5 p-6">
          {media &&
            media.map((video: any, i: number) => (
              <ReactPlayer
                key={i}
                url={`http://122.248.194.111:3004/v1/media/video/${video._id}`}
                width="100%"
                height={"inherit"}
                controls={true}
                onClick={() => handlerOpenVideo(video._id)}
              />
            ))}
        </div>
      </div>
    </>
  );
}
