import { Outlet } from "react-router-dom"

const MainLayout = () => {
    return (
        <div className="bg-blue-500 min-h-screen w-full text-white p-12">
            <Outlet />
        </div>
    )
}

export default MainLayout