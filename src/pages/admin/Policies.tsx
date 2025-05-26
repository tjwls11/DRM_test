
import React, { useState } from 'react';
import { Shield, Plus, Settings, Edit, Copy } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export const Policies = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const policies = [
    {
      id: 1,
      name: "기본 보안 정책",
      description: "일반적인 파일 접근 정책",
      rules: [
        "PDF, DOC, XLS 파일만 허용",
        "업무시간 외 접근 제한",
        "관리자 승인 필수"
      ],
      departments: ["개발팀", "마케팅팀"],
      isActive: true,
      createdAt: "2024-01-10"
    },
    {
      id: 2,
      name: "고급 보안 정책",
      description: "민감한 정보가 포함된 파일용",
      rules: [
        "PDF 파일만 허용",
        "VPN 접속 시에만 허용",
        "2단계 승인 필요",
        "접근 시간 제한 (30분)"
      ],
      departments: ["IT팀"],
      isActive: true,
      createdAt: "2024-01-05"
    },
    {
      id: 3,
      name: "영업팀 전용 정책",
      description: "고객 정보 관련 파일 정책",
      rules: [
        "XLS, PDF 파일 허용",
        "고객 정보는 부서장 승인 필요",
        "외부 네트워크 접근 차단"
      ],
      departments: ["영업팀"],
      isActive: false,
      createdAt: "2024-01-08"
    }
  ];

  return (
    <Layout userName="홍관리자" userRole="super_admin">
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground">정책 프리셋</h2>
            <p className="text-muted-foreground">부서별로 적용할 기본 정책 템플릿을 관리합니다</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                정책 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>새 정책 생성</DialogTitle>
                <DialogDescription>
                  새로운 보안 정책 프리셋을 생성합니다
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="policy-name" className="text-right">
                    정책명
                  </Label>
                  <Input
                    id="policy-name"
                    placeholder="정책 이름을 입력하세요"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="policy-description" className="text-right">
                    설명
                  </Label>
                  <Textarea
                    id="policy-description"
                    placeholder="정책에 대한 설명을 입력하세요"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="policy-rules" className="text-right">
                    정책 규칙
                  </Label>
                  <Textarea
                    id="policy-rules"
                    placeholder="정책 규칙을 한 줄씩 입력하세요"
                    className="col-span-3 h-32"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">정책 생성</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {policies.map((policy) => (
            <Card key={policy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{policy.name}</CardTitle>
                      <CardDescription>{policy.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={policy.isActive} />
                    <Badge variant={policy.isActive ? "default" : "secondary"}>
                      {policy.isActive ? "활성" : "비활성"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">정책 규칙</h4>
                    <ul className="space-y-1">
                      {policy.rules.map((rule, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">적용 부서</h4>
                    <div className="flex flex-wrap gap-2">
                      {policy.departments.map((dept) => (
                        <Badge key={dept} variant="outline" className="text-xs">
                          {dept}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm text-muted-foreground">
                      생성일: {policy.createdAt}
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="h-3 w-3 mr-1" />
                        복사
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        편집
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              글로벌 설정
            </CardTitle>
            <CardDescription>
              모든 정책에 공통으로 적용되는 설정입니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">자동 승인 기능</Label>
                <p className="text-sm text-muted-foreground">
                  특정 조건을 만족하는 요청을 자동으로 승인합니다
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">승인 만료 시간</Label>
                <p className="text-sm text-muted-foreground">
                  승인된 파일 접근 권한의 유효 시간을 설정합니다
                </p>
              </div>
              <Input className="w-32" placeholder="60분" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">알림 설정</Label>
                <p className="text-sm text-muted-foreground">
                  새로운 요청 시 관리자에게 실시간 알림을 보냅니다
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
