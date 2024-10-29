/* eslint-disable no-unused-vars */
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";

const LoginPage = () => {
  return (
    <div>
      <header>
        <SignedOut>
          {/* Nút đăng nhập Clerk */}
          <SignInButton>
            <button className="hover:text-red-500 transition-colors duration-500">
              <AiOutlineUser />
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          {/* Nút thông tin người dùng */}
          <UserButton />
        </SignedIn>
      </header>
    </div>
  );
};

export default LoginPage;
