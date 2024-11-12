'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect, useRef } from 'react';
import { Link } from './Link';

export const HeaderNav = () => {
  const { user } = useUser();
  const userRef = useRef(user);
  useEffect(() => {
    if (!userRef.current) {
      userRef.current = user;
      console.log('User logged in');
    }
  }, [user]);

  return (
    <div className="nav-bar-buttons">
      {!userRef.current && (
        <>
          <Link path="/api/auth/signup" label="Sign Up" />
          <Link path="/api/auth/login" label="Log In" />
        </>
      )}
      {userRef.current && (
        <>
          <Link path="/" label="Home" />
          <Link path="/admin/profile" label="Profile" />
          <Link path="/photos/gallery" label="Gallery" />
          <Link path="/photos/upload" label="Upload" />
          <Link path="/api/auth/logout" label="Log Out" />
        </>
      )}
    </div>
  );
};
