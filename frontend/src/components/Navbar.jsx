import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = ({ isAdmin, onLogout }) => {
    return (
        <nav className="fixed top-0 left-0 w-full p-2 z-50 bg-blue-500 drop-shadow-lg text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <div className="text-xl font-bold"><FontAwesomeIcon icon={faCar}/> CarX</div>
                <div className="flex gap-4">
                    {isAdmin && <a href="/admin" className="hover:underline">Admin Panel</a>}
                    <button onClick={onLogout} className="px-4 py-2 font-bold rounded-lg transition duration-700 ease-in-out hover:bg-blue-600 hover:cursor-pointer">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;