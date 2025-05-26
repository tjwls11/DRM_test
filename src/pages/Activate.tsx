
import React, { useState } from 'react';
import { Key, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const Activate = () => {
  const [licenseKey, setLicenseKey] = useState('');
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    email: '',
    contact: ''
  });
  const [activationStatus, setActivationStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    setActivationStatus('validating');
    
    // 라이센스 키 검증 시뮬레이션
    setTimeout(() => {
      if (licenseKey.length > 10) {
        setActivationStatus('success');
      } else {
        setActivationStatus('error');
        setErrorMessage('잘못된 라이센스 키입니다. 이메일로 받은 키를 확인해주세요.');
      }
    }, 2000);
  };

  if (activationStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-6 animate-fade-in">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-green-800">라이센스 활성화 완료</CardTitle>
              <CardDescription className="text-green-600">
                DRM 솔루션이 성공적으로 활성화되었습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium text-gray-800 mb-2">활성화된 라이센스 정보</h4>
                <div className="text-sm space-y-1 text-gray-600">
                  <p>라이센스 키: {licenseKey.substring(0, 8)}****</p>
                  <p>회사명: SIDLE Corporation</p>
                  <p>활성화 일시: {new Date().toLocaleDateString('ko-KR')}</p>
                  <p>만료일: {new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString('ko-KR')}</p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = '/register-company'}
              >
                다음 단계: 회사 등록 및 AD 연동
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-6 animate-fade-in">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Key className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">DRM 라이센스 활성화</h1>
          <p className="text-gray-600">이메일로 받은 라이센스 키를 입력하여 DRM 솔루션을 활성화하세요</p>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              라이센스 정보 입력
            </CardTitle>
            <CardDescription>
              SIDLE-DRM 신청 시 등록한 이메일로 발송된 라이센스 키를 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleActivate} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="license-key">라이센스 키</Label>
                  <Input
                    id="license-key"
                    type="text"
                    placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
                    className="font-mono text-center tracking-wide"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">회사명</Label>
                    <Input
                      id="company-name"
                      type="text"
                      placeholder="A컴퍼니"
                      value={companyInfo.name}
                      onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-email">회사 이메일</Label>
                    <Input
                      id="company-email"
                      type="email"
                      placeholder="admin@company.com"
                      value={companyInfo.email}
                      onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">담당자 연락처</Label>
                    <Input
                      id="contact"
                      type="tel"
                      placeholder="010-1234-5678"
                      value={companyInfo.contact}
                      onChange={(e) => setCompanyInfo({...companyInfo, contact: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              {activationStatus === 'error' && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {errorMessage}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={activationStatus === 'validating'}
              >
                {activationStatus === 'validating' ? '라이센스 검증 중...' : '라이센스 활성화'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">라이센스 키를 받지 못하셨나요?</h4>
              <p className="text-sm text-blue-600 mb-2">
                1. 스팸 메일함을 확인해주세요<br/>
                2. 신청 시 입력한 이메일 주소가 정확한지 확인해주세요<br/>
                3. 24시간 이내에 메일이 오지 않으면 고객지원에 문의해주세요
              </p>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-600">
                고객지원 문의
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
