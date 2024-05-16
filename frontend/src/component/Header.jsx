import { Link } from "react-router-dom";
import { LuUserCircle2 } from "react-icons/lu";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/authSlice";
import toast from "react-hot-toast";
import bunnyImage from "../assets/peeping bunny.avif";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  console.log(userData.email);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };

  const handleLogOut = () => {
    dispatch(logoutRedux());
    toast("Logout Successfully");
  };

  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* Desktop */}
      <div className="flex items-center h-full justify-between">
        <Link>
          <div className="h-14">
            <img src={bunnyImage} className="h-full rounded-full " />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className=" md:flex gap-4 md:gap-6 text-base md:text-lg hidden ">
            <Link to={""}>Home</Link>
            {/* <Link to={"menu"}>Menu</Link> */}
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <FaCartShopping />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className=" text-slate-600 " onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer h-8 w-8 overflow-hidden rounded-full drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" />
              ) : (
                <LuUserCircle2 />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 py-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center bg-white">
                {userData.email ===
                  import.meta.env.VITE_REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer"
                  >
                    New Product
                  </Link>
                )}

                {userData.image ? (
                  <p
                    className="cursor-pointer bg-red-500 text-white"
                    onClick={handleLogOut}
                  >
                    Logout
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}

                <nav className=" text-base md:text-lg flex flex-col md:hidden ">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  {/* <Link to={"menu"} className="px-2 py-1">
                    Menu
                  </Link> */}
                  <Link to={"about"} className="px-2 py-1">
                    About
                  </Link>
                  <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile  6639d69d245f0466b8832998*/}
    </header>
  );
};

export default Header;
