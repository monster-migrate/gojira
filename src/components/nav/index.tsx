import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import { CiMenuFries } from "react-icons/ci";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AuthElement from "./auth";
const Navigation = (): JSX.Element => {
    return (
        <header>
            <div className={cn(
                `bg-gray-200 text-gray-700 py-4 px-8 sm:px-24`,
                `flex items-center justify-between w-screen text-xl gap-4`,
                robotoCondensed.className
            )}>
                {/* Logo */}
                <Image src="/assets/logo-text.png" width={100} height={50} alt="logo" />

                {/* Mobile Menu (Hamburger) */}
                <div className="flex items-center sm:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div
                                className="border border-emerald-800 rounded-md px-4 py-2 focus:bg-emerald-400 data-[state=open]:bg-emerald-400"
                            >
                                <CiMenuFries />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 mt-4">
                            <DropdownMenuLabel>Navigator</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>Features</DropdownMenuItem>
                                <DropdownMenuItem>Guides</DropdownMenuItem>
                                <DropdownMenuItem>Templates</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>
                                    <AuthElement />
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>Create New Team</DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Invite Users</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>Email</DropdownMenuItem>
                                            <DropdownMenuItem>Message</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>More...</DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuItem>Join Team</DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>GitHub</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuItem disabled>API</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                Log out, but only if you are signed in
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex w-full md:justify-evenly lg:justify-start space-x-4">
                    <li><Link href="/features" className="text-gray-700 hover:text-blue-500">Features</Link></li>
                    <li><Link href="/guides" className="text-gray-700 hover:text-blue-500">Guides</Link></li>
                    <li><Link href="/templates" className="text-gray-700 hover:text-blue-500">Templates</Link></li>
                    <li><Link href="/pricing" className="text-gray-700 hover:text-blue-500">Pricing</Link></li>
                    <li><Link href="/enterprise" className="text-gray-700 hover:text-blue-500">Enterprise</Link></li>
                </ul>

                {/* Sign In Button (Desktop Only) */}
                <div className="hidden sm:flex">
                    <AuthElement />
                </div>
            </div>
        </header>

    );
}
export default Navigation;