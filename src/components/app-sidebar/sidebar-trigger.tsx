import { JSX } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { SidebarTrigger } from "../ui/sidebar"
import { cn } from "@/lib/utils"
import { robotoCondensed } from "@/lib/fonts/robotoCondensed"

interface SidebarTriggerContainerProps {
    icon: React.ReactNode;
    scale: string;
  }
const SidebarTriggerContainer = ({icon, scale}: SidebarTriggerContainerProps): JSX.Element => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <SidebarTrigger className={cn(`scale-150 cursor-pointer ${scale} `)} icon={icon}/>
                </TooltipTrigger>
                <TooltipContent className={cn(robotoCondensed.className)}>
                    <p>Toggle Sidebar</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
export default SidebarTriggerContainer