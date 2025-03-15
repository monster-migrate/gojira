import { JSX } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MdNotifications, MdSettings } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoIosApps, IoIosDesktop } from "react-icons/io";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRocket, FaUserPen } from "react-icons/fa6";
import { GoIssueTrackedBy } from "react-icons/go";
import { CiCreditCard1 } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
const SettingsMenu = (): JSX.Element => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <MdSettings size={32} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn(`rounded-sm w-[384px] p-2 mt-2`, robotoCondensed.className)}>
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-bold">Personal Preferences</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <div className="flex justify-center items-center gap-2">
                            <FaUserCircle size={16} />
                            <div>
                                <p className="text-sm">General Settings</p>
                                <p className="text-xs text-gray-500">Manage language, time-zone, and other personal preferences</p>
                            </div>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <div className="flex justify-center items-center gap-2">
                            <MdNotifications size={16} />
                            <div>
                                <p className="text-sm">Notification Settings</p>
                                <p className="text-xs text-gray-500">Manage email and in-product notifications from go-jira</p>
                            </div>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-bold">Administrator Settings</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <div className="flex justify-center items-center gap-2">
                            <IoIosDesktop size={16} />
                            <div>
                                <p className="text-sm">System Settings</p>
                                <p className="text-xs text-gray-500">
                                    Manage general configurations, securitym automation, user-interface and more
                                </p>
                            </div>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <div className="flex justify-center items-center gap-2">
                            <AiOutlineProduct size={16} />
                            <div>
                                <p className="text-sm">Products</p>
                                <p className="text-xs text-gray-500">
                                    Manage product access, settings, and integrations
                                </p>
                            </div>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <div className="flex justify-center items-center gap-2">
                            <FaRocket size={16} />
                            <div>
                                <p className="text-sm">Projects</p>
                                <p className="text-xs text-gray-500">
                                    Manage project access, settings, categories and more
                                </p>
                            </div>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <div className="flex justify-center items-center gap-2">
                            <GoIssueTrackedBy size={16} />
                            <div>
                                <p className="text-sm">Issues</p>
                                <p className="text-xs text-gray-500">
                                    Configure issue types, workflows, screen, fields and more
                                </p>
                            </div>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <div className="flex justify-center items-center gap-2">
                            <IoIosApps size={16} />
                            <div>
                                <p className="text-sm">Apps</p>
                                <p className="text-xs text-gray-500">
                                    Add and manage integrations with marketplace apps and third party providers
                                </p>
                            </div>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-bold">Project Owner Settings</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <div className="flex justify-center items-center gap-2">
                            <FaUserPen size={16} />
                            <div>
                                <p className="text-sm">User Management</p>
                                <p className="text-xs text-gray-500">
                                    Manage user access, roles,permissions and access requests
                                </p>
                            </div>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <div className="flex justify-center items-center gap-2">
                            <CiCreditCard1 size={16} />
                            <div>
                                <p className="text-sm">Payments and Invoices</p>
                                <p className="text-xs text-gray-500">
                                    Manage payments, invoices, estimates and more
                                </p>
                            </div>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default SettingsMenu