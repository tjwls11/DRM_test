
import React, { useState } from 'react';
import { UserCheck, Plus, Search, Edit, Trash2 } from 'lucide-react';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export const Roles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const users = [
    {
      id: 1,
      username: "김철수",
      email: "kim@company.com",
      department: "개발팀",
      role: "user",
      lastLogin: "2024-01-15 09:30"
    },
    {
      id: 2,
      username: "이영희",
      email: "lee@company.com", 
      department: "마케팅팀",
      role: "dept_admin",
      lastLogin: "2024-01-15 08:45"
    },
    {
      id: 3,
      username: "박민수",
      email: "park@company.com",
      department: "영업팀", 
      role: "user",
      lastLogin: "2024-01-14 17:20"
    },
    {
      id: 4,
      username: "정관리자",
      email: "admin@company.com",
      department: "IT팀",
      role: "super_admin",
      lastLogin: "2024-01-15 10:00"
    }
  ];

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

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = (userId: number, newRole: string) => {
    console.log(`사용자 ${userId}의 역할을 ${newRole}로 변경`);
    // 역할 변경 로직 구현
  };

  return (
    <Layout userName="홍관리자" userRole="super_admin">
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground">역할 관리</h2>
            <p className="text-muted-foreground">사용자의 권한과 역할을 관리합니다</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            사용자 추가
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              사용자 목록
            </CardTitle>
            <CardDescription>
              전체 사용자와 역할 정보를 확인하고 관리합니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="사용자명, 부서, 이메일로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>사용자명</TableHead>
                  <TableHead>이메일</TableHead>
                  <TableHead>부서</TableHead>
                  <TableHead>역할</TableHead>
                  <TableHead>마지막 로그인</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.lastLogin}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedUser(user)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              편집
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>역할 변경</DialogTitle>
                              <DialogDescription>
                                {selectedUser?.username}님의 역할을 변경합니다
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="role" className="text-right">
                                  역할
                                </Label>
                                <Select defaultValue={selectedUser?.role}>
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="역할 선택" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="user">일반사용자</SelectItem>
                                    <SelectItem value="dept_admin">부서관리자</SelectItem>
                                    <SelectItem value="super_admin">총관리자</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button 
                                onClick={() => handleRoleChange(selectedUser?.id, 'dept_admin')}
                              >
                                변경 저장
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="outline" size="sm" className="text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
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
