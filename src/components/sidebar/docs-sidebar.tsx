"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import { BookOpen, Bot, ChevronRight, GraduationCap, School, Shield, SquareTerminal, TextAlignCenter, User } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Link from "next/link"

export interface DocsMenuProps {
    title?: string
    label?: string
    icon?: any
    href?: string
    items?: any
    disabled?: boolean,
    collapsed?: boolean,
    content?: any
}

interface SidebarProps extends React.ComponentProps<'div'> {
    menu?: any[];
    setData?: any,
    active?: string,
    setActive?: any,
    setDynamicData?: any,
    dynamicData?: any
}

export function DocsSidebar({ menu, setData, active, setActive, setDynamicData, dynamicData, ...props }: SidebarProps) {

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/docs">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <BookOpen className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Documentation</span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {menu?.map((item: any, index) => (
                            item?.title ? <SidebarGroupLabel key={index}>{item.title}</SidebarGroupLabel> : <Collapsible
                                open={item.collapsed}
                                key={item.label}
                                asChild
                                defaultOpen={true}
                                className="group/collapsible"
                            >
                                {
                                    item.items ? <SidebarMenuItem onClick={() => setData(item)}>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={item.label}>
                                                {item.icon && <item.icon />}
                                                <span className="text-black">{item.label}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub className="gap-0.5">
                                                {
                                                    item.items?.map((subItem: any) => (
                                                        <SidebarMenuSubItem
                                                            key={subItem.label}
                                                            onClick={() => {
                                                                setActive((subItem.label || "").toString().replace(/ /g, "-").toLowerCase())
                                                                setData(null)
                                                                setDynamicData(subItem)
                                                            }}
                                                        >
                                                            <SidebarMenuButton
                                                                asChild
                                                                isActive={active === (subItem.label || "").toString().replace(/ /g, "-").toLowerCase()}
                                                            >
                                                                <Link href={`/docs#${(item.label || "").toString().replace(/ /g, "-").toLowerCase()}#${(subItem.label || "").toString().replace(/ /g, "-").toLowerCase()}`}>
                                                                    <span className="">{subItem.label}</span>
                                                                </Link>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuSubItem>
                                                    ))
                                                }
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem> : <SidebarMenuItem onClick={() => {
                                        setActive((item.label || "").toString().replace(/ /g, "-").toLowerCase())
                                        setData(item)
                                        setDynamicData(null)
                                    }}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={active === (item.label || "").toString().replace(/ /g, "-").toLowerCase()}
                                        >
                                            <Link href={`/docs#${(item.label || "").toString().replace(/ /g, "-").toLowerCase()}`}>
                                                {item.icon && <item.icon />}
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                }
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}