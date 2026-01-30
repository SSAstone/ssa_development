"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { MenuProps } from "@/app/admin/layout"

export function NavMain({
  items,
}: {
  items: any[]
}) {
  const path = usePathname()

  return (
    <SidebarMenu>
      {items.map((item, index) => (
        item?.title ? <SidebarGroupLabel key={index}>{item.title}</SidebarGroupLabel> : <Collapsible
          open={item.collapsed}
          key={item.label}
          asChild
          defaultOpen={true}
          className="group/collapsible"
        >
          {
            item.items ? <SidebarMenuItem>
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
                      <SidebarMenuSubItem key={subItem.label}>
                        <SidebarMenuButton asChild isActive={path === subItem.href}>
                          <Link href={subItem.href}>
                            <span className="">{subItem.label}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    ))
                  }
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem> : <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={path === item.href}>
                <Link href={item.href || "#"}>
                  {item.icon && <item.icon />}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          }
        </Collapsible>
      ))}
    </SidebarMenu>
  )
}
