import { JSX } from "react";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
const Footer = (): JSX.Element => {
    return (
        <div className={cn(`w-screen`,
            `flex flex-col justify-start items-start p-2 sm:px-16`,
            robotoCondensed.className)}>
            <div className="bg-gray-800 sm:flex sm:justify-evenly sm:gap-4 py-2 px-12">
                <div className="sm:w-1/2">
                    <div className="sm:flex sm:gap-12">
                        <div>
                            <div className="flex justify-center items-center gap-4">
                                <Image src="/assets/logo.svg" width={50} height={50} alt="cat" />
                                <h1 className="text-3xl">GoJira: Streamline Your Project Management</h1>
                            </div>
                            <br />
                            <p className="text-sm text-gray-400 text-justify">A powerful yet intuitive platform designed to help teams <span className="text-gray-200">plan</span>,
                                <span className="text-gray-200"> track</span>, and <span className="text-gray-200">manage</span>{" "}
                                projects with ease. GoJira offers flexible tools to organize tasks, collaborate in real-time, and deliver
                                results efficiently.
                            </p>

                            <p className="text-justify">
                                With features like customizable boards, issue tracking and insightful reporting<br />
                                GoJira empowers teams to stay aligned and productive.
                                Its clean interface and user-friendly design ensure a seamless experience, making
                                project management simple yet effective.
                            </p>
                        </div>
                    </div>
                    <hr />
                    <br />
                </div>
                <div className="sm:w-1/2">
                    <div className="text-xl">
                        <h1 >Looking for something specific? Try searching.</h1>
                    </div>
                    <div className="flex">
                        <Input placeholder="Search" className="rounded-l-md rounded-r-none" />
                        <CiSearch className="border rounded-r-md" size={36} />
                    </div>
                    <br/>
                    <div className="grid grid-cols-1 text-right lg:flex justify-start items-center gap-1 w-full">
                        <h1 className="hidden lg:block underline">Company:</h1>
                        <Link href="/about" className="text-gray-500 hover:text-gray-300">about us</Link>
                        <p className="text-3xl hidden lg:block ">·</p>
                        <Link href="/careers" className="text-gray-500 hover:text-gray-300">careers</Link>
                        <p className="text-3xl hidden lg:block ">·</p>
                        <Link href="/contact" className="text-gray-500 hover:text-gray-300">contact us</Link>
                    </div>
                    <div className="grid grid-cols-1 text-right lg:flex justify-start items-center gap-1 w-full">
                        <h1 className="underline hidden lg:block ">Resources:</h1>
                        <Link href="/about" className="text-gray-500 hover:text-gray-300">features</Link>
                        <p className="text-3xl hidden lg:block ">·</p>
                        <Link href="/careers" className="text-gray-500 hover:text-gray-300">pricing & subsciption</Link>
                        <p className="text-3xl hidden lg:block ">·</p>
                        <Link href="/contact" className="text-gray-500 hover:text-gray-300">enterprise edition</Link>
                    </div>
                    <div className="grid grid-cols-1 text-right lg:flex justify-start items-center gap-1 w-full">
                        <h1 className="underline hidden lg:block ">Product:</h1>
                        <Link href="/about" className="text-gray-500 hover:text-gray-300">product guide</Link>
                        <p className="text-3xl hidden lg:block ">·</p>
                        <Link href="/careers" className="text-gray-500 hover:text-gray-300">ready-made templates</Link>
                        <p className="text-3xl hidden lg:block ">·</p>
                        <Link href="/contact" className="text-gray-500 hover:text-gray-300">documentation</Link>
                        <p className="text-3xl hidden lg:block ">·</p>
                        <Link href="/contact" className="text-gray-500 hover:text-gray-300">community</Link>
                    </div>
                </div>
            </div>
            <div className="bg-emerald-900 w-full rounded-b-md px-4 py-2">
                <p className="text-sm text-gray-400 sm:text-center">Copyright © 2025 go-jira. All rights reserved.</p>
                <ul className="text-xs text-gray-300 sm:flex sm:gap-12 sm:justify-center">
                    <li>Privacy Policy</li>
                    <li>Terms and Conditions</li>
                    <li>Data Usage Policy</li>
                </ul>
            </div>
        </div >
    )
}
export default Footer;