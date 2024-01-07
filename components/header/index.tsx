'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"

import { cn } from "@/lib/utils"
import { menuItems } from "@/utils"
import { MenuItem } from "@/utils/types"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { ThemeToggler } from "@/components/ui/theme-toggler"

export default function Header() {
  const [sticky, setSticky] = useState<boolean>(false)
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false)
  const { data: session } = useSession()

  useEffect(() => {
    const scrollYPos: EventListener = (event: Event) => {           // <-- DOM-EventListener
      window.scrollY >= 40 ? setSticky(true) : setSticky(false)
    };

    // const win: Window = window;                                  // <-- DOM-Window, extends DOM-EventTarget
    window.addEventListener("scroll", scrollYPos);

    // remove event
    return () => window.removeEventListener('scroll', scrollYPos)
  },[])

  return (
    
    <header className={cn(
      "top-0 left-0 flex w-full items-center",
      `${sticky ?  "!fixed !z-[999] py-4 bg-white !bg-opacity-70 shadow-lg backdrop:blur-sm !transition dark:!bg-primary dark:!bg-opacity-50" : ""}`
    )}>
      <div className="relative flex items-center justify-between w-full">
        {/* Brand */}
        <div className="w-60 max-w-full px-4 xl:mr-12">
          <Link 
            href="/"
            className={cn(
              "text-[30px] font-extrabold cursor-pointer block w-full",
              `${sticky ? "py-5 lg:py-2" : "py-8"}`
            )}
            >
            NextBlog
          </Link>
        </div>
        
        {/* Menu, Create, Login, Toggler */}
        <div className="flex w-full items-center justify-between px-4">
          {/* Menu */}
          <div>
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              id="navbarToggler"
              aria-label="Mobile Menu"
              className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] lg:hidden"
            >
              <span
                className={`relative my-1.5 block h-0.5 w-[30px] bg-foreground transition-all duration-300
                    ${navbarOpen ? "top-[7px] rotate-45" : ""}
                    `}
              />
              <span
                className={`relative my-1.5 block h-0.5 w-[30px] bg-foreground transition-all duration-300
                    ${navbarOpen ? "opacity-0" : ""}
                    `}
              />
              <span
                className={`relative my-1.5 block h-0.5 w-[30px] bg-foreground transition-all duration-300
                    ${navbarOpen ? "top-[-8px] -rotate-45" : ""}
                    `}
              />
            </button>
            <nav
              id="navbarCollapse"
              className={cn(
                "absolute right-0 z-30 rounded border-2 py-4 duration-300 lg:visible",
                  "lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100",
                `${navbarOpen ? "visible top-full opacity-100"  : "invisible top-[120%] opacity-0"}`
              )
            }
            >
              <NavigationMenu >
                <NavigationMenuList className="flex flex-col lg:flex-row justify-center">
                  { menuItems.map((item: MenuItem) => (
                    <NavigationMenuItem key={item.id}>
                      <Link href={item.path} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
            </NavigationMenu>
            </nav>
          </div>

          {/* Create, login, toggler */}
          <div className="flex gap-4 items-center justify-end pr-16 lg:pr-0">
            { session && (
              <Link href='create'>
                <Button>Create</Button> 
              </Link>
            )}
            { session ? (
              <Button onClick={() => signOut()}>Logout</Button>
            ) : (
              <Button onClick={() => signIn()}>Login</Button>
            )}
            
            
            <ThemeToggler />
          </div>
        </div>
      </div>
    </header>
    
  )
}