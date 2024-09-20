"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import classnames from "classnames";

interface NavLinkProps {
  path: string;
  label: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ path, label }) => {
  const pathname = usePathname();
  const isRouteActive = (path: string) => pathname === path;

  return (
    <Link href={path} className={classnames('nav-link', { 'activ': isRouteActive(path) })}>
      {label}
    </Link>
  );
};
