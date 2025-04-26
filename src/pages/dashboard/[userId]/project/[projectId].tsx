import { Types } from "mongoose"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { FaUserCircle } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

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
}

interface ProjectPageProps {
    projectId: string
}
const statusColors: Record<string, string> = {
    ACTIVE: "bg-green-200 text-green-800",
    COMPLETED: "bg-blue-200 text-blue-800",
    ARCHIVED: "bg-gray-200 text-gray-800",
};
const ProjectPage = ({ projectId }: ProjectPageProps) => {
    const [project, setProject] = useState<Project | null>(null)
    const [notAllowed, setNotAllowed] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch("/api/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query: `
                        query GetProjectById($id: ID!) {
                            getProjectById(projectId: $id) {
                                _id
                                name
                                key
                                description
                                status
                                createdAt
                                updatedAt
                                endDate
                                owner {
                                    email
                                }
                            }
                        }
                        `,
                        variables: { id: new Types.ObjectId(projectId) }
                    })
                })

                const { data, errors } = await response.json()
                const fetched = data?.getProjectById

                if (errors || !fetched) {
                    setProject(null)
                } else {
                    // Optional: Check if the user has access
                    const session = await fetch("/api/auth/session").then((res) => res.json())
                    if (fetched.owner?.email !== session?.user?.email) {
                        setNotAllowed(true)
                    } else {
                        setProject(fetched)
                    }
                }
            } catch (error) {
                console.error("Client fetch error:", error)
                setProject(null)
            } finally {
                setLoading(false)
            }
        }

        fetchProject()
    }, [projectId])

    if (loading) return (
        <div className="max-w-3xl mx-auto mt-navbar-offset px-4 py-10 text-neutral-900">
            <Card className="shadow-lg">
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                        <Skeleton className="h-8 w-48 mb-2 rounded" />
                        <div className="flex items-center gap-2 mt-2">
                            <Skeleton className="h-5 w-20 rounded" />
                            <Skeleton className="h-4 w-28 rounded" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-32 rounded" />
                    </div>
                </CardHeader>
                <Separator />
                <CardContent className="py-6">
                    <div className="mb-6">
                        <Skeleton className="h-5 w-32 mb-1 rounded" />
                        <Skeleton className="h-4 w-full mb-2 rounded" />
                        <Skeleton className="h-4 w-2/3 rounded" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <Skeleton className="h-4 w-24 mb-1 rounded" />
                            <Skeleton className="h-4 w-36 rounded" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-24 mb-1 rounded" />
                            <Skeleton className="h-4 w-36 rounded" />
                        </div>
                        <div>
                            <Skeleton className="h-4 w-24 mb-1 rounded" />
                            <Skeleton className="h-4 w-36 rounded" />
                        </div>
                    </div>
                    <Separator />
                    <div className="flex gap-4 mt-6">
                        <Skeleton className="h-10 w-28 rounded" />
                        <Skeleton className="h-10 w-32 rounded" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
    if (notAllowed)
        return (
            <div className="max-w-xl mx-auto mt-24 p-8 rounded shadow bg-white">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
                <p>You do not have permission to view this project.</p>
            </div>);
    if (!project) return (
        <div className="max-w-xl mx-auto mt-24 p-8 rounded shadow bg-white">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Project Not Found</h2>
            <p>The project you are looking for does not exist.</p>
        </div>);

    return (
        <div className="max-w-3xl mx-auto mt-navbar-offset px-4 py-10 text-neutral-900">
            <Card className="shadow-lg">
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                        <h1 className="text-3xl font-bold">{project.name}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge className={statusColors[project.status] || "bg-gray-200 text-gray-800"}>
                                {project.status}
                            </Badge>
                            <span className="text-xs text-gray-500">
                                Project Key: <span className="font-mono">{project.key}</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaUserCircle className="text-2xl text-gray-500" />
                        <span className="text-sm text-gray-700">{project.owner?.email || "Unknown Owner"}</span>
                    </div>
                </CardHeader>
                <Separator />
                <CardContent className="py-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold mb-1">Description</h2>
                        <p className="text-gray-700">{project.description || "No description provided."}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-600">Created At</h3>
                            <p className="text-gray-800">{format(new Date(project.createdAt), "PPPpp")}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-600">Last Updated</h3>
                            <p className="text-gray-800">{format(new Date(project.updatedAt), "PPPpp")}</p>
                        </div>
                        {project.endDate && (
                            <div>
                                <h3 className="text-sm font-semibold text-gray-600">End Date</h3>
                                <p className="text-gray-800">{format(new Date(project.endDate), "PPPpp")}</p>
                            </div>
                        )}
                    </div>
                    <Separator />
                    <div className="flex gap-4 mt-6">
                        <Button variant="outline" className="flex items-center gap-1">
                            <MdEdit className="text-lg" />
                            Edit Project
                        </Button>
                        <Button variant="destructive" className="flex items-center gap-1">
                            <MdDelete className="text-lg" />
                            Delete Project
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Example: Add more sections for sprints, issues, team, etc. */}
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-2">Project Overview</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Track tasks, sprints, and progress in real-time</li>
                    <li>Collaborate with your team and manage permissions</li>
                    <li>View reports and analytics for project performance</li>
                </ul>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<ProjectPageProps> = async (context) => {
    const session = await getSession(context)

    if (!session?.user) {
        return {
            redirect: {
                destination: "/api/auth/signin",
                permanent: false
            }
        }
    }

    const { projectId } = context.params as { projectId: string }

    return {
        props: {
            projectId
        }
    }
}

export default ProjectPage
