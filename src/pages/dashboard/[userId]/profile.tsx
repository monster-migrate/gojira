import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import dbConnect from "../../../../middleware/db-connect";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MdEdit, MdMail, MdOutlineWorkHistory, MdWork } from "react-icons/md";
import { FaNetworkWired } from "react-icons/fa6";
import { HiMiniBuildingOffice2, HiOutlineIdentification } from "react-icons/hi2";
import { CiLocationArrow1, CiLocationOff, CiLocationOn } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import { BsPlusCircle } from "react-icons/bs";
import { useSidebar } from "@/components/ui/sidebar";

const Profile: NextPage = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const { data: session } = useSession();
    const {
        // state,
        open,
        // setOpen,
        // openMobile,
        // setOpenMobile,
        // isMobile,
        // toggleSidebar,
    } = useSidebar();
    function capitalizeFirstLetter(val: string | null | undefined) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    return (
        <div className={cn(`${open ? "w-screen-minus-sidebar" : "w-screen-minus-sidebar-icons"} flex flex-col justify-center items-start`,
            robotoCondensed.className)}>
            <Image
                src="/assets/default-banner.svg"
                width={636} height={67}
                alt="default banner"
                className="w-full h-auto border-b-4 border-gray-200" />
            <Image
                src={session?.user?.image || "/assets/logo.svg"}
                width={96} height={96}
                alt="user profile picture"
                className="transform -translate-y-20 translate-x-32 left-8 bg-gray-200 rounded-full p-1" />
            <div className="w-full grid grid-cols-[29%_69%] gap-6 px-16 py-2">
                {/* Left Sidebar */}
                <div className="flex flex-col items-center bg-white text-gray-800 shadow-md rounded-lg p-6 border border-gray-200">
                    {/* User Info */}
                    <h1 className="text-2xl font-semibold">{session?.user?.name}</h1>
                    <Button
                        variant="default"
                        className="w-full py-2 mt-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-all">
                        Manage Account
                    </Button>

                    {/* About Section */}
                    <div className="w-full mt-6">
                        <h2 className="text-lg font-semibold text-gray-700">About</h2>
                        <ul className="mt-2 space-y-3">
                            <li className="flex items-center gap-3 text-gray-700">
                                <MdWork className="text-xl text-gray-500" />
                                <p className="w-full p-2 bg-gray-100 rounded-md">{capitalizeFirstLetter(session?.user.role) || "Your Job Profile"}</p>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <FaNetworkWired className="text-xl text-gray-500" />
                                <div className="flex justify-between items-center w-full p-2 bg-gray-100 rounded-md">
                                    <p>Department</p>
                                    <MdEdit size={24} className="bg-gray-200 p-0.5 rounded-sm hover:bg-gray-400 cursor-pointer" />
                                </div>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <HiMiniBuildingOffice2 className="text-xl text-gray-500" />
                                <p className="w-full p-2 bg-gray-100 rounded-md">Organization</p>
                            </li>
                            <li className="flex items-center gap-3 text-gray-700">
                                <CiLocationArrow1 className="text-xl text-gray-500" />
                                <p className="w-full p-2 bg-gray-100 rounded-md">Location</p>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="w-full mt-6">
                        <h2 className="text-lg font-semibold text-gray-700">Contact</h2>
                        <ul className="mt-2 space-y-3">
                            <li className="flex items-center gap-3 text-gray-700">
                                <MdMail className="text-xl text-gray-500" />
                                <p className="w-full p-2 bg-gray-100 rounded-md">{session?.user.email || "Your Email"}</p>
                            </li>
                        </ul>
                    </div>

                    {/* Teams Section */}
                    <div className="w-full mt-6">
                        <h2 className="text-lg font-semibold text-gray-700">Your Teams</h2>
                        <ul className="mt-2 space-y-3">
                            <li className="flex items-center gap-3 text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-all">
                                <BsPlusCircle className="text-xl text-gray-500" />
                                <p>Create a team</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Content */}
                <div className="bg-transparent px-6 flex flex-col justify-start items-center">
                    <div className="bg-gray-50 w-full p-6 rounded-md shadow-md mt-4">
                        <h1 className="text-lg font-bold text-gray-800">Worked On</h1>
                        <p className="text-sm text-gray-500">Projects you have worked on</p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border border-gray-300 text-gray-600 text-lg h-[128px] rounded-md mt-4">
                            <MdOutlineWorkHistory className="text-4xl" />
                            <p className="text-center">There is no work to see here, yet.</p>
                        </div>
                    </div>
                    <div className="bg-gray-50 w-full p-6 rounded-md shadow-md mt-4">
                        <h1 className="text-lg font-bold text-gray-800">Places</h1>
                        <p className="text-sm text-gray-500">Place you have worked in</p>
                        {/* No Work Message */}
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border border-gray-300 text-gray-600 text-lg h-[128px] rounded-md mt-4">
                            <MdOutlineWorkHistory className="text-4xl" />
                            <p className="text-center">There is no work to see here, yet.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
    const { userId } = context.query;
    try {
        await dbConnect();
    } catch (err: unknown) { console.log(err) }
    return {
        props: {
            data: { userId: userId }
        }
    }
}