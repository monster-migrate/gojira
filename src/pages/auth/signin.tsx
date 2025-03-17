import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next"
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { robotoCondensed } from "@/lib/fonts/robotoCondensed"
import { cn } from "@/lib/utils"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { JSX } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const providerIcons: { [key: string]: JSX.Element } = {
  google: <FcGoogle className="mr-2" />,
  github: <FaGithub className="mr-2" />,
  // Add additional providers here as needed.
};
export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={cn(`flex justify-center items-center w-screen mt-24 mb-24`, robotoCondensed.className)}>
      <Card className="w-[350px]">
        <CardHeader className="flex flex-col justify-center items-center text-center">
          <Image src="/assets/logo.svg" width={72} height={72} alt="logo" className="text-center" />
          <CardTitle className="text-gray-500">Let&apos;s get you in.</CardTitle>
          <CardDescription className="text-xs">Sign in using your preferred account provider for added security.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center w-full gap-4">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button onClick={() => signIn(provider.id)} className="w-[300px]">
                {/* Use the icon mapping; fallback to null if not found */}
                {providerIcons[provider.id.toLowerCase()] || null}
                Sign in with {provider.name}
              </Button>
            </div>
          ))}
          <div className="grid grid-cols-3 grid-rows-2 justify-center items-center">
            <div className="h-px w-[96px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="row-span-2 text-center text-gray-500">OR<br /><span className="text-[8px]">use your company email</span></div>
            <div className="h-px w-[132px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="h-px w-[32px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="h-px w-[96px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
          <div className=" flex flex-col justify-center items-center gap-4">
            <Input type="email" placeholder="Enter your email" />
            <Button variant="default" className="w-[300px]">Continue</Button>
          </div>
          <Separator />
          <div className="flex justify-center w-full items-center gap-4 text-xs">
            <Link href="/forgotpassword" className="text-blue-500">Can&apos;t log in?</Link>
            <p className="text-3xl">·</p>
            <Link href="/signup" className="text-blue-500">Create an account</Link>
          </div>
          <div className="flex justify-center w-full text-xs items-center gap-4">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/datapolocy">Data Policy</Link>
          </div>
          <p className="text-[8px] text-justify">This site is protected by
            the Google Privacy Policy and by creating an account
            you agree with the terms of service and data usage policy. Please make sure
            you have read and understood the terms before proceeding.</p>
        </CardContent>
      </Card>
    </div>

  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions)

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } }
  }

  const providers = await getProviders()
  console.log("Fetched providers:", providers);

  return {
    props: { providers: providers ?? [] },
  }
}