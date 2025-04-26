import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import { useSidebar } from "@/components/ui/sidebar";
import { useCallback, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MdDelete, MdEditNote } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import Link from "next/link";

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
    owner?: { name: string; email: string; role: string; }
}

const ManageProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const { open } = useSidebar();
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

    if (loading) {
        return (
            <div className={cn(
                `${open ? "w-screen-minus-sidebar" : "w-screen-minus-sidebar-icons"} p-8`,
                `mt-navbar-offset`,
                robotoCondensed.className
            )}>
                <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={cn(
            `${open ? "w-screen-minus-sidebar" : "w-screen-minus-sidebar-icons"} px-16`,
            `mt-navbar-offset`,
            robotoCondensed.className
        )}>
            <div className="bg-white rounded-lg shadow-sm border text-neutral-900">
                <Table className=" rounded-t-sm">
                    <TableCaption className="text-gray-500 mt-4">
                        {projects.length === 0 ? "No projects found. Create your first project!" : "List of your active projects"}
                    </TableCaption>

                    <TableHeader className="bg-emerald-700">
                        <TableRow>
                            {[
                                "Project Name", "Key", "Status", "Owner",
                                "Created", "Deadline", "Last Updated", "Actions"
                            ].map((header) => (
                                <TableHead
                                    key={header}
                                    className="text-neutral-50 font-semibold py-3 text-sm"
                                >
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {projects.map((project) => {
                            const isDeadlinePassed = project.endDate && new Date(project.endDate) < new Date();

                            return (
                                <TableRow
                                    key={project.key}
                                    className="hover:bg-gray-50 transition-colors group"
                                >
                                    <TableCell className="font-medium">
                                        <Link href={`/dashboard/${session?.user?.fdlst_private_userId}/project/${project._id}`}
                                            className="text-blue-500 border-b-2"
                                        >
                                            {project.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="font-mono text-gray-600">{project.key}</TableCell>
                                    <TableCell>
                                        <Badge className={statusColors[project.status]}>
                                            {project.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            {project.owner?.name && (
                                                <p className="font-medium">{project.owner.name}</p>
                                            )}
                                            {project.owner?.email && (
                                                <p className="text-xs text-gray-500">{project.owner.email}</p>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(project.createdAt), "dd MMM yyyy")}
                                    </TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "whitespace-nowrap",
                                            isDeadlinePassed ? "text-red-600" : "text-gray-700"
                                        )}>
                                            {project.endDate
                                                ? format(new Date(project.endDate), "dd MMM yyyy")
                                                : "-"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(project.updatedAt), "dd MMM yyyy")}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MdEditNote className="h-4 w-4 text-gray-600" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MdDelete className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                {projects.length === 0 && (
                    <div className="p-8 text-center">
                        <div className="mb-4 text-gray-400">No projects found</div>
                        <Button variant="outline">Create New Project</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProjects;