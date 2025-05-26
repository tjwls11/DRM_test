
import React from 'react';
import { 
  FileText, 
  Users, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const Dashboard = () => {
  const recentRequests = [
    {
      id: 1,
      user: "김철수",
      department: "개발팀",
      file: "project_config.pdf",
      status: "pending",
      time: "5분 전"
    },
    {
      id: 2,
      user: "이영희",
      department: "마케팅팀",
      file: "marketing_plan.docx",
      status: "approved",
      time: "15분 전"
    },
    {
      id: 3,
      user: "박민수",
      department: "영업팀",
      file: "customer_data.xlsx",
      status: "rejected",
      time: "1시간 전"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">대기중</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-600">승인됨</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600">거절됨</Badge>;
      default:
        return <Badge variant="outline">알 수 없음</Badge>;
    }
  };

  return (
    <Layout userName="홍관리자" userRole="super_admin">
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-foreground">대시보드</h2>
          <p className="text-muted-foreground">DRM 시스템 현황을 한눈에 확인하세요</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="오늘 요청"
            value={12}
            icon={FileText}
            trend={{ value: 20, isPositive: true }}
          />
          <StatCard
            title="대기중인 요청"
            value={5}
            icon={Clock}
            trend={{ value: -10, isPositive: false }}
          />
          <StatCard
            title="활성 사용자"
            value={148}
            icon={Users}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="보안 이벤트"
            value={3}
            icon={Shield}
            trend={{ value: -15, isPositive: true }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 최근 요청 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                최근 파일 요청
              </CardTitle>
              <CardDescription>
                최근 처리된 파일 접근 요청 목록입니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{request.user}</span>
                        <Badge variant="secondary" className="text-xs">{request.department}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.file}</p>
                      <p className="text-xs text-muted-foreground">{request.time}</p>
                    </div>
                    <div className="ml-4">
                      {getStatusBadge(request.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 시스템 상태 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                시스템 상태
              </CardTitle>
              <CardDescription>
                DRM 시스템의 주요 지표입니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>정책 준수율</span>
                  <span>94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>시스템 가용성</span>
                  <span>99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>승인 처리율</span>
                  <span>87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>모든 서비스 정상 운영중</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>3건의 보안 이벤트 감지</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
