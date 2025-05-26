
import React, { useState } from 'react';
import { FileText, Download, Filter, Calendar, Eye } from 'lucide-react';
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
import { DatePickerWithRange } from '@/components/ui/date-picker';

export const Logs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const logs = [
    {
      id: 1,
      timestamp: "2024-01-15 09:30:15",
      user: "김철수",
      department: "개발팀",
      action: "파일 요청",
      target: "project_config.pdf",
      status: "승인됨",
      approver: "이팀장",
      ip: "192.168.1.100",
      details: "정상적인 업무 요청"
    },
    {
      id: 2,
      timestamp: "2024-01-15 09:25:42",
      user: "박민수",
      department: "영업팀",
      action: "파일 접근",
      target: "customer_data.xlsx",
      status: "거절됨",
      approver: "관리자",
      ip: "192.168.1.105",
      details: "업무시간 외 접근 시도"
    },
    {
      id: 3,
      timestamp: "2024-01-15 08:45:20",
      user: "이영희",
      department: "마케팅팀",
      action: "정책 위반",
      target: "marketing_plan.docx",
      status: "차단됨",
      approver: "시스템",
      ip: "192.168.1.102",
      details: "허용되지 않은 파일 형식"
    },
    {
      id: 4,
      timestamp: "2024-01-15 08:30:10",
      user: "최개발자",
      department: "개발팀",
      action: "로그인",
      target: "DRM Portal",
      status: "성공",
      approver: "-",
      ip: "192.168.1.103",
      details: "AD 인증 성공"
    },
    {
      id: 5,
      timestamp: "2024-01-15 07:15:30",
      user: "정관리자",
      department: "IT팀",
      action: "정책 수정",
      target: "기본 보안 정책",
      status: "완료",
      approver: "-",
      ip: "192.168.1.101",
      details: "정책 규칙 업데이트"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '승인됨':
        return <Badge className="bg-green-600 text-white">승인됨</Badge>;
      case '거절됨':
        return <Badge className="bg-red-600 text-white">거절됨</Badge>;
      case '차단됨':
        return <Badge className="bg-orange-600 text-white">차단됨</Badge>;
      case '성공':
        return <Badge className="bg-blue-600 text-white">성공</Badge>;
      case '완료':
        return <Badge className="bg-purple-600 text-white">완료</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case '파일 요청':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">파일 요청</Badge>;
      case '파일 접근':
        return <Badge variant="outline" className="text-green-600 border-green-600">파일 접근</Badge>;
      case '정책 위반':
        return <Badge variant="outline" className="text-red-600 border-red-600">정책 위반</Badge>;
      case '로그인':
        return <Badge variant="outline" className="text-purple-600 border-purple-600">로그인</Badge>;
      case '정책 수정':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">정책 수정</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    
    return matchesSearch && matchesAction && matchesStatus;
  });

  const handleExport = () => {
    console.log('로그 내보내기');
  };

  return (
    <Layout userName="홍관리자" userRole="super_admin">
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground">감사 로그</h2>
            <p className="text-muted-foreground">시스템의 모든 활동과 보안 이벤트를 확인합니다</p>
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            로그 내보내기
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              활동 로그
              <Badge variant="secondary" className="ml-2">{filteredLogs.length}건</Badge>
            </CardTitle>
            <CardDescription>
              파일 접근, 승인/거절, 정책 위반 등 모든 활동 기록입니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-6">
              <Input
                placeholder="사용자명, 파일명, 세부사항으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="활동 유형" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 활동</SelectItem>
                  <SelectItem value="파일 요청">파일 요청</SelectItem>
                  <SelectItem value="파일 접근">파일 접근</SelectItem>
                  <SelectItem value="정책 위반">정책 위반</SelectItem>
                  <SelectItem value="로그인">로그인</SelectItem>
                  <SelectItem value="정책 수정">정책 수정</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="승인됨">승인됨</SelectItem>
                  <SelectItem value="거절됨">거절됨</SelectItem>
                  <SelectItem value="차단됨">차단됨</SelectItem>
                  <SelectItem value="성공">성공</SelectItem>
                  <SelectItem value="완료">완료</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                날짜 범위
              </Button>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                필터 초기화
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>시간</TableHead>
                  <TableHead>사용자</TableHead>
                  <TableHead>부서</TableHead>
                  <TableHead>활동</TableHead>
                  <TableHead>대상</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>승인자</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>상세</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-muted/50">
                    <TableCell className="text-sm font-mono">
                      {log.timestamp}
                    </TableCell>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">{log.department}</Badge>
                    </TableCell>
                    <TableCell>{getActionBadge(log.action)}</TableCell>
                    <TableCell className="max-w-xs truncate">{log.target}</TableCell>
                    <TableCell>{getStatusBadge(log.status)}</TableCell>
                    <TableCell>{log.approver}</TableCell>
                    <TableCell className="text-sm font-mono">{log.ip}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm">{log.details}</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
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
