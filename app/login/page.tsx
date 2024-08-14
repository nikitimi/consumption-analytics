"use client";

import React from "react";
import { SignInButton } from "@clerk/nextjs";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <SignInButton />
    </div>
  );
};

export default Login;
