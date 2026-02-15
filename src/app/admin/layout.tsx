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
import { Button } from "@/components/ui/button"

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
        name: "@future admin",
        email: "admin@atfuture.com",
        avatar: "/avatars/admin.jpg",
    },
    teams: [
        {
            name: "@future IT",
            logo: GalleryVerticalEnd,
            plan: "Pro Enterprise",
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
        href: "/admin",
    },
    // {
    //     label: "Projects",
    //     icon: Bot,
    //     href: "/admin/projects",
    // },
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
    // {
    //     label: "Notices",
    //     icon: Bell,
    //     href: "/dashboard/admin/notices",
    // },
    // {
    //     label: "Activities",
    //     icon: Activity,
    //     href: "/dashboard/admin/activities",
    // },
    // {
    //     label: "Gallery",
    //     icon: Image,
    //     href: "/dashboard/admin/gallery",
    // },
    // {
    //     label: "Site Settings",
    //     icon: Settings,
    //     href: "/dashboard/admin/site-settings",
    // },
]

const Layout = ({ children }: { children: React.ReactNode }) => {
    const path = usePathname()
    const activeNavItem: MenuProps | undefined = menu.find(navItem =>
        navItem?.href === path ? navItem : navItem?.items?.some(item => item.href === path)
    )
    return (
        <SidebarProvider>
            <AppSidebar menu={menu} data={data} />
            <SidebarInset className="flex flex-col min-h-screen">
                <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-200">
                    <div className="flex h-16 items-center gap-4 px-6 shrink-0">
                        <div className="flex items-center gap-4 w-full">
                            <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
                            <Separator orientation="vertical" className="h-6 w-px bg-border/60" />
                            <Breadcrumb className="flex-1">
                                <BreadcrumbList>
                                    {activeNavItem && (
                                        <>
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href={activeNavItem.href} className="text-muted-foreground hover:text-primary transition-colors">
                                                    {activeNavItem.label}
                                                </BreadcrumbLink>
                                            </BreadcrumbItem>
                                            {activeNavItem?.href !== path && <>
                                                <BreadcrumbSeparator />
                                                <BreadcrumbItem>
                                                    <BreadcrumbPage className="font-medium">
                                                        {activeNavItem?.href === path ? activeNavItem.label : activeNavItem?.items?.find(item => item.href === path)?.label}
                                                    </BreadcrumbPage>
                                                </BreadcrumbItem>
                                            </>}
                                        </>
                                    )}
                                </BreadcrumbList>
                            </Breadcrumb>
                            <div className="flex items-center gap-4 ml-auto px-4">
                                <div className="relative hidden md:block">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="h-9 w-64 rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm transition-all focus:bg-background focus:ring-1 focus:ring-primary outline-none"
                                    />
                                </div>
                                <Button variant="ghost" size="icon" className="relative">
                                    <Bell className="size-5" />
                                    <span className="absolute top-2 right-2 size-2 bg-primary rounded-full ring-2 ring-background"></span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-6 p-6 bg-muted/40 animate-in fade-in duration-500">
                    <div className="">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout