import axios from "axios";
import { LuLogOut } from "react-icons/lu";

const LogOut = () => {

 const handleLogout = async () => {
   try {
     await axios.post(
       "http://localhost:3000/api/auth/logout",
       {},
       { withCredentials: true }
     );

     window.location.href = "/";
   } catch (error) {
     console.error("Logout failed", error);
   }
 };

  return <div onClick={handleLogout} className="flex cursor-pointer mb-4 items-center gap-x-2 py-2 group rounded hover:text-blue-600 hover:bg-gray-100 pl-4">
    <div>
      <LuLogOut className="group-hover:text-blue-500 text-gray-600" />
    </div>
    <button className="text-gray-600 group-hover:text-blue-500 rounded cursor-pointer">Logout</button>
  </div>;
};

export default LogOut;