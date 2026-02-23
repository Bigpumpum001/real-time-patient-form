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
    <nav className="fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-center border-b border-stone-300 bg-stone-50 px-4 py-3">
      <div className="flex w-full max-w-3xl items-center justify-between">
        <Link
          href="/"
          className="group flex font-serif text-3xl  text-stone-900 transition-colors duration-200 hover:opacity-80"
        >
          {/* <Button
            className="flex font-serif text-3xl  text-stone-900"
            variant="ghost"
          > */}
          <p className="tracking-wide">
            Patient
            <span className="text-green-800 italic transition-colors duration-200 group-hover:text-green-700">
              {" "}
              Intake
            </span>
          </p>

          {/* </Button> */}
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
        <Link href="/" className={`${pathname === "/" ? "hidden" : "flex"}`}>
          <Button
            className="flex font-serif font-light text-lg md:text-xl text-stone-800"
            variant="link"
          >
            <ArrowLeft size={16} className="md:hidden mr-1" />
            <ArrowLeft size={20} className="hidden md:inline mr-2" />
            <span className="hidden md:inline">Back to home</span>
            <span className="md:hidden">Back</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;



