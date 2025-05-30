
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Roles } from "./pages/admin/Roles";
import { UsersList } from "./pages/admin/Users";
import { Policies } from "./pages/admin/Policies";
import { Logs } from "./pages/admin/Logs";
import { RegisterCompany } from "./pages/admin/RegisterCompany";
import { PolicyAPI } from "./pages/admin/PolicyAPI";
import { Requests } from "./pages/dept/Requests";
import { DeptPolicy } from "./pages/dept/DeptPolicy";
import { Apply } from "./pages/Apply";
import { Activate } from "./pages/Activate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* 홈페이지 */}
          <Route path="/" element={<Home />} />
          
          {/* 라이센스 관련 페이지 */}
          <Route path="/apply" element={<Apply />} />
          <Route path="/activate" element={<Activate />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* 총관리자 전용 페이지 */}
          <Route path="/admin/roles" element={<Roles />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/policies" element={<Policies />} />
          <Route path="/admin/logs" element={<Logs />} />
          <Route path="/admin/policy-api" element={<PolicyAPI />} />
          <Route path="/register-company" element={<RegisterCompany />} />
          
          {/* 부서관리자 페이지 */}
          <Route path="/requests" element={<Requests />} />
          <Route path="/dept-policy" element={<DeptPolicy />} />
          
          {/* 404 페이지 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
