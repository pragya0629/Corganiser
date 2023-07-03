import React from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import ReactPlayer from "react-player";
import { useState, useEffect, useRef } from "react";
import { Comments, Description, Notes } from "./VideoElements";
import { useParams } from "react-router-dom";
import axios from "axios";

export const VideoPlayer = () => {
  const { id, name } = useParams();
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState({
    kind: "youtube#playlistItem",
    id: "UEx1MFdfOWxJSTlhaElhcHBSUE4wTUNBZ3RPdTNsUWpRaS41NkI0NEY2RDEwNTU3Q0M2",
    snippet: {
      publishedAt: "2020-07-30T16:36:58Z",
      channelId: "UCeVMnSShP_Iviwkknt83cww",
      title: "Introduction to Data Structures & Algorithms",
      description:
        "Data Structures like arrays, stack, linked list etc is something you must have heard of but why algorithms and data structures like these are important? Well this video answers this question.\nThis Data Structures and algorithms course is a part of my Data Structures and Algorithms playlist - ➡Join this DS & Algo course & Access the playlist: https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi\n➡Download Source Code & Notes here: https://codewithharry.com/videos/data-structures-and-algorithms-in-hindi-1\n►Checkout my English channel here: https://www.youtube.com/ProgrammingWithHarry\n►Click here to subscribe - https://www.youtube.com/channel/UCeVMnSShP_Iviwkknt83cww\n\nBest Hindi Videos For Learning Programming:\n►Learn Python In One Video - https://www.youtube.com/watch?v=ihk_Xglr164\n\n►Python Complete Course In Hindi - https://www.youtube.com/playlist?list=PLu0W_9lII9agICnT8t4iYVSZ3eykIAOME\n\n►C Language Complete Course In Hindi -  \nhttps://www.youtube.com/playlist?list=PLu0W_9lII9aiXlHcLx-mDH1Qul38wD3aR&disable_polymer=true\n\n►JavaScript Complete Course In Hindi - \n https://www.youtube.com/playlist?list=PLu0W_9lII9ajyk081To1Cbt2eI5913SsL\n\n►Learn JavaScript in One Video - https://www.youtube.com/watch?v=onbBV0uFVpo\n\n►Learn PHP In One Video - https://www.youtube.com/watch?v=xW7ro3lwaCI\n\n►Django Complete Course In Hindi -  \nhttps://www.youtube.com/playlist?list=PLu0W_9lII9ah7DDtYtflgwMwpT3xmjXY9\n\n►Machine Learning Using Python - https://www.youtube.com/playlist?list=PLu0W_9lII9ai6fAMHp-acBmJONT7Y4BSG\n\n►Creating & Hosting A Website (Tech Blog) Using Python - https://www.youtube.com/playlist?list=PLu0W_9lII9agAiWp6Y41ueUKx1VcTRxmf\n\n►Advanced Python Tutorials - https://www.youtube.com/playlist?list=PLu0W_9lII9aiJWQ7VhY712fuimEpQZYp4\n\n►Object Oriented Programming In Python - https://www.youtube.com/playlist?list=PLu0W_9lII9ahfRrhFcoB-4lpp9YaBmdCP\n\n►Python Data Science and Big Data Tutorials - https://www.youtube.com/playlist?list=PLu0W_9lII9agK8pojo23OHiNz3Jm6VQCH\n\nFollow Me On Social Media\n►Website (created using Flask) - http://www.codewithharry.com\n►Facebook - https://www.facebook.com/CodeWithHarry\n►Instagram - https://www.instagram.com/codewithharry/\n►Personal Facebook A/c - https://www.facebook.com/geekyharis\nTwitter - https://twitter.com/Haris_Is_Here",
      thumbnails: {
        default: {
          url: "",
          width: 120,
          height: 90,
        },
        medium: {
          url: "",
          width: 320,
          height: 180,
        },
        high: {
          url: "",
          width: 480,
          height: 360,
        },
        standard: {
          url: "",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "CodeWithHarry",
      playlistId: "PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi",
      position: 0,
      resourceId: {
        kind: "youtube#video",
        videoId: "5_5oE5lgrhw",
      },
      videoOwnerChannelTitle: "CodeWithHarry",
      videoOwnerChannelId: "UCeVMnSShP_Iviwkknt83cww",
    },
  });
  const navOptions = ["Description", "Notes", "Comments"];
  const [currentOpt, setCurrentOpt] = useState("Description");
  const playerRef = useRef(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/playlistItems",
      params: {
        playlistId: id,
        part: "snippet",
        maxResults: "50",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setVideos(response.data.items);
        setCurrentVideo(response.data.items[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header nav={false} courseTitle={name} />
      <div className="flex flex-row justify-between">
        <div className="w-8/12">
          <ReactPlayer
            ref={playerRef}
            width="100%"
            height={500}
            url={`https://www.youtube.com/watch?v=${currentVideo.snippet.resourceId.videoId}`}
            controls
            pip={true}
          />

          <div className="flex flex-row gap-8 pl-10 py-4 font-semibold text-xl text-secondary">
            {navOptions.map((option, idx) => {
              return (
                <button
                  className={`${
                    currentOpt === option && "text-dark font-bold"
                  }`}
                  onClick={() => {
                    setCurrentOpt(option);
                  }}
                  key={idx}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <div className="w-fit px-10 pb-8">
            {currentOpt === "Description" && (
              <Description description={currentVideo.snippet.description} />
            )}
            {currentOpt === "Notes" && (
              <Notes title={currentVideo.snippet.title} player={playerRef} />
            )}
            {currentOpt === "Comments" && (
              <Comments videoId={currentVideo.snippet.resourceId.videoId} />
            )}
          </div>
        </div>
        <div className="w-4/12">
          <h1 className="text-xl font-bold  pl-10 py-4 bg-dark text-[#ffffff]">
            Course Content
          </h1>
          <hr />
          <div className="overflow-scroll h-screen w-full">
            {videos.map((video, index) => {
              return (
                <div
                  className={`px-6 py-2 hover:bg-light cursor-pointer ${
                    currentVideo === video && "bg-active"
                  }`}
                  onClick={() => {
                    setCurrentVideo(video);
                  }}
                  key={index}
                >
                  <p className="font-semibold">
                    <span className="font-bold">{index + 1}.</span>{" "}
                    {video.snippet.title}
                  </p>
                  <p className="pl-4 text-sm">5 min</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
