import React, { useState, useEffect, useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar, UserProfile } from "../components/index";
import logo from "../assets/logov1.1.png";
import { client } from "../client";
import { userQuery } from "../utils/data";
import Moments from "./Moments";
const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => setUser(data[0]));
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-lightSkyBlueBg md:flex-row flex-col h-full transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user}  />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-4 w-full flex flex-row justify-between items-center">
          <HiMenu
            size={20}
            className=" cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" width={120} />
          </Link>
          <Link to={`user-profile/${user?.id}`}>
            <img src={user?.image} alt="logo" width={30} />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed bg-mainColor animate-slide-in w-2/4 h-screen overflow-y-auto z-10 ">
            <div className=" absolute w-full flex justify-end items-center p-4">
              <AiFillCloseCircle
                size={20}
                className="text-white cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>

      <div className=" pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Moments user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
