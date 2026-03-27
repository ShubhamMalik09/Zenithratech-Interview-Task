import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = ({title}) => {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center mb-6 relative w-full">
        <button onClick={() => navigate("/")} className=" absolute top-0 left-0 py-2 px-3 rounded-md bg-blue-600 cursor-pointer">⬅ Back</button>
        <h1 className="text-5xl font-bold">{title}</h1>
    </div>
  )
}

export default Header