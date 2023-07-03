import React from "react";
import { CourseCard } from "./courseCard";
import { useState, useRef } from "react";
import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AddCourseModal from "./AddCourseModal";

export const LearningSection = () => {
  const [courses, setCourses] = useState([]);
  const [addCourse, setAddCourse] = useState(false);

  const handleClick = (inputRef) => {
    const link = inputRef.current.value;
    inputRef.current.value = null;
    const playlistID = link.split("list=")[1].split("&")[0];

    const options = {
      method: "GET",
      url: "https://youtube-v31.p.rapidapi.com/playlists",
      params: { id: playlistID, part: "snippet" },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        const newCourse = {
          id: playlistID,
          name: response.data.items[0].snippet.title,
          channel: response.data.items[0].snippet.channelTitle,
          thumbnail: response.data.items[0].snippet.thumbnails.medium.url,
          progress: 0,
        };
        setCourses((courses) => [...courses, newCourse]);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <h2 className="text-primary text-center text-2xl font-bold">
        My Learnings
      </h2>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 content-center grid-flow-row flex-row gap-6 mx-4 md:mx-10 border-2 border-dark bg-light rounded-xl p-8">
        {courses.map((course) => {
          return <CourseCard course={course} key={course.name} />;
        })}
        <div className="bg-[#ffffff] w-60 border-2 border-secondary rounded-lg p-2">
          <div className="w-min mx-auto pt-16 pb-12">
            <AiOutlinePlusCircle size={80} color={"#1a3d41"} />
          </div>
          <button
            className="border rounded-full px-10 py-2 font-semibold w-full text-[#ffffff] bg-primary hover:bg-dark text-base mt-6 whitespace-nowrap"
            onClick={() => {
              setAddCourse(true);
            }}
          >
            Add New Course
          </button>
        </div>
      </div>
      <AddCourseModal isOpen={addCourse} onClose={() => setAddCourse(false)} handleClick={handleClick}/>
    </>
  );
};
