
import React, { useState } from 'react';
import { Users, Download, Filter, RefreshCw } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');

  const users = [
    {
      id: 1,
      username: "김철수",
      email: "kim@company.com",
      department: "개발팀",
      position: "선임개발자",
      role: "user",
      status: "active",
      lastLogin: "2024-01-15 09:30",
      loginCount: 45
    },
    {
      id: 2,
      username: "이영희",
      email: "lee@company.com",
      department: "마케팅팀",
      position: "팀장",
      role: "dept_admin",
      status: "active",
      lastLogin: "2024-01-15 08:45",
      loginCount: 23
    },
    {
      id: 3,
      username: "박민수",
      email: "park@company.com",
      department: "영업팀",
      position: "과장",
      role: "user",
      status: "inactive",
      lastLogin: "2024-01-10 17:20",
      loginCount: 12
    },
    {
      id: 4,
      username: "정관리자",
      email: "admin@company.com",
      department: "IT팀",
      position: "부장",
      role: "super_admin",
      status: "active",
      lastLogin: "2024-01-15 10:00",
      loginCount: 89
    },
    {
      id: 5,
      username: "최설계자",
      email: "choi@company.com",
      department: "개발팀",
      position: "설계팀장",
      role: "user",
      status: "active",
      lastLogin: "2024-01-15 07:15",
      loginCount: 67
    }
  ];

  const departments = ['개발팀', '마케팅팀', '영업팀', 'IT팀'];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Badge className="bg-red-600 text-white">총관리자</Badge>;
      case 'dept_admin':
        return <Badge className="bg-blue-600 text-white">부서관리자</Badge>;
      case 'user':
        return <Badge variant="outline">일반사용자</Badge>;
      default:
        return <Badge variant="outline">알 수 없음</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge className="bg-green-600 text-white">활성</Badge>
      : <Badge variant="outline" className="text-gray-600">비활성</Badge>;
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const handleExport = () => {
    console.log('사용자 목록 내보내기');
    // CSV 내보내기 로직
  };

  const handleSync = () => {
    console.log('AD 동기화 시작');
    // AD 동기화 로직
  };

  return (
    <Layout userName="홍관리자" userRole="super_admin">
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground">사용자 정보</h2>
            <p className="text-muted-foreground">전체 사용자의 정보와 활동 상태를 확인합니다</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSync}>
              <RefreshCw className="h-4 w-4 mr-2" />
              AD 동기화
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              내보내기
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              사용자 목록
              <Badge variant="secondary" className="ml-2">{filteredUsers.length}명</Badge>
            </CardTitle>
            <CardDescription>
              AD 연동으로 가져온 사용자 정보입니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="사용자명, 이메일, 부서로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
              
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="부서 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 부서</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="역할 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 역할</SelectItem>
                  <SelectItem value="super_admin">총관리자</SelectItem>
                  <SelectItem value="dept_admin">부서관리자</SelectItem>
                  <SelectItem value="user">일반사용자</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                필터 초기화
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>사용자명</TableHead>
                  <TableHead>이메일</TableHead>
                  <TableHead>부서</TableHead>
                  <TableHead>직급</TableHead>
                  <TableHead>역할</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>마지막 로그인</TableHead>
                  <TableHead>로그인 횟수</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.position}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.loginCount}회</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
