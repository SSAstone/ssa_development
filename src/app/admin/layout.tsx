'use client'
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import {
    AudioWaveform,
    Bot,
    Command,
    GalleryVerticalEnd,
    SquareTerminal,
    TextAlignCenter,
    Bell,
    Settings,
    Activity,
    Image,
    Calendar,
    LayoutDashboard,
} from "lucide-react"
import { usePathname } from "next/navigation"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ]
}

export interface MenuItemsProps {
    label: string
    href: string
    icon?: any
    disabled?: boolean
}

export interface MenuProps {
    title?: string
    label?: string
    icon?: any
    href?: string
    items?: MenuItemsProps[]
    disabled?: boolean,
    collapsed?: boolean
}

const menu: MenuProps[] = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard/admin",
    },
    {
        label: "Projects",
        icon: Bot,
        href: "/admin/projects",
    },
    {
        label: "Products",
        icon: Bot,
        href: "/admin/product",
    },
    {
        label: "Services",
        icon: TextAlignCenter,
        href: "/admin/services",
    },
    {
        label: "Notices",
        icon: Bell,
        href: "/dashboard/admin/notices",
    },
    {
        label: "Activities",
        icon: Activity,
        href: "/dashboard/admin/activities",
    },
    {
        label: "Gallery",
        icon: Image,
        href: "/dashboard/admin/gallery",
    },
    {
        label: "Site Settings",
        icon: Settings,
        href: "/dashboard/admin/site-settings",
    },
]

const Layout = ({ children }: { children: React.ReactNode }) => {
    const path = usePathname()
    const activeNavItem: MenuProps | undefined = menu.find(navItem =>
        navItem?.href === path ? navItem : navItem?.items?.some(item => item.href === path)
    )
    return (
        <SidebarProvider>
            <AppSidebar menu={menu} data={data} />
            <SidebarInset>
                <div className="fixed top-0 w-full z-50 bg-background">
                    <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4 w-full">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb className="flex-1">
                                <BreadcrumbList>
                                    {activeNavItem && (
                                        <>
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href={activeNavItem.href}>
                                                    {activeNavItem.label}
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            {activeNavItem?.href !== path && <>
                                                <BreadcrumbSeparator />
                                                <BreadcrumbItem>
                                                    <BreadcrumbPage>
                                                        {activeNavItem?.href === path ? activeNavItem.label : activeNavItem?.items?.find(item => item.href === path)?.label}
                                                    </BreadcrumbPage>
                                                </BreadcrumbItem>
                                            </>}
                                        </>
                                    )}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </div>
                    <Separator orientation="horizontal" className="w-full" />
                </div>
                <div className="pt-20 flex flex-1 flex-col gap-4 p-4 bg-muted">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout