"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import { Link } from "./Link";

export const HeaderNav = () => {
  const { user } = useUser();

  return (
    <div className="nav-bar-buttons">
      {!user && (
        <>
          <Link path="/api/auth/signup" label="Sign Up" />
          <Link path="/api/auth/login" label="Log In" />
        </>
      )}
      {user && (
        <>
          <Link path='/' label='Home' />
          <Link path="/profile" label="Profile" />
          <Link path='/gallery' label='View Gallery' />
          <Link path='/upload' label='Upload Images' />
          <Link path="/api/auth/logout" label="Log Out" />
        </>
      )}
    </div>
  );
};
