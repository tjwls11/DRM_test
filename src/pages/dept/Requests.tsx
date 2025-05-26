
import React, { useState } from 'react';
import { ClipboardList, Eye, Check, X, Clock, Filter } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';

export const Requests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const requests = [
    {
      id: 1,
      user: "김철수",
      email: "kim@company.com",
      fileName: "project_config.pdf",
      filePath: "/projects/config/project_config.pdf",
      requestTime: "2024-01-15 09:30",
      reason: "프로젝트 설정 확인이 필요합니다",
      status: "pending",
      priority: "normal",
      department: "개발팀",
      accessType: "read"
    },
    {
      id: 2,
      user: "박민수",
      email: "park@company.com",
      fileName: "customer_data.xlsx",
      filePath: "/data/customer_data.xlsx",
      requestTime: "2024-01-15 08:45",
      reason: "고객 분석 업무",
      status: "approved",
      priority: "high",
      department: "개발팀",
      accessType: "read",
      approvedAt: "2024-01-15 09:00",
      expiresAt: "2024-01-15 17:00"
    },
    {
      id: 3,
      user: "최개발자",
      email: "choi@company.com",
      fileName: "api_documentation.pdf",
      filePath: "/docs/api_documentation.pdf",
      requestTime: "2024-01-15 07:15",
      reason: "API 문서 검토",
      status: "rejected",
      priority: "low",
      department: "개발팀",
      accessType: "read",
      rejectedAt: "2024-01-15 08:30",
      rejectionReason: "업무시간 외 요청"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-600 text-white">대기중</Badge>;
      case 'approved':
        return <Badge className="bg-green-600 text-white">승인됨</Badge>;
      case 'rejected':
        return <Badge className="bg-red-600 text-white">거절됨</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="outline" className="text-red-600 border-red-600">높음</Badge>;
      case 'normal':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">보통</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-gray-600 border-gray-600">낮음</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (requestId: number, level: string) => {
    console.log(`요청 ${requestId} 승인, 레벨: ${level}`);
  };

  const handleReject = (requestId: number, reason: string) => {
    console.log(`요청 ${requestId} 거절, 사유: ${reason}`);
  };

  return (
    <Layout userName="이팀장" userRole="dept_admin">
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-foreground">요청 목록</h2>
          <p className="text-muted-foreground">개발팀의 파일 접근 요청을 관리합니다</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-sm text-muted-foreground">대기중</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">승인됨</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <X className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-sm text-muted-foreground">거절됨</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">총 요청</p>
                  <p className="text-2xl font-bold">17</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              파일 접근 요청
            </CardTitle>
            <CardDescription>
              부서원들의 파일 접근 요청을 검토하고 승인/거절하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="사용자명, 파일명, 요청 사유로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 상태</SelectItem>
                  <SelectItem value="pending">대기중</SelectItem>
                  <SelectItem value="approved">승인됨</SelectItem>
                  <SelectItem value="rejected">거절됨</SelectItem>
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
                  <TableHead>요청자</TableHead>
                  <TableHead>파일명</TableHead>
                  <TableHead>요청 시간</TableHead>
                  <TableHead>우선순위</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.user}</p>
                        <p className="text-sm text-muted-foreground">{request.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.fileName}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-xs">
                          {request.filePath}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{request.requestTime}</TableCell>
                    <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedRequest(request)}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              상세
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>요청 상세 정보</DialogTitle>
                              <DialogDescription>
                                파일 접근 요청의 세부 내용을 확인하고 승인/거절하세요
                              </DialogDescription>
                            </DialogHeader>
                            {selectedRequest && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>요청자</Label>
                                    <p className="font-medium">{selectedRequest.user}</p>
                                    <p className="text-sm text-muted-foreground">{selectedRequest.email}</p>
                                  </div>
                                  <div>
                                    <Label>요청 시간</Label>
                                    <p>{selectedRequest.requestTime}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <Label>파일 정보</Label>
                                  <p className="font-medium">{selectedRequest.fileName}</p>
                                  <p className="text-sm text-muted-foreground">{selectedRequest.filePath}</p>
                                </div>

                                <div>
                                  <Label>요청 사유</Label>
                                  <p>{selectedRequest.reason}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>우선순위</Label>
                                    <div className="mt-1">{getPriorityBadge(selectedRequest.priority)}</div>
                                  </div>
                                  <div>
                                    <Label>접근 유형</Label>
                                    <p className="capitalize">{selectedRequest.accessType}</p>
                                  </div>
                                </div>

                                {selectedRequest.status === 'pending' && (
                                  <div className="space-y-4 pt-4 border-t">
                                    <div>
                                      <Label>보안 등급 설정</Label>
                                      <Select defaultValue="MIDDLE">
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="LOW">LOW - 일반 문서</SelectItem>
                                          <SelectItem value="MIDDLE">MIDDLE - 내부 문서</SelectItem>
                                          <SelectItem value="HIGH">HIGH - 기밀 문서</SelectItem>
                                          <SelectItem value="TOP_SECRET">TOP SECRET - 극비 문서</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    
                                    <div>
                                      <Label>승인/거절 사유</Label>
                                      <Textarea placeholder="승인 또는 거절 사유를 입력하세요" />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            <DialogFooter>
                              {selectedRequest?.status === 'pending' && (
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline"
                                    className="text-red-600 border-red-600 hover:bg-red-50"
                                    onClick={() => handleReject(selectedRequest.id, "거절 사유")}
                                  >
                                    거절
                                  </Button>
                                  <Button 
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleApprove(selectedRequest.id, "MIDDLE")}
                                  >
                                    승인
                                  </Button>
                                </div>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {request.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(request.id, "MIDDLE")}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-600 border-red-600"
                              onClick={() => handleReject(request.id, "거절")}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </>
                        )}
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
