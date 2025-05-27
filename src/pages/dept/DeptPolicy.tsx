
import React from 'react';
import { Layout } from '@/components/Layout';
import { DSLPolicyEditor } from '@/components/DSLPolicyEditor';

export const DeptPolicy = () => {
  return (
    <Layout userName="이팀장" userRole="dept_admin">
      <div className="space-y-6 animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-foreground">부서 정책 설정</h2>
          <p className="text-muted-foreground">DSL을 사용하여 개발팀의 파일 접근 정책을 관리합니다</p>
        </div>

        <DSLPolicyEditor />
      </div>
    </Layout>
  );
};
