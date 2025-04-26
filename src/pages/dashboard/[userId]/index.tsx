import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage, PreviewData } from "next";
import { useSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import dbConnect from "../../../../middleware/db-connect";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NewProjectBtn from "@/components/NewProjectBtn";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const statusColors: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-800",
    COMPLETED: "bg-blue-100 text-blue-800",
    ARCHIVED: "bg-gray-100 text-gray-800",
};
type Project = {
    _id: string
    name: string
    key: string
    description?: string
    status: string
    createdAt: string
    updatedAt: string
    endDate?: string
    owner?: { email: string }
};
const Dashboard: NextPage = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const userId: string | undefined = props.data?.userId;
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const isCurrentUsers =
        userId && session?.user.fdlst_private_userId === userId;
    const {
        // state,
        open,
        // setOpen,
        // openMobile,
        // setOpenMobile,
        // isMobile,
        // toggleSidebar,
    } = useSidebar();
    const [projects, setProjects] = useState<Project[]>([]);
    const getProjects = useCallback(async () => {
        try {
            const QUERY = `
        query GetProjectsByUserID($userId: ID) {
            getProjectsByUserID(userId: $userId) {
                _id
                name
                key
                status
                owner {
                    email
                    name
                    role
                }
                createdAt
                endDate
                updatedAt
            }
        }
        `;
            const USERQUERY = `
        query GetUser($email: String!) {
            getUser(email: $email) {
                _id
                email
                name
                role
            }
        }
        `;
            const email = session?.user?.email;
            console.log(email)
            const user = await fetch("/api/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    query: USERQUERY,
                    variables: {
                        email: email,
                    },
                }),
            });
            const userjson = await user.json();
            if (userjson.errors) {
                throw new Error(userjson.errors[0].message);
            }
            const projectOwner = userjson.data.getUser;
            console.log(projectOwner)
            const response = await fetch("/api/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    query: QUERY,
                    variables: {
                        userId: projectOwner._id,
                    },
                }),
            })
            const json = await response.json();
            if (json.errors) {
                throw new Error(json.errors[0].message);
            }
            // console.log(json)
            setProjects(json.data.getProjectsByUserID)
            return json.data
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    }, [session?.user?.email]);

    useEffect(() => {
        if (status === "authenticated") {
            getProjects();
        }
    }, [status, getProjects]);


    return (
        <div
            className={cn(
                "flex flex-col justify-between items-center gap-2 overflow-y-clip px-2 transition-all duration-300 ease-in-out mt-navbar-offset text-neutral-900",
                open ? "w-screen-minus-sidebar" : "w-screen-minus-sidebar-icons",
                robotoCondensed.className
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between w-full px-4 pt-6">
                <div>
                    <h1 className="text-3xl font-bold">
                        {isCurrentUsers ? `Welcome, ${session?.user?.name || "User"}` : "Dashboard"}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {isCurrentUsers
                            ? "Here’s an overview of your projects and recent activity."
                            : "You are viewing another user's dashboard."}
                    </p>
                </div>
                {isCurrentUsers && (
                    <NewProjectBtn userId={session?.user?.fdlst_private_userId} />
                )}
            </div>

            <Separator className="bg-neutral-400" />

            {/* Recent Projects Section */}
            {isCurrentUsers && (
                <div className="w-full px-4 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Recent Projects</h2>
                        <Button variant="ghost" asChild>
                            <Link href="/manage-projects" className="flex items-center gap-1">
                                View All Projects
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    {/* Projects Content */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Card key={i} className="p-4">
                                    <Skeleton className="h-6 w-3/4 mb-2 rounded" />
                                    <Skeleton className="h-4 w-full mb-4 rounded" />
                                    <div className="flex justify-between">
                                        <Skeleton className="h-4 w-1/4 rounded" />
                                        <Skeleton className="h-4 w-1/4 rounded" />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No recent projects found. Create your first project!
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.slice(0, 3).map((project) => (
                                <Card
                                    key={project._id}
                                    className="hover:shadow-lg transition-shadow group"
                                >
                                    <Link
                                        href={`/dashboard/${session?.user?.fdlst_private_userId}/project/${project._id}`}
                                    >
                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-medium group-hover:underline">
                                                    {project.name}
                                                </h3>
                                                <Badge className={statusColors[project.status]}>
                                                    {project.status}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-4">
                                                {project.description?.substring(0, 50) || "No description"}
                                                {(project.description?.length ?? 0) > 50 && "..."}
                                            </p>
                                            <div className="flex justify-between text-sm text-gray-500">
                                                <div>
                                                    <p className="text-xs">Created</p>
                                                    <p>{format(new Date(project.createdAt), "dd MMM yy")}</p>
                                                </div>
                                                {project.endDate && (
                                                    <div>
                                                        <p className="text-xs">Deadline</p>
                                                        <p>{format(new Date(project.endDate), "dd MMM yy")}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>

    );
}

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

export default Dashboard;