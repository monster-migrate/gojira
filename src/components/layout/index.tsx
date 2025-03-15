import { JSX } from "react";
import Navigation from "../nav";
import Footer from "../footer";
import { usePathname } from "next/navigation";
import DashboardNavigation from "../nav/dashboardnav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../app-sidebar";

interface PropsInterface {
    children: React.ReactNode;
}

const Layout = (props: PropsInterface): JSX.Element => {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/dashboard");

    return (
        <SidebarProvider defaultOpen={false}>
            <div className="flex">
                {/* Show sidebar only for dashboard routes */}
                {isDashboard && <AppSidebar />}

                <div className="flex-1">
                    {isDashboard ? <DashboardNavigation /> : <Navigation />}
                    <main className="layout-grid">
                        {props.children}
                    </main>
                    <Footer />
                </div>
            </div>
        </SidebarProvider>
    );
};

export default Layout;
