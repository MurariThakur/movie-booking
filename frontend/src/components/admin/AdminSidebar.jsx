import {
  HomeIcon,
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const AdminSidebar = () => {
  const user = {
    Firstname: "Admin",
    Lastname: "User",
    image: assets.profile,
  };

  const adminNavLinks = [
    {
      name: "Dashboard",
      icon: LayoutDashboardIcon,
      link: "/admin",
    },
    {
      name: "Add Shows",
      icon: PlusSquareIcon,
      link: "/admin/add-shows",
    },
    {
      name: "List Shows",
      icon: ListIcon,
      link: "/admin/list-shows",
    },
    {
      name: "List Bookings",
      icon: ListCollapseIcon,
      link: "/admin/list-bookings",
    },
    {
      name: "Home",
      icon: HomeIcon,
      link: "/",
    },
  ];
  return (
    <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm">
      <img
        src={user.image}
        alt="profile"
        className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
      />
      <p className="mt-2 text-base max-md:hidden">
        {user.Firstname} {user.Lastname}
      </p>
      <div className="w-full">
        {adminNavLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.link}
            end
            className={({ isActive }) =>
              `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400 ${
                isActive && "bg-primary/15 text-primary group"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <link.icon className="w-5 h-5" />
                <p className="max-md:hidden">{link.name}</p>
                <span
                  className={`w-1.5 h-10 rounded-1 right-0 absolute ${
                    isActive && "bg-primary"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
