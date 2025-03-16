import { JSX } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { FaUserCircle, FaUserFriends } from "react-icons/fa";
import Link from "next/link";
import { FcSettings } from "react-icons/fc";
import { WiMoonAltWaningCrescent3 } from "react-icons/wi";
import { Separator } from "../ui/separator";
import AuthBtn from "../auth-btn";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import { cn } from "@/lib/utils";
export const role = (role_code: string): string => {
    const roles: Record<string, string> = {
        "admin": "Project Administrator",
        "manager": "Project Manager",
        "developer": "Developer",
        "user": "User",
        "viewer": "Viewer",
    }
    return roles[role_code] || "Unknown Role";
}
const AccountMenu = (): JSX.Element => {
    const { data: session } = useSession();
    
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Image src={session?.user?.image || "/assets/logo.svg"} width={32} height={32} alt="user" className="rounded-full cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className={cn(`w-[336px] mt-3 rounded-[2px] p-0`, robotoCondensed.className)}>
                    <DropdownMenuItem>
                        <div className="h-[120px] bg-gray-200 w-full rounded-[2px] p-2 flex justify-start items-center gap-2">
                            <Image src={session?.user?.image || "/assets/logo.svg"} width={64} height={64} alt="user" className="rounded-full" />
                            <div>
                                <p className="text-neutral-800 text-lg font-bold">{session?.user?.name}</p>
                                <p className="text-neutral-500 text-xs font-bold">{session?.user?.email}</p>
                                <p className="text-neutral-500 text-xs font-bold">{role(session?.user?.role || "")}</p>
                            </div>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                        <FaUserCircle />
                        <Link href="/profile" className="flex justify-start items-center gap-2 p-2">Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                        <FcSettings />
                        <Link href="/profile" className="flex justify-start items-center gap-2 p-2">Account Management</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                        <WiMoonAltWaningCrescent3 />
                        <Link href="/profile" className="flex justify-start items-center gap-2 p-2">Theme Settings</Link>
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem >
                        <FaUserFriends />
                        <Link href="#" className="flex justify-start items-center gap-2 p-2">Switch Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <AuthBtn variant="default" clickHandler={() => signOut()}>
                            Sign out
                        </AuthBtn>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default AccountMenu;