import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage, PreviewData } from "next";
import { useSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import dbConnect from "../../../middleware/db-connect";

const Dashboard: NextPage = (
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    const userId: string | undefined = props.data?.userId;
    const { data: session } = useSession();
    let isCurrentUsers =
        userId && session?.user.fdlst_private_userId === userId;
    return (
        <div>
            {isCurrentUsers && <p>Current user, welcome {session?.user?.name}</p>}
            {!isCurrentUsers && <p>Not current user</p>}
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
    let { userId } = context.query;
    try {
        await dbConnect();
    } catch (err: any) { console.log(err) }
    return {
        props: {
            data: { userId: userId }
        }
    }
}

export default Dashboard;