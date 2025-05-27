
import React from 'react';
import { Layout } from '@/components/Layout';
import { PolicyAPITester } from '@/components/PolicyAPITester';

export const PolicyAPI = () => {
  return (
    <Layout userName="홍관리자" userRole="super_admin">
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-foreground">DSL 정책 API</h2>
          <p className="text-muted-foreground">정책 엔진 API를 테스트하고 통합 가이드를 확인하세요</p>
        </div>

        <PolicyAPITester />
      </div>
    </Layout>
  );
};
