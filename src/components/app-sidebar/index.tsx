import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSubItem, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { MdDashboard, MdFeedback, MdShelves, MdWorkspaces } from "react-icons/md";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { role } from "../account-menu";
import { cn } from "@/lib/utils";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import { Separator } from "../ui/separator";
import { FcFeedback } from "react-icons/fc";
import { FaChevronCircleDown, FaPlus } from "react-icons/fa";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { BsApp, BsArrowRight, BsClockFill, BsPlusCircle, BsRocket, BsStack, BsStarFill } from "react-icons/bs";
export function AppSidebar() {
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar()
    const { data: session, status } = useSession();
    return (
        <Sidebar collapsible="icon" className={robotoCondensed.className}>
            <SidebarHeader>
                <div className={cn(`flex justify-start items-center gap-2`,
                    `bg-neutral-400 p-2 rounded-sm`,
                )}>
                    <MdWorkspaces />
                    {open ?
                        <p className="text-sm">
                            {role(session?.user?.role || "") + " Workspace"}
                        </p> : ""}
                </div>
            </SidebarHeader>
            <SidebarGroup>
                <SidebarGroupLabel>
                    General
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            {open ? <SidebarMenuButton>
                                <div className="flex justify-start items-center gap-2">
                                    <MdShelves />
                                    <p>Your Work</p>
                                </div>
                                <TooltipProvider>
                                    <SidebarMenuAction>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <PlusCircle />
                                            </TooltipTrigger>
                                            <TooltipContent className={cn(robotoCondensed.className)}>
                                                <p className="text-xs bg-gray-700 text-neutral-100 p-1 rounded-sm">expand</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </SidebarMenuAction>
                                </TooltipProvider>
                            </SidebarMenuButton> : <MdShelves className="w-full" />}
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            {open ? <SidebarMenuButton>
                                <div className="flex justify-start items-center gap-2">
                                    <BsClockFill />
                                    <p>Recent</p>
                                </div>
                                <TooltipProvider>
                                    <SidebarMenuAction>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <BsArrowRight />
                                            </TooltipTrigger>
                                            <TooltipContent className={cn(robotoCondensed.className)}>
                                                <p className="text-xs bg-gray-700 text-neutral-100 p-1 rounded-sm">your recent work</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </SidebarMenuAction>
                                </TooltipProvider>
                            </SidebarMenuButton> : <MdShelves className="w-full" />}
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            {open ? <SidebarMenuButton>
                                <div className="flex justify-start items-center gap-2">
                                    <BsStarFill />
                                    <p>Starred</p>
                                </div>
                                <TooltipProvider>
                                    <SidebarMenuAction>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <BsArrowRight />
                                            </TooltipTrigger>
                                            <TooltipContent className={cn(robotoCondensed.className)}>
                                                <p className="text-xs bg-gray-700 text-neutral-100 p-1 rounded-sm">starred projects</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </SidebarMenuAction>
                                </TooltipProvider>
                            </SidebarMenuButton> : <MdShelves className="w-full" />}
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            {open ? <SidebarMenuButton>
                                <div className="flex justify-start items-center gap-2">
                                    <BsApp />
                                    <p>Apps</p>
                                </div>
                                <TooltipProvider>
                                    <SidebarMenuAction>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <BsPlusCircle />
                                            </TooltipTrigger>
                                            <TooltipContent className={cn(robotoCondensed.className)}>
                                                <p className="text-xs bg-gray-700 text-neutral-100 p-1 rounded-sm">add new apps</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </SidebarMenuAction>
                                </TooltipProvider>
                            </SidebarMenuButton> : <MdShelves className="w-full" />}
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            {open ? <SidebarMenuButton>
                                <div className="flex justify-start items-center gap-2">
                                    <BsStack />
                                    <p>Plans</p>
                                </div>
                                <TooltipProvider>
                                    <SidebarMenuAction>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <BsArrowRight />
                                            </TooltipTrigger>
                                            <TooltipContent className={cn(robotoCondensed.className)}>
                                                <p className="text-xs bg-gray-700 text-neutral-100 p-1 rounded-sm">Show all plans</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </SidebarMenuAction>
                                </TooltipProvider>
                            </SidebarMenuButton> : <MdShelves className="w-full" />}
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            {open ? <SidebarMenuButton>
                                <div className="flex justify-start items-center gap-2">
                                    <BsRocket />
                                    <p>Projects</p>
                                </div>
                                <TooltipProvider>
                                    <SidebarMenuAction>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <BsArrowRight />
                                            </TooltipTrigger>
                                            <TooltipContent className={cn(robotoCondensed.className)}>
                                                <p className="text-xs bg-gray-700 text-neutral-100 p-1 rounded-sm">Show all projects</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </SidebarMenuAction>
                                </TooltipProvider>
                            </SidebarMenuButton> : <MdShelves className="w-full" />}
                        </SidebarMenuItem>
                    </SidebarMenu>

                </SidebarGroupContent>
            </SidebarGroup>
            <SidebarFooter>
                <Separator />
                {open ?
                    <div className="bg-neutral-400 rounded-sm p-2 flex justify-start items-center gap-2">
                        <MdFeedback />
                        <p className="text-sm">Any feedbacks or complaints?</p>
                    </div> : <MdFeedback className="w-full" />}

            </SidebarFooter>
        </Sidebar>
    );
}
