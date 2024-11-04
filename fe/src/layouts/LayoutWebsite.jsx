import { Link, Outlet } from "react-router-dom";

import { AiOutlineHeart, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";

const LayoutWebsite = () => {
  return (
    <>
      <header>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-8 items-center *:font-poppins mt-3">
            <Link to="/" className=" flex">
              <img src="public/Meubel House_Logos-05.png" alt="Nhshop" />
              <p className="font-bold text-4xl font-montserrat">Furnio</p>
            </Link>
            <nav>
              <ul className=" flex justify-center space-x-5 *:font-medium">
                <li className="hover:text-red-500 transition-colors duration-500">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-red-500 transition-colors duration-500">
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="hover:text-red-500 transition-colors duration-500">
                  <Link to="/about">About</Link>
                </li>
                <li className="hover:text-red-500 transition-colors duration-500">
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
            <div className="space-x-3 flex justify-center items-center">
              <Link
                to="/search"
                className=" hover:text-red-500 transition-colors duration-500"
              >
                <AiOutlineSearch />
              </Link>
              <Link
                to="/withlist"
                className=" hover:text-red-500 transition-colors duration-500"
              >
                <AiOutlineHeart />
              </Link>
              <Link
                to="/withlist"
                className=" hover:text-red-500 transition-colors duration-500"
              >
                <IoCartOutline />
              </Link>
              <Link
                to="/withlist"
                className=" hover:text-red-500 transition-colors duration-500"
              >
                <AiOutlineUser />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <Outlet />
      <footer>
        <div className="  bg-black text-white *:font-poppins h-[425px]">
          <div className="grid grid-cols-4 gap-8 items-start max-w-6xl mx-auto ">
            <div className="mt-12">
              <div className="flex mb-4">
                <img src="public/Meubel House_Logos-05.png" alt="Nhshop" />
                <p className="font-bold text-4xl font-montserrat">Furnio</p>
              </div>
              <span className=" font-normal ">
                400 University Drive Suite 200 Coral Gables, FL 33134 USA
              </span>
            </div>
            <div className="mt-12 ">
              <h2 className="text-[30px] font-semibold ">Sitemap</h2>
              <div className="mt-3 flex flex-col *:font-medium">
                <span>Home</span> <br />
                <span>Shop</span> <br />
                <span>About</span> <br />
                <span>Contact</span> <br />
              </div>
            </div>
            <div className="mt-12 ">
              <h2 className="text-[30px] font-semibold ">Help</h2>
              <div className="mt-3 flex flex-col *:font-medium">
                <span>Payment Options</span> <br />
                <span>Returns</span> <br />
                <span>Privacy Policies</span> <br />
              </div>
            </div>
            <div className="mt-12 ">
              <h2 className="text-[30px] font-semibold ">Location</h2>
              <div className="mt-3 flex flex-col *:font-medium">
                <span>support@euphoria.in</span> <br />
                <span>Ahmedabad Main Road</span> <br />
                <span>Udaipur, India- 313002</span> <br />
              </div>
            </div>
          </div>
          <hr className="mt-[30px]" />
          <p className="text-center mt-[35px]">
            Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default LayoutWebsite;
