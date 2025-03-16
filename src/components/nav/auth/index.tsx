import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { WiMoonAltFirstQuarter } from "react-icons/wi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import styles from "./index.module.css";
import { JSX } from "react";
import AuthBtn from "@/components/auth-btn";
import Image from "next/image";
import { CiCircleChevDown, CiSettings } from "react-icons/ci";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MdDashboard } from "react-icons/md";
const AuthElement = (): JSX.Element => {
    const { data: session, status } = useSession();
    return (
        <>
            {status === "authenticated" && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex justify-center items-center text-sm w-[220px] gap-4 p-2 rounded-md shadow-lg cursor-pointer">
                            {session?.user?.image && (
                                <Image src={session.user.image} height={32} width={32} alt="user" className="rounded-full p-0" />
                            )}
                            <p>{session?.user?.name}</p>
                            <CiCircleChevDown size={30} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 h-full mt-4 rounded-lg">
                        <DropdownMenuLabel>Your Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="justify-between cursor-pointer">
                                Settings
                                <CiSettings />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="justify-between cursor-pointer">
                                <Link href={`/dashboard/${session?.user?.fdlst_private_userId}`}>Dashboard</Link>
                                <MdDashboard />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="justify-between cursor-pointer">
                                Theme
                                <WiMoonAltFirstQuarter />
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="justify-between cursor-pointer">
                                Switch Account
                                <AiOutlineUserSwitch />
                            </DropdownMenuItem>
                            <DropdownMenuItem className="justify-between cursor-pointer mt-2 p-0">
                                <AuthBtn variant="default" clickHandler={() => signOut()}>
                                    Sign out
                                </AuthBtn>

                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            <nav className={styles.root}>
                {status == "unauthenticated" && (
                    <>
                        <AuthBtn variant="default" clickHandler={() => signIn()}>
                            Sign in
                        </AuthBtn>
                    </>
                )}
            </nav>
        </>
    );
};
export default AuthElement;