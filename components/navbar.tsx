"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="px-auto fixed flex w-full flex-row items-center justify-center border-b border-stone-300 bg-stone-50 py-3">
      <div className="flex w-full max-w-2xl items-center justify-start">
        <Link href="/">
          <Button className="flex font-light text-stone-500" variant="ghost">
            <ArrowLeft /> Back
          </Button>
        </Link>

        {/* สำหรับ dev สลับแถบง่ายๆ ปรับบรรทัด 22 เป็น justify-center */}
        {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex space-x-1 rounded-sm border bg-stone-100 p-1">
              <NavigationMenuLink asChild className="p-0">
                <Link href="/patient">
                  <Button
                    variant={pathname === "/patient" ? "outline" : "secondary"}
                    className={`transition-all duration-200 ease-in-out ${
                      pathname === "/patient"
                        ? ""
                        : pathname === "/"
                          ? ""
                          : "font-light"
                    }`}
                  >
                    PATIENT
                  </Button>
                </Link>
              </NavigationMenuLink>

              <NavigationMenuLink asChild className="p-0">
                <Link href="/staff">
                  <Button
                    variant={pathname === "/staff" ? "outline" : "secondary"}
                    // variant="secondary"
                    className={`w-full transition-all duration-200 ease-in-out ${pathname === "/staff" ? "" : "font-light"}`}
                  >
                    STAFF
                  </Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
        {/* <div className=""></div> */}
      </div>
    </nav>
  );
}

export default Navbar;
