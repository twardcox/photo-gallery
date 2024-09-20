"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import { LoginButton } from "@/components/buttons/LoginButton";
import { LogoutButton } from "@/components/buttons/LogoutButton";
import { SignupButton } from "@/components/buttons/SignupButton";

export const HeaderNav = () => {
  const { user } = useUser();

  return (
    <div className="nav-bar-buttons">
      {!user && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {user && (
        <>
          <div>
            <h2><a href='/upload'>Upload Images</a></h2>
            <h2><a href='/'>Home</a></h2>
            <h2><a href='/gallery'>View Gallery</a></h2>
          </div>
          <LogoutButton />
        </>
      )}
    </div>
  );
};
