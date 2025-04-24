// import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData } from "next";
import { NextPage } from "next";
// import { ParsedUrlQuery } from "querystring";
// import dbConnect from "../../../../middleware/db-connect";
import { useSession } from "next-auth/react";
import { MdDelete, MdEditNote } from "react-icons/md";
import { cn } from "@/lib/utils";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import { useSidebar } from "@/components/ui/sidebar";
import { useCallback, useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ManageProjects: NextPage = (
    // props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const [projects, setProjects] = useState([]);
    const { data: session, status } = useSession();
    const {
        // state,
        open,
        // setOpen,
        // openMobile,
        // setOpenMobile,
        // isMobile,
        // toggleSidebar,
    } = useSidebar();

    const getProjects = useCallback(async () => {
        const QUERY = `
        query GetProjectsByUserID($userId: ID) {
            getProjectsByUserID(userId: $userId) {
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
    }, [session?.user?.email]);
    useEffect(() => {
        if (status === "authenticated") {
            getProjects();
        }
    }, [status, getProjects])
    return (
        <div className={cn(`${open ? "w-screen-minus-sidebar" : "w-screen-minus-sidebar-icons"} flex flex-col justify-center items-start`,
            `mt-navbar-offset px-16`,
            robotoCondensed.className)}>
            <Table>
                <TableCaption>A list of your projects</TableCaption>
                <TableHeader className="bg-emerald-700">
                    <TableRow>
                        <TableHead className="text-neutral-50 text-center text-lg font-semibold uppercase px-2 py-3">Name</TableHead>
                        <TableHead className="text-neutral-50 text-center text-lg font-semibold uppercase px-2 py-3">Key</TableHead>
                        <TableHead className="text-neutral-50 text-center text-lg font-semibold uppercase px-2 py-3">Status</TableHead>
                        <TableHead className="text-neutral-50 text-center text-lg font-semibold uppercase px-2 py-3">Owner</TableHead>
                        <TableHead className="text-neutral-50 text-center text-lg font-semibold uppercase px-2 py-3">Created</TableHead>
                        <TableHead className="text-neutral-50 text-center text-lg font-semibold uppercase px-2 py-3">Deadline</TableHead>
                        <TableHead className="text-neutral-50 text-center text-lg font-semibold uppercase px-2 py-3">Last Updated</TableHead>
                        <TableHead className="text-neutral-50 text-center text-lg font-semibold uppercase px-2 py-3">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.values(projects).map((project:
                        {
                            name: string, key: string, status: string,
                            owner: { name: string, email: string, role: string }
                            createdAt: string, endDate: string, updatedAt: string
                        }) =>
                        <TableRow key={project.key}
                            className="text-center text-neutral-900 text-sm font-medium hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200"
                        >
                            <TableCell>
                                {project.name}
                            </TableCell>
                            <TableCell>
                                {project.key}
                            </TableCell>
                            <TableCell>
                                {project.status}
                            </TableCell>
                            <TableCell className="text-left bg-neutral-100">
                                <span>{project.owner.name}</span><br />
                                <span className="text-xs">{project.owner.email}</span><br />
                                <span className="text-xs">{project.owner.role}</span>
                            </TableCell>
                            <TableCell>
                                {new Date(project.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Deadline Not set"}
                            </TableCell>
                            <TableCell>
                                {new Date(project.updatedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center items-center">
                                    <MdEditNote size={24} className="hover:text-teal-500 cursor-pointer" />
                                    <span>|</span>
                                    <MdDelete size={24} className="hover:text-rose-500 cursor-pointer" />
                                </div>
                            </TableCell>
                        </TableRow>)}
                    <TableRow></TableRow>
                </TableBody>
            </Table>
        </div>
    )
}
export default ManageProjects;

/*
 * Using server side props has better TTI
 */
// export const getServerSideProps: GetServerSideProps = async (
//     context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
// ) => {
//     const { userId } = context.query;
//     try {
//         await dbConnect();
//     } catch (err: unknown) { console.log(err) }
//     return {
//         props: {
//             data: { userId: userId }
//         }
//     }
// }