import { Link } from "react-router-dom";
import LogOut from "../LogOut";
import Container from "../Container";

const Sidebar = () => {
  return (
    <section>
      <Container>
        <div className="w-64 bg-white shadow min-h-screen p-5">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <div className="space-y-3 pl-4">
            <Link  className="block hover:text-blue-600">
              Dashboard
            </Link>
            <Link to={"/dashboard/profile"} className="block hover:text-blue-600">
              Profile
            </Link>
            <Link to="/dashboard/settings" className="block hover:text-blue-600">
              settings
            </Link>
            <div>
              <LogOut />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Sidebar;