import React from "react";
import { Header } from "./header";
import { LearningSection } from "./learningSection";
import { Footer } from "./footer";

export const Home = () => {
    return (
        <div className="flex flex-col gap-10">
            <Header currentPage="My Learning" />
            <LearningSection />
            <Footer />
        </div>
    );
};
