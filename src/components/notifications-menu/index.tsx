import { JSX } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MdNotifications } from "react-icons/md";
import { cn } from "@/lib/utils";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { ImNewTab } from "react-icons/im";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegMessage } from "react-icons/fa6";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
const NotificationsMenu = (): JSX.Element => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MdNotifications size={24} className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn(`rounded-sm w-[550px] p-2 mt-3`, robotoCondensed.className)}>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <div className="flex justify-between items-center">
                            <p className="text-2xl">Notifications</p>
                            <div className="flex justify-center items-center gap-2">
                                <Label htmlFor="show-unread">Only show unread</Label>
                                <Switch id="show-unread" className="data-[state=checked]:bg-emerald-700 data-[state=unchecked]:bg-neutral-300" />
                                <ImNewTab className="cursor-pointer" />
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <BsThreeDotsVertical className="cursor-pointer" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <FaRegMessage />
                                            Give Feedback
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => { e.preventDefault() }} className="bg-accent">
                        <Tabs defaultValue="direct" className="w-full">
                            <TabsList className=" grid w-full grid-cols-2 gap-2 bg-neutral-800 rounded-md py-1 px-2">
                                <TabsTrigger value="direct" className="data-[state=active]:bg-neutral-50 rounded-sm">Direct</TabsTrigger>
                                <TabsTrigger value="watching" className="data-[state=active]:bg-neutral-50 rounded-sm">Watching</TabsTrigger>
                            </TabsList>
                            <TabsContent value="direct">
                                <div className="min-h-[420px]"><p>Direct Notifications go here</p></div>
                            </TabsContent>
                            <TabsContent value="watching">
                                <div className="min-h-[420px]"><p>Notifications tagged for watch.</p></div>
                            </TabsContent>
                        </Tabs>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default NotificationsMenu;