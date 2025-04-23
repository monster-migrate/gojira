import React, { JSX } from "react";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useSidebar } from "../ui/sidebar";
const Footer = (): JSX.Element => {
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
        <div
            className={cn(
                `${open ? "w-screen-minus-sidebar" : "w-screen-minus-sidebar-icons"}`,
                "flex flex-col justify-start items-start p-4 sm:px-16",
                robotoCondensed.className
            )}
        >
            {/* Hero Section */}
            <div className="bg-gray-800 sm:flex sm:justify-between sm:gap-8 py-6 px-8 rounded-t-md">
                {/* Left Side */}
                <div className="sm:w-1/2 space-y-4">
                    <div className="flex items-center gap-4">
                        <Image src="/assets/logo.svg" width={50} height={50} alt="GoJira Logo" />
                        <h1 className="text-3xl font-semibold text-white">GoJira: Streamline Your Project Management</h1>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        A powerful yet intuitive platform designed to help teams{" "}
                        <span className="text-gray-200 font-medium">plan</span>,
                        <span className="text-gray-200 font-medium"> track</span>, and{" "}
                        <span className="text-gray-200 font-medium">manage</span> projects efficiently. GoJira offers flexible tools to organize tasks,
                        collaborate in real-time, and deliver results seamlessly.
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        With features like customizable boards, issue tracking, and insightful reporting, GoJira empowers teams to stay aligned
                        and productive. Its **clean interface** and user-friendly design ensure a **seamless experience**, making project management
                        simple yet effective.
                    </p>
                </div>

                {/* Right Side */}
                <div className="sm:w-1/2 space-y-4">
                    <h2 className="text-xl font-medium text-white">Looking for something specific?</h2>
                    <div className="flex">
                        <Input placeholder="Search" className="rounded-l-md rounded-r-none" />
                        <CiSearch className="border rounded-r-md" size={36} />
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-2">
                        {[
                            { title: "Company", links: ["About Us", "Careers", "Contact Us"], urls: ["/about", "/careers", "/contact"] },
                            { title: "Resources", links: ["Features", "Pricing & Subscription", "Enterprise Edition"], urls: ["/features", "/pricing", "/enterprise"] },
                            { title: "Product", links: ["Product Guide", "Ready-Made Templates", "Documentation", "Community"], urls: ["/guide", "/templates", "/docs", "/community"] },
                        ].map((section, idx) => (
                            <div key={idx} className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                                <h3 className="font-medium text-gray-300 underline">{section.title}:</h3>
                                {section.links.map((link, linkIdx) => (
                                    <React.Fragment key={linkIdx}>
                                        <Link href={section.urls[linkIdx]} className="hover:text-gray-200 transition">
                                            {link}
                                        </Link>
                                        {linkIdx < section.links.length - 1 && <span className="text-gray-500">·</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-emerald-900 w-full rounded-b-md px-6 py-3">
                <p className="text-sm text-gray-300 text-center">Copyright © 2025 GoJira. All rights reserved.</p>
                <ul className="flex justify-center items-center gap-6 text-xs text-gray-300 mt-2">
                    <li className="hover:text-gray-200 cursor-pointer transition">Privacy Policy</li>
                    <li className="hover:text-gray-200 cursor-pointer transition">Terms & Conditions</li>
                    <li className="hover:text-gray-200 cursor-pointer transition">Data Usage Policy</li>
                </ul>
            </div>
        </div>

    )
}
export default Footer;