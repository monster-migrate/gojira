// import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import Image from "next/image";
import Link from "next/link";

import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import { cn } from "@/lib/utils";
const formSchema = z.object({
    role: z.enum(["ADMIN", "MANAGER", "DEVELOPER", "USER", "VIEWER"])
})
export default function NewUserPage() {
    const { data: session } = useSession();
    const router = useRouter();
    // const [role, setRole] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: "USER",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const role = values.role;
        // setRole(role);
        const res = await fetch("/api/set-role", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role, email: session?.user?.email }),
        });

        if (res.ok) router.push(`/dashboard/${session?.user?.fdlst_private_userId}`);
        console.log(values)
    }

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (!role) return alert("Please select a role.");

    //     const res = await fetch("/api/set-role", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ role, email: session?.user?.email }),
    //     });

    //     if (res.ok) router.push(`/dashboard/${session?.user?.fdlst_private_userId}`);
    // };

    return (
        <div className={cn(`flex flex-col items-center justify-center h-screen`,
            robotoCondensed.className
        )}>
            <Card className="w-[350px]">
                <CardHeader className="flex flex-col justify-center items-center text-center">
                    <Image src="/assets/logo.svg" width={72} height={72} alt="logo" className="text-center" />
                    <CardTitle className="text-gray-500">Create your account</CardTitle>
                    <CardDescription className="text-xs text-justify">Before you proceed, we need some more info about you. To learn more about how we use your data, please go through our <Link href="/datapolicy" className="text-blue-500">Data Usage Policy</Link> and if you have any queries, feel free to approach our <Link href="support" className="text-blue-500">support team</Link>.</CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="flex flex-col justify-center items-center w-full gap-4">

                    <div className="grid grid-cols-3 grid-rows-2 justify-center items-center">
                        <div className="h-px w-[96px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        <div className="row-span-2 text-center text-gray-500"><h1>Your Details</h1></div>
                        <div className="h-px w-[132px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        <div className="h-px w-[32px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        <div className="h-px w-[96px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-medium text-gray-500">Email address:</label>
                        <p>{session?.user.email}</p>
                        <label className="block text-sm font-medium text-gray-500">Name:</label>
                        <p>{session?.user.name}</p>
                    </div>
                    <div className="w-full">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-500">Role:</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select a role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Roles</SelectLabel>
                                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                                            <SelectItem value="MANAGER">Manager</SelectItem>
                                                            <SelectItem value="DEVELOPER">Developer</SelectItem>
                                                            <SelectItem value="USER">User</SelectItem>
                                                            <SelectItem value="VIEWER">Viewer</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription>
                                                Please select your company role.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">Create Your Account</Button>
                            </form>
                        </Form>
                    </div>
                </CardContent>
                <Separator />
                <CardContent>
                    <p className="text-xs text-gray-500">By creating an account, I accept the go-jira <Link href="/terms" className="text-blue-500">Cloud Terms of Service</Link> and acknowledge the <Link href="/privacy" className="text-blue-500">Privacy Policy</Link>.</p>
                </CardContent>
            </Card>
        </div>
    );
}
