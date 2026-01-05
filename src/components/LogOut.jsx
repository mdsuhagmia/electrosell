import axios from "axios";
import { LuLogOut } from "react-icons/lu";

const LogOut = () => {

 const handleLogout = async () => {
  try {
    await axios.post("https://es-back-xv9z.onrender.com/api/auth/logout", {}, { withCredentials: true });
    
    window.location.href = "/";
  } catch (error) {
    console.error("Logout failed", error);
  }
};

  return <div onClick={handleLogout} className="flex items-center gap-x-2 pb-2 group rounded">
    <div>
      <LuLogOut className="group-hover:text-blue-500 text-black" />
    </div>
    <button className="text-black group-hover:text-blue-500 rounded cursor-pointer">Logout</button>
  </div>;
};

export default LogOut;