import React, { useEffect } from "react";

import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import bgVideo from "../assets/moments.mp4";
import logo from "../assets/logov1.1.png";
import { client } from "../client";
import {gapi} from 'gapi-script'

const Login = () => {

  const navigate=useNavigate()

  useEffect(()=>{

    function start(){
      gapi.client.init({
        clientId:process.env.REACT_APP_API_TOKEN,
        scope:""
      })
    }

    gapi.load('client:auth2',start)

  })


    const googleResponse=(res)=>{
      console.log(res)
      localStorage.setItem('user',JSON.stringify(res.profileObj))
      const {name,googleId,imageUrl}=res.profileObj

      const doc={
        _id:googleId,
        _type:"user",
        userName:name,
        image:imageUrl
      }

      client.createIfNotExists(doc)
      .then(()=>navigate('/',{replace:true}))

    }
    const onFailure=(res)=>{
      console.log(res);
    }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative h-full w-full">
        <video
          className="w-full h-full object-cover"
          src={bgVideo}
          type="video/mp4"
          loop
          controls={false}
          autoPlay={true}
          muted
        />

        <div className="absolute flex flex-col justify-center items-center left-0 right-0 bottom-0 top-0 bg-blackOverlay  ">
            <div className="p-5 ">
                <img src={logo} alt="logo" width="230px"  />
            </div>
            <div className="">
                <GoogleLogin
                    clientId={process.env.REACT_APP_API_TOKEN}
                    render={(renderProps)=>(
                        <button
                        type="button"
                        className="flex justify-center flex-col items-center mt-5 cursor-pointer"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        >
                        <FcGoogle size={35}/><h3 className="p-5 text-2xl text-mainText font-semibold">Sign In</h3>

                        </button>

                    )}
                    onSuccess={googleResponse}
                    onFailure={googleResponse}
                    isSignedIn={true}
                    cookiePolicy={"single_host_origin"}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
