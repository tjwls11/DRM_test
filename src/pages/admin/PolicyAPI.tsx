
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Server } from 'lucide-react';

export const PolicyAPI = () => {
  return (
    <Layout userName="관리자" userRole="super_admin">
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-foreground">정책 API</h2>
          <p className="text-muted-foreground">DSL 정책 엔진 API 관리</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              API 설정
            </CardTitle>
            <CardDescription>
              정책 API 엔드포인트 설정 및 관리
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">API 설정 기능은 개발 중입니다.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
