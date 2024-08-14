"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const Header = () => {
  const profileRoute = "/profile";
  const links = ["/"];

  function navigationMenuTriggerStyle() {
    const testClasses = "decoration-none capitalize";
    return testClasses;
  }

  return (
    <header className="bg-white fixed top-0 inset-x-0 w-full">
      <NavigationMenu>
        <NavigationMenuList className="gap-5">
          {links.map((link) => {
            return (
              <NavigationMenuItem key={link}>
                <Link href={`/${link}`} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {link}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
        <NavigationMenuList className="right-10">
          <SignedIn>
            {usePathname() === profileRoute ? (
              <UserButton />
            ) : (
              <Link href={profileRoute} legacyBehavior passHref>
                <NavigationMenuLink>Profile</NavigationMenuLink>
              </Link>
            )}
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
