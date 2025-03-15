import { JSX } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import { MdApps } from "react-icons/md";
const AppsMenu = (): JSX.Element => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <MdApps size={32} />
                </TooltipTrigger>
                <TooltipContent className={cn(robotoCondensed.className)}>
                    <p>Apps</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
export default AppsMenu