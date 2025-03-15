import { JSX } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { SidebarTrigger } from "../ui/sidebar"
import { cn } from "@/lib/utils"
import { robotoCondensed } from "@/lib/fonts/robotoCondensed"
const SidebarTriggerContainer = (): JSX.Element => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <SidebarTrigger className="scale-150" />
                </TooltipTrigger>
                <TooltipContent className={cn(robotoCondensed.className)}>
                    <p>Toggle Sidebar</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
export default SidebarTriggerContainer