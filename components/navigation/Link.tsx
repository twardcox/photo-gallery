"use client";

import { usePathname } from "next/navigation";
import React from "react";
import classnames from "classnames";

interface LinkProps {
  path: string;
  label: string;
}

export const Link: React.FC<LinkProps> = ({ path, label }) => {
  const pathname = usePathname();
  const isRouteActive = (path: string) => pathname === path;

  return (
    <a href={path} className={classnames({ 'active': isRouteActive(path) })}>
      {label}
    </a>
  );
};
