import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = props => {
    const nav = props.nav && true;
    const courseTitle = props.courseTitle;
    const [currentPage, setCurrentPage] = useState(props.currentPage);

    return (
        <div className="flex flex-row justify-between px-4 lg:px-20 py-4 bg-gradient-to-r from-dark to-secondary via-primary">
            <Link to="/">
                <h1 className="hidden md:flex text-[#ffffff] text-left text-3xl font-bold ">
                    <span className="text-[#91a380]">C</span>ORGANISER
                </h1>
                <h1 className="md:hidden text-[#ffffff] text-left text-3xl font-bold ">
                    <span className="text-[#91a380]">C</span>O
                </h1>
            </Link>

            <div
                className={`text-[#ffffff] ${
                    courseTitle || "hidden"
                } text-xl font-semibold`}
            >
                <p>{courseTitle}</p>
            </div>
            <div
                className={`flex flex-row gap-6 lg:gap-12 text-light font-semibold ${
                    nav === false && "hidden"
                } text-base md:text-lg`}
            >
                <button
                    className={`${
                        currentPage === "My Learning" && "font-bold text-white"
                    }`}
                    onClick={() => {
                        setCurrentPage("My Learning");
                    }}
                >
                    <Link to="/">My Learning</Link>
                </button>
                <button
                    className={`${
                        currentPage === "About" && "font-bold text-white"
                    }`}
                    onClick={() => {
                        window.scrollTo({
                            top: document.documentElement.scrollHeight,
                            behavior: "smooth",
                        });
                        setCurrentPage("About");
                    }}
                >
                    About
                </button>
                <button
                    className={`${
                        currentPage === "FAQs" && "font-bold text-white"
                    }`}
                    onClick={() => {
                        setCurrentPage("FAQs");
                    }}
                >
                    <Link to="/FAQs">FAQs</Link>
                </button>
            </div>
        </div>
    );
};
