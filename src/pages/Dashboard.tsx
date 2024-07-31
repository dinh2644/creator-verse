import { Link } from "react-router-dom"
import Video from "../assets/glider.mp4"
import animation from "../assets/animation.module.css"


const Dashboard = () => {
    return (
        <>
            <div className="min-h-screen flex">
                {/* Left side */}
                <div className="w-full xl:w-1/2 flex flex-col justify-center items-center p-8">
                    <h1 className={`text-3xl sm:text-6xl mb-14 text-center ${animation.text}`}>A Hub of Creators.</h1>
                    <div className="flex gap-4 flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
                        <Link to="/new" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-2xl px-7 py-5 text-center me-2 mb-2">Get Started</Link>
                    </div>
                </div>

                {/* Right side */}
                <div className="w-1/2 relative hidden sm:hidden md:hidden lg:block">
                    <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted>
                        <source src={Video} type='video/mp4' />
                    </video>
                </div>
            </div>
        </>
    )
}

export default Dashboard