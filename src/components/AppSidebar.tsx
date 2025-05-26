
import React from 'react';
import { 
  Shield, 
  Users, 
  Settings, 
  FileText, 
  BarChart3, 
  UserCheck, 
  ClipboardList,
  Building
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  userRole: 'super_admin' | 'dept_admin';
}

export const AppSidebar = ({ userRole }: AppSidebarProps) => {
  const superAdminItems = [
    { title: "대시보드", url: "/dashboard", icon: BarChart3 },
    { title: "역할 관리", url: "/admin/roles", icon: UserCheck },
    { title: "사용자 정보", url: "/admin/users", icon: Users },
    { title: "정책 프리셋", url: "/admin/policies", icon: Settings },
    { title: "감사 로그", url: "/admin/logs", icon: FileText },
    { title: "회사 등록", url: "/register-company", icon: Building },
  ];

  const deptAdminItems = [
    { title: "대시보드", url: "/dashboard", icon: BarChart3 },
    { title: "요청 목록", url: "/requests", icon: ClipboardList },
    { title: "부서 정책", url: "/dept-policy", icon: Settings },
  ];

  const menuItems = userRole === 'super_admin' ? superAdminItems : deptAdminItems;

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-sidebar-foreground">DRM Portal</h2>
            <p className="text-sm text-sidebar-foreground/70">
              {userRole === 'super_admin' ? '총관리자' : '부서관리자'}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  >
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-sidebar-foreground/50 text-center">
          © 2024 DRM Security Portal
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
