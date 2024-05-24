import React, { useEffect, useState } from "react";
import BannerImage from "../assets/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";
import { Carousel } from "./Carousel";

const Home = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);
  }, []);

  const carouselData = [
    {
      src: "/images/carousel-image-1.jpg",
      alt: "Carousel Image 1",
    },
    {
      src: "/images/carousel-image-2.png",
      alt: "Carousel Image 2",
    },
    {
      src: "/images/carousel-image-3.png",
      alt: "Carousel Image 3",
    },
    {
      src: "/images/carousel-image-4.png",
      alt: "Carousel Image 4",
    },
    {
      src: "/images/carousel-image-5.png",
      alt: "Carousel Image 5",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-grey-100">
      <div className="flex flex-col justify-center py-12 home-banner-container md:flex-row">
        <div className="max-w-lg px-4 text-center home-text-section md:text-left md:max-w-xl md:px-0">
          <h1
            className="px-2 mt-20 mb-8 text-3xl font-bold text-gray-600 md:text-4xl lg:text-5xl"
            style={{ lineHeight: "4rem" }}
          >
            Navigate your career path with ease – discover <br />
            your next opportunity today!
          </h1>{" "}
          <a href="/Findjobs" className="flex items-center">
            <button className="flex items-center px-4 py-3 text-lg font-bold text-white rounded bg-theme hover:bg-purple-700">
              Find Jobs <FiArrowRight className="ml-2" />
            </button>
          </a>
        </div>
        <div className="mt-8 home-image-section md:mt-0 md:ml-12">
          <img src={BannerImage} alt="" style={{ width: "600px" }} />
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
          About the Website
        </h2>

        <Carousel data={carouselData} />
      </div>
    </div>
  );
};

export default Home;
