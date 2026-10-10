import { SquareArrowRightExit } from 'lucide-react'
import React from 'react';  


const Navbar = () => {
  return (
   <nav className="flex justify-between items-center px-12 py-5 border-b border-gray-200 bg-white">

    <h1 className="text-3xl font-bold">
        Expense Tracker
    </h1>

    <div className="flex items-center gap-6">

        <p className="text-gray-500">
            Welcome, Unish Shakya
        </p>

        <button className="border border-gray-300 px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-100">
          <SquareArrowRightExit/>  Logout
        </button>

    </div>
</nav>
  )
}

export default Navbar