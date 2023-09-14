import React from 'react'

import GoogleLogin from 'react-google-login'
import {useNavigate} from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import bgVideo from '../assets/moments.mp4'
import logo from '../assets/logov1.png'

const Login = () => {
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative h-full w-full'>
        <video
            src={bgVideo}
            type='video/mp4'
            loop
            controls={false}
            autoPlay={true}
            muted


        />

        </div>
    </div>
  )
}

export default Login