import { JSX } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";

const HomeIcon = (): JSX.Element => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Link href="/"><Image src="/assets/cat.svg" width={56} height={56} alt="logo" /></Link>
                </TooltipTrigger>
                <TooltipContent className={cn(robotoCondensed.className)}>
                    <p>Home</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default HomeIcon;