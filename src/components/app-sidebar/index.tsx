import { Sidebar, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { MdFeedback, MdShelves, MdWorkspaces } from "react-icons/md";
import { PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { role } from "../account-menu";
import { cn } from "@/lib/utils";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { BsApp, BsArrowRight, BsClockFill, BsPlusCircle, BsRocket, BsStack, BsStarFill } from "react-icons/bs";
import { FaPlusCircle } from "react-icons/fa";
import SidebarTriggerContainer from "./sidebar-trigger";
import { useRouter } from "next/router";
export function AppSidebar() {
    const router = useRouter();
    const {
        // state,
        open,
        // setOpen,
        // openMobile,
        // setOpenMobile,
        // isMobile,
        // toggleSidebar,
    } = useSidebar()
    const { data: session } = useSession();
    const handleClick = (href: string) => {
        const userId = session?.user?.fdlst_private_userId;
        if (userId) {
            router.push(href);
        }
    };
    return (
        <Sidebar collapsible="icon" className={cn(robotoCondensed.className, "bg-gray-50 text-gray-800 shadow-md border-r border-gray-200")}>
            {/* Sidebar Header */}
            <SidebarHeader>
                <div className="flex items-center gap-2 h-fit px-3 bg-emerald-500 text-gray-50 rounded-sm">
                    <SidebarTriggerContainer icon={<MdWorkspaces className="mr-5" />} scale="scale-110" />
                    {open && <p className="text-sm font-medium">{role(session?.user?.role || "")} Workspace</p>}
                </div>
            </SidebarHeader>

            {/* Sidebar Group */}
            <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold uppercase text-gray-500 tracking-wide p-2">
                    General
                </SidebarGroupLabel>

                <SidebarGroupContent>
                    <SidebarMenu>
                        {[
                            { icon: <MdShelves />, label: "Overview", tooltip: "Your Dashboard", actionIcon: <PlusCircle />, onclickHref: `/dashboard/${session?.user?.fdlst_private_userId}` },
                            { icon: <BsClockFill />, label: "Recent", tooltip: "Your recent work", actionIcon: <BsArrowRight />, onclickHref: "#" },
                            { icon: <BsStarFill />, label: "Starred", tooltip: "Starred projects", actionIcon: <BsArrowRight />, onclickHref: "#" },
                            { icon: <BsApp />, label: "Apps", tooltip: "Add new apps", actionIcon: <BsPlusCircle />, onclickHref: "#" },
                            { icon: <BsStack />, label: "Plans", tooltip: "Show all plans", actionIcon: <BsArrowRight />, onclickHref: "#" },
                            { icon: <BsRocket />, label: "Projects", tooltip: "Show all projects", actionIcon: <FaPlusCircle />, onclickHref: `/dashboard/${session?.user.fdlst_private_userId}/manageprojects` },
                        ].map((item, index) => (
                            <SidebarMenuItem key={index}>
                                {open ? (
                                    <SidebarMenuButton className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-200 transition" onClick={() => handleClick(item.onclickHref)}>
                                        <div className="flex items-center gap-3">
                                            {item.icon}
                                            <p className="text-sm font-medium">{item.label}</p>
                                        </div>
                                        <TooltipProvider>
                                            <SidebarMenuAction>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>{item.actionIcon}</TooltipTrigger>
                                                    <TooltipContent className="text-xs bg-gray-800 text-white p-1 rounded-md shadow-md">
                                                        {item.tooltip}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </SidebarMenuAction>
                                        </TooltipProvider>
                                    </SidebarMenuButton>
                                ) : (
                                    <div className="w-full flex justify-center py-2">{item.icon}</div>
                                )}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            {/* Sidebar Footer */}
            <SidebarFooter className="mt-auto">
                <Separator />
                {open ? (
                    <div className="flex items-center gap-3 p-3 text-gray-50 bg-emerald-500 rounded-lg hover:bg-emerald-700 cursor-pointer transition">
                        <MdFeedback />
                        <p className="text-sm font-medium">Any feedback or complaints?</p>
                    </div>
                ) : (
                    <div className="w-full flex justify-center py-2">
                        <MdFeedback className="text-gray-600" />
                    </div>
                )}
            </SidebarFooter>
        </Sidebar>

    );
}
