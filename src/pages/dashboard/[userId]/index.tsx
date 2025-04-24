import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage, PreviewData } from "next";
import { useSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import dbConnect from "../../../../middleware/db-connect";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { robotoCondensed } from "@/lib/fonts/robotoCondensed";
import { Card, CardHeader } from "@/components/ui/card";
// import { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { Button } from "@/components/ui/button";

const Dashboard: NextPage = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const userId: string | undefined = props.data?.userId;
    const { data: session } = useSession();
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
    
    // type Project = {
    //     id: string;
    //     name: string;
    //     // any other fields...
    // };
    
    // const [projects, setProjects] = useState<Project[]>([]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     console.log("triggerring useEffect");
    //     fetchProjects({ first: 10 })
    //         .then(setProjects)
    //         .catch(console.error)
    //         .finally(() => setLoading(false));
    // }, []);
    // async function fetchProjects({ first = 10, after = null } = {}) {
    //     const PROJECTS_QUERY = `
    //         query Projects($first: Int, $after: String) {
    //             projects(first: $first, after: $after) {
    //                 _id
    //                 name
    //             }
    //         }
    //     `;
    //     const response = await fetch("/api/graphql", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             // Add Authorization header if needed
    //         },
    //         body: JSON.stringify({
    //             query: PROJECTS_QUERY,
    //             variables: { first, after },
    //         }),
    //     });

    //     const json = await response.json();
    //     console.log(json.data.projects)
    //     if (json.errors) {
    //         throw new Error(json.errors[0].message);
    //     }
    //     return json.data.projects;
    // }
    const handleCreateProject = async () => {
        const CREATE_PROJECT_MUTATION = `
            mutation CreateProject($input: CreateProjectInput!) {
                createProject(input: $input) {
                name
                }
            }
        `;
        const response = await fetch("/api/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                query: CREATE_PROJECT_MUTATION,
                variables: {
                    input: {
                        name: "TEST PROJECT 1",
                        key: "APP",
                        description: "Created from the UI on April 23, 2025",
                    },
                },
            }),
        })
        const json = await response.json();
        if (json.errors) {
            throw new Error(json.errors[0].message);
        }
        console.log(json.name)
        return json.name
    }
    return (
        <div className={cn(`flex justify-between items-center gap-2 ${open ? "w-screen-minus-sidebar" : "w-screen-minus-sidebar-icons"}`,
            `overflow-y-clip px-2 transition-all duration-300 ease-in-out`,
            `mt-navbar-offset text-neutral-900`,
            robotoCondensed.className)}>
            <Button onClick={handleCreateProject}><BsPlusCircle /></Button>
            {isCurrentUsers &&
                <div className="w-full px-16">
                    <p className="text-3xl font-bold">Welcome, {session?.user?.name}</p>
                    <Separator className="bg-neutral-400" />
                    <div>
                        <Card className="w-[350px]">
                            <CardHeader>
                                
                            </CardHeader>
                        </Card>
                    </div>
                </div>}

            {!isCurrentUsers && <p>Not current user</p>}
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