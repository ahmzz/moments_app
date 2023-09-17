import React, { useState, useEffect } from "react";
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
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => setUser(data[0]));
  }, []);

  return (
    <div className="flex bg-lightSkyBlueBg md:flex-row flex-col h-full transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user&&user} closeToggle={setToggleSidebar}/>
      </div>
      <div className="flex md:hidden flex-row">
        <HiMenu
          size={30}
          className=" cursor-pointer"
          onClick={() => setToggleSidebar(true)}
        />
        <Link to="/">
          <img src={logo} alt="logo" width={120} />
        </Link>
        <Link to={`user-profile/${user?.id}`}>
          <img src={user?.image} alt="logo" width={120} />
        </Link>
      </div>

      {toggleSidebar && (
          <div className="fixed bg-mainColor animate-slide-in w-4/5 h-screen overflow-y-auto z-10 ">
              <div className=" absolute w-full flex justify-end items-center p-4">
                  <AiFillCloseCircle size={20} className="text-white cursor-pointer" onClick={()=>setToggleSidebar(false)}/>
              </div>
              <Sidebar user={user&&user} closeToggle={setToggleSidebar}/>
          </div>
      )
      }

    </div>
  );
};

export default Home;
