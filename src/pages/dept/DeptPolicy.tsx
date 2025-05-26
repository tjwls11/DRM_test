
import React, { useState } from 'react';
import { Settings, Plus, Save, RefreshCw } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export const DeptPolicy = () => {
  const [policy, setPolicy] = useState({
    name: "개발팀 보안 정책",
    allowedExtensions: ["pdf", "doc", "docx", "xls", "xlsx"],
    blockedUsers: ["temp_user@company.com"],
    workingHours: {
      enabled: true,
      start: "09:00",
      end: "18:00"
    },
    autoApproval: {
      enabled: false,
      conditions: []
    },
    accessDuration: 60,
    vpnRequired: false,
    multiApproval: false
  });

  const handleSavePolicy = () => {
    console.log('부서 정책 저장:', policy);
  };

  const handleResetPolicy = () => {
    console.log('기본 정책으로 재설정');
  };

  const addAllowedExtension = (extension: string) => {
    if (extension && !policy.allowedExtensions.includes(extension)) {
      setPolicy({
        ...policy,
        allowedExtensions: [...policy.allowedExtensions, extension]
      });
    }
  };

  const removeAllowedExtension = (extension: string) => {
    setPolicy({
      ...policy,
      allowedExtensions: policy.allowedExtensions.filter(ext => ext !== extension)
    });
  };

  const addBlockedUser = (email: string) => {
    if (email && !policy.blockedUsers.includes(email)) {
      setPolicy({
        ...policy,
        blockedUsers: [...policy.blockedUsers, email]
      });
    }
  };

  const removeBlockedUser = (email: string) => {
    setPolicy({
      ...policy,
      blockedUsers: policy.blockedUsers.filter(user => user !== email)
    });
  };

  return (
    <Layout userName="이팀장" userRole="dept_admin">
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground">부서 정책 설정</h2>
            <p className="text-muted-foreground">개발팀의 파일 접근 정책을 관리합니다</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleResetPolicy}>
              <RefreshCw className="h-4 w-4 mr-2" />
              기본값으로 재설정
            </Button>
            <Button onClick={handleSavePolicy}>
              <Save className="h-4 w-4 mr-2" />
              정책 저장
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* 기본 설정 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                기본 설정
              </CardTitle>
              <CardDescription>
                부서의 기본 보안 정책을 설정합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="policy-name">정책명</Label>
                <Input
                  id="policy-name"
                  value={policy.name}
                  onChange={(e) => setPolicy({...policy, name: e.target.value})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">업무시간 제한</Label>
                  <p className="text-sm text-muted-foreground">
                    지정된 시간에만 파일 접근을 허용합니다
                  </p>
                </div>
                <Switch 
                  checked={policy.workingHours.enabled}
                  onCheckedChange={(checked) => 
                    setPolicy({
                      ...policy, 
                      workingHours: {...policy.workingHours, enabled: checked}
                    })
                  }
                />
              </div>

              {policy.workingHours.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>시작 시간</Label>
                    <Input
                      type="time"
                      value={policy.workingHours.start}
                      onChange={(e) => setPolicy({
                        ...policy,
                        workingHours: {...policy.workingHours, start: e.target.value}
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>종료 시간</Label>
                    <Input
                      type="time"
                      value={policy.workingHours.end}
                      onChange={(e) => setPolicy({
                        ...policy,
                        workingHours: {...policy.workingHours, end: e.target.value}
                      })}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="access-duration">접근 권한 유효시간 (분)</Label>
                <Input
                  id="access-duration"
                  type="number"
                  value={policy.accessDuration}
                  onChange={(e) => setPolicy({...policy, accessDuration: Number(e.target.value)})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">VPN 접속 필수</Label>
                  <p className="text-sm text-muted-foreground">
                    VPN 연결 시에만 파일 접근을 허용합니다
                  </p>
                </div>
                <Switch 
                  checked={policy.vpnRequired}
                  onCheckedChange={(checked) => setPolicy({...policy, vpnRequired: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">다단계 승인</Label>
                  <p className="text-sm text-muted-foreground">
                    중요 파일은 2명 이상의 승인이 필요합니다
                  </p>
                </div>
                <Switch 
                  checked={policy.multiApproval}
                  onCheckedChange={(checked) => setPolicy({...policy, multiApproval: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* 파일 형식 제한 */}
          <Card>
            <CardHeader>
              <CardTitle>허용 파일 형식</CardTitle>
              <CardDescription>
                접근을 허용할 파일 확장자를 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="확장자 입력 (예: pdf)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addAllowedExtension((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <Button 
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="확장자 입력 (예: pdf)"]') as HTMLInputElement;
                    if (input?.value) {
                      addAllowedExtension(input.value);
                      input.value = '';
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {policy.allowedExtensions.map((ext) => (
                  <Badge 
                    key={ext} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeAllowedExtension(ext)}
                  >
                    .{ext} ×
                  </Badge>
                ))}
              </div>

              <div className="pt-4 border-t">
                <Label className="font-medium">빠른 설정</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPolicy({
                      ...policy, 
                      allowedExtensions: ["pdf", "doc", "docx", "txt"]
                    })}
                  >
                    문서 파일
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPolicy({
                      ...policy, 
                      allowedExtensions: ["xls", "xlsx", "csv"]
                    })}
                  >
                    스프레드시트
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setPolicy({
                      ...policy, 
                      allowedExtensions: ["jpg", "jpeg", "png", "gif"]
                    })}
                  >
                    이미지 파일
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 차단 사용자 */}
          <Card>
            <CardHeader>
              <CardTitle>차단 사용자</CardTitle>
              <CardDescription>
                파일 접근을 제한할 사용자를 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="이메일 주소 입력"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addBlockedUser((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="이메일 주소 입력"]') as HTMLInputElement;
                    if (input?.value) {
                      addBlockedUser(input.value);
                      input.value = '';
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {policy.blockedUsers.map((user) => (
                  <div key={user} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{user}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeBlockedUser(user)}
                    >
                      삭제
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 자동 승인 설정 */}
          <Card>
            <CardHeader>
              <CardTitle>자동 승인 설정</CardTitle>
              <CardDescription>
                특정 조건을 만족하는 요청을 자동으로 승인합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">자동 승인 활성화</Label>
                  <p className="text-sm text-muted-foreground">
                    조건에 맞는 요청을 자동으로 승인합니다
                  </p>
                </div>
                <Switch 
                  checked={policy.autoApproval.enabled}
                  onCheckedChange={(checked) => 
                    setPolicy({
                      ...policy, 
                      autoApproval: {...policy.autoApproval, enabled: checked}
                    })
                  }
                />
              </div>

              {policy.autoApproval.enabled && (
                <div className="space-y-4">
                  <div>
                    <Label>자동 승인 조건</Label>
                    <Textarea
                      placeholder="자동 승인할 조건을 입력하세요&#10;예: 파일 크기 < 10MB&#10;예: 파일 경로가 /public/으로 시작"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>제외 파일 패턴</Label>
                    <Input placeholder="예: *_secret_*, *_confidential_*" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
