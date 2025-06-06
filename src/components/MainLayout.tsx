import { assets } from "../assets/assets";
import WcTwoToneIcon from "@mui/icons-material/WcTwoTone";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { useContext, useRef, type ReactNode } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import {
  CubeIcon,
  InformationCircleIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";

import { UserContext } from "../contexts/UserContextProvider";

const BaseURL = import.meta.env.BASE_URL;

const navWidthBeforeExpand = "60px";
const navWidthAfterExpand = "180px";

const userInfo = {
  firstName: "Mohammed",
  lastName: "Naji",
  email: "mna816008@gmail.com",
  image: null,
};
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type NavigationItem = {
  name: string;
  to: string;
  current: boolean;
  icon?: ReactNode;
};
type Navigation = NavigationItem[];
const navigation: Navigation = [
  {
    icon: <InformationCircleIcon />,
    name: "DashBoard",
    to: `${BaseURL}dashboard`,
    current: false,
  },
  {
    icon: <CubeIcon />,
    name: "Products",
    to: `${BaseURL}products`,
    current: true,
  },
  {
    icon: <WcTwoToneIcon />,
    name: "Customers",
    to: `${BaseURL}customers`,
    current: false,
  },
];

const userNavigation = [
  { name: "Profile", to: `${BaseURL}profile`, current: false },
  { name: "Edit Profile", to: `${BaseURL}editprofile`, current: false },
  { name: "Setting", to: `${BaseURL}settings`, current: false },
  { name: "Log Out", to: `${BaseURL}login`, current: false },
];

export default function MainLayout() {
  const navElement = useRef<HTMLElement | null>(null);
  const userMenu = useRef<HTMLDivElement | null>(null);
  const mobileNavMenu = useRef<HTMLDivElement | null>(null);
  const { token, setToken } = useContext(UserContext);

  const shrinkNav = () => {
    (navElement.current as HTMLElement).style.width = navWidthBeforeExpand;
    navElement.current?.querySelectorAll("a span").forEach((el) => {
      el.classList.add("hidden");
    });
  };
  const expandNav = () => {
    (navElement.current as HTMLElement).style.width = navWidthAfterExpand;
    navElement.current?.querySelectorAll("a span").forEach((el) => {
      el.classList.remove("hidden");
    });
  };
  const toggleUserMenu = () => {
    userMenu.current?.classList.toggle("hidden");
  };

  const hideUserMenu = () => {
    userMenu.current?.classList.add("hidden");
  };

  const toggleMobileMenu = () => {
    mobileNavMenu.current?.classList.toggle("hidden");
  };
  const closeMobileNavMenu = () => {
    mobileNavMenu.current?.classList.add("hidden");
  };
  const logout = (ev: React.MouseEvent) => {
    ev.preventDefault();
    window.localStorage.removeItem("ACCESS_TOKEN");
    setToken("");
  };

  if (!token) {
    return <Navigate to={"/admin/login"} />;
  }
  console.log("hello");

  return (
    <div className="flex min-h-[100vh]  relative">
      {/* page navigation */}
      <div
        className={`min-h-full relative left-0 top-0 mr-0 md:mr-[60px] hidden md:block`}
      >
        <nav
          ref={navElement}
          onMouseEnter={expandNav}
          onMouseLeave={shrinkNav}
          className={`fixed left-0 top-0 z-50 items-start  flex-col  bg-black  transition-all flex h-full`}
          style={{ width: navWidthBeforeExpand }}
        >
          <div className=" cursor-pointer w-full text-center p-3 hover:bg-white/30">
            <img
              className="h-8 w-8 m-auto"
              src={assets.profile_img}
              alt="Your Company"
            />
          </div>
          {navigation.map((link, ind) => {
            return (
              <NavLink
                key={ind}
                to={link.to}
                className={({ isActive }: { isActive: boolean }): string =>
                  classNames(
                    isActive ? "text-white bg-white/30" : "",
                    "flex  items-center py-4 px-2 border-b-white/40 border-b-2  w-full text-center text-gray-300 transition font-bold hover:text-white hover:bg-white/30"
                  )
                }
              >
                <>
                  {link.icon ? (
                    <div className="size-6 mr-2 ml-2 self-center">
                      {link.icon}
                    </div>
                  ) : (
                    <InformationCircleIcon className="size-6 mr-2 ml-2 self-center" />
                  )}
                  <span className="hidden">{link.name}</span>
                </>
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="w-full min-h-full mt-0 md:mt-4 relative">
        {/* user navigation in Medium Screen */}
        <div className="items-center justify-end hidden md:flex pr-10 mb-5 shadow-sm pb-3">
          <MusicalNoteIcon className="size-8 mr-3 cursor-pointer" />
          <div
            onClick={toggleUserMenu}
            className="w-[50px] h-[50px] rounded-full cursor-pointer"
          >
            {userInfo.image && (
              <img
                src={userInfo.image}
                alt=""
                className="w-full h-full rounded-full "
              />
            )}
            {!userInfo.image && (
              <img
                src={assets.course_4}
                alt=""
                className="w-full h-full rounded-full "
              />
            )}
          </div>
        </div>
        {/* user menu */}
        <div
          ref={userMenu}
          onMouseLeave={hideUserMenu}
          className="bg-black transition-all rounded-xl w-[200px] fixed z-50 right-[50px] top-[80px] hidden"
        >
          {userNavigation.map((link, index) => {
            return (
              <NavLink
                onClick={(ev) => {
                  if (link.name === "Log Out") logout(ev);
                }}
                key={index}
                to={`${link.to}`}
                className={({ isActive }: { isActive: boolean }): string =>
                  classNames(
                    isActive ? "text-white bg-gray-500" : "",
                    "flex justify-center  items-center py-3 px-2 border-b-white/30 border-b-2  w-full text-center text-gray-300 transition font-bold hover:text-white hover:bg-white/30"
                  )
                }
              >
                {link.name}
              </NavLink>
            );
          })}
        </div>
        <div className="block md:hidden bg-black h-[50px]">
          <button className="button h-full" onClick={toggleMobileMenu}>
            <MenuTwoToneIcon className="size-8 ml-5 text-white" />
            {""}
          </button>
        </div>
        {/* navigation for mobile screen */}

        <div ref={mobileNavMenu} className="hidden">
          <div
            className=" top-0 left-0 z-[100] fixed  bg-black/30 cursor-pointer h-[100vh] w-[100vw]"
            onClick={closeMobileNavMenu}
          ></div>
          <nav className="fixed top-0 left-0 w-[300px] h-full z-[200]  p-2  bg-black">
            <div className="border-b-2 border-b-white/30  pb-4">
              <div className="w-[50px] h-[50px] rounded-full cursor-pointer flex ">
                <span
                  className="absolute -right-[40px] top-[30px] w-[40px] h-[40px] x text-gray-300 bg-black hover:bg-white/30 hover:text-white text-2xl flex justify-center items-center font-bold visible"
                  onClick={closeMobileNavMenu}
                >
                  X
                </span>
                {userInfo.image && (
                  <img
                    src={userInfo.image}
                    alt=""
                    className="w-full h-full rounded-full "
                  />
                )}
                {!userInfo.image && (
                  <img
                    src={assets.course_4}
                    alt=""
                    className="w-full h-full rounded-full "
                  />
                )}
                <div className="ml-2 ">
                  <h3 className="text-lg text-white  font-bold">
                    {userInfo.firstName} {userInfo.lastName}{" "}
                  </h3>
                  <h4 className="text-gray-300 text-m font-bold">
                    {" "}
                    {userInfo.email}{" "}
                  </h4>
                </div>
              </div>
            </div>
            {/* navigation Links */}
            <div className="border-b-2 border-b-white/30  pb-4">
              {navigation.map((link, ind) => {
                return (
                  <NavLink
                    key={ind}
                    to={link.to}
                    className={({ isActive }: { isActive: boolean }): string =>
                      classNames(
                        isActive ? "text-white bg-white/30" : "",
                        "flex  items-center py-4 px-2   w-full text-center text-gray-300 transition font-bold hover:text-white hover:bg-white/30"
                      )
                    }
                  >
                    <>
                      {link.icon ? (
                        <div className="size-6 mr-2 ml-2 self-center">
                          {link.icon}
                        </div>
                      ) : (
                        <InformationCircleIcon className="size-6 mr-2 ml-2 self-center" />
                      )}
                      <span className="">{link.name}</span>
                    </>
                  </NavLink>
                );
              })}
            </div>
            {/* userNavigation Links */}
            <div className="">
              {userNavigation.map((link, index) => {
                return (
                  <NavLink
                    onClick={(ev) => {
                      if (link.name === "Log Out") logout(ev);
                    }}
                    key={index}
                    to={`${link.to}`}
                    className={({ isActive }: { isActive: boolean }): string =>
                      classNames(
                        isActive ? "text-white bg-white/30" : "",
                        "block py-4 px-2  w-full text-start    text-gray-300 transition font-bold hover:text-white hover:bg-white/30"
                      )
                    }
                  >
                    {link.name}
                  </NavLink>
                );
              })}
            </div>
          </nav>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
