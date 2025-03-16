import { JSX } from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { MdSearch } from "react-icons/md";
import { Input } from "../ui/input";
import { FaPlusCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import AccountMenu from "../account-menu";
import SettingsMenu from "../settings-menu";
import NotificationsMenu from "../notifications-menu";
import HomeIcon from "../home-icon";
import AppsMenu from "../apps-menu";
import { useSidebar } from "../ui/sidebar";
import SidebarTriggerContainer from "../app-sidebar/sidebar-trigger";

const DashboardNavigation = (): JSX.Element => {
    const {
        // state,
        open,
        // setOpen,
        // openMobile,
        // setOpenMobile,
        // isMobile,
        // toggleSidebar,
    } = useSidebar()
    return (
        <div className={cn(`flex justify-between items-center gap-2 ${open ? "w-screen-minus-sidebar" : "w-screen-minus-sidebar-icons "}`,
            `bg-gray-200 h-[48px] overflow-y-clip px-2 transition-all duration-300 ease-in-out`,
            robotoCondensed.className)}>
            <div className="flex justify-center items-center gap-2 p-2 text-emerald-700">
                <SidebarTriggerContainer />
                <AppsMenu />
                <HomeIcon />
            </div>
            <div className="flex justify-center items-center gap-0 w-full">
                <Input type="text" placeholder="Search" className="border border-emerald-700 border-r-transparent w-full max-w-5xl h-[32px] text-neutral-600 rounded-l-sm rounded-r-none" />
                <MdSearch size={28} className="text-emerald-700 border border-emerald-700 border-l-transparent h-[32px] rounded-r-sm -translate-x-1" />
            </div>
            <div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="default" className="bg-emerald-700 flex items-center gap-2 h-[32px] px-3 hover:bg-emerald-800">
                                <FaPlusCircle />
                                <span>Create</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent className={cn(robotoCondensed.className)}>
                            <p>Create New Project</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="flex justify-center items-center gap-2 text-emerald-700 border">
                <NotificationsMenu />
                <SettingsMenu />
                <AccountMenu />
            </div>
        </div>
    )
}

export default DashboardNavigation;