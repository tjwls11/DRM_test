
import React, { useState } from 'react';
import { Building, Mail, Phone, Globe, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

export const Apply = () => {
  const [applicationData, setApplicationData] = useState({
    companyName: '',
    businessNumber: '',
    industry: '',
    employeeCount: '',
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    website: '',
    address: '',
    purpose: '',
    agreeTerms: false,
    agreePrivacy: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-6 animate-fade-in">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-green-800">신청이 완료되었습니다</CardTitle>
              <CardDescription className="text-green-600">
                라이센스 키를 이메일로 발송해드리겠습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium text-gray-800 mb-2">신청 정보</h4>
                <div className="text-sm space-y-1 text-gray-600">
                  <p>회사명: {applicationData.companyName}</p>
                  <p>이메일: {applicationData.adminEmail}</p>
                  <p>신청일시: {new Date().toLocaleDateString('ko-KR')}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">다음 단계</h4>
                <div className="text-sm text-blue-600 space-y-1">
                  <p>1. 라이센스 키가 24시간 이내에 이메일로 발송됩니다</p>
                  <p>2. 라이센스 키를 받으신 후 /activate 페이지에서 활성화하세요</p>
                  <p>3. 활성화 후 AD 연동 설정을 진행하세요</p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => window.location.href = '/activate'}
              >
                라이센스 활성화 페이지로 이동
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">SIDLE DRM 오픈소스 신청</h1>
          <p className="text-lg text-gray-600">
            무료 오픈소스 DRM 솔루션을 신청하고 기업의 데이터를 안전하게 보호하세요
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  신청서 작성
                </CardTitle>
                <CardDescription>
                  정확한 정보를 입력해주시면 빠른 처리가 가능합니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 border-b pb-2">회사 정보</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">회사명 *</Label>
                        <Input
                          id="company-name"
                          value={applicationData.companyName}
                          onChange={(e) => setApplicationData({...applicationData, companyName: e.target.value})}
                          placeholder="A컴퍼니"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business-number">사업자등록번호</Label>
                        <Input
                          id="business-number"
                          value={applicationData.businessNumber}
                          onChange={(e) => setApplicationData({...applicationData, businessNumber: e.target.value})}
                          placeholder="123-45-67890"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="industry">업종</Label>
                        <Input
                          id="industry"
                          value={applicationData.industry}
                          onChange={(e) => setApplicationData({...applicationData, industry: e.target.value})}
                          placeholder="IT, 제조업, 금융업 등"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employee-count">직원 수</Label>
                        <Input
                          id="employee-count"
                          value={applicationData.employeeCount}
                          onChange={(e) => setApplicationData({...applicationData, employeeCount: e.target.value})}
                          placeholder="50명"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">회사 주소</Label>
                      <Input
                        id="address"
                        value={applicationData.address}
                        onChange={(e) => setApplicationData({...applicationData, address: e.target.value})}
                        placeholder="서울시 강남구 테헤란로 123"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">회사 웹사이트</Label>
                      <Input
                        id="website"
                        value={applicationData.website}
                        onChange={(e) => setApplicationData({...applicationData, website: e.target.value})}
                        placeholder="https://company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 border-b pb-2">관리자 정보</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="admin-name">관리자 이름 *</Label>
                      <Input
                        id="admin-name"
                        value={applicationData.adminName}
                        onChange={(e) => setApplicationData({...applicationData, adminName: e.target.value})}
                        placeholder="홍길동"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin-email">관리자 이메일 *</Label>
                        <Input
                          id="admin-email"
                          type="email"
                          value={applicationData.adminEmail}
                          onChange={(e) => setApplicationData({...applicationData, adminEmail: e.target.value})}
                          placeholder="admin@company.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-phone">연락처</Label>
                        <Input
                          id="admin-phone"
                          value={applicationData.adminPhone}
                          onChange={(e) => setApplicationData({...applicationData, adminPhone: e.target.value})}
                          placeholder="010-1234-5678"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 border-b pb-2">사용 목적</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="purpose">DRM 도입 목적 및 보호하려는 데이터 유형</Label>
                      <Textarea
                        id="purpose"
                        value={applicationData.purpose}
                        onChange={(e) => setApplicationData({...applicationData, purpose: e.target.value})}
                        placeholder="문서 보안, 개발 소스코드 보호, 고객 정보 보호 등 구체적으로 작성해주세요"
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 border-b pb-2">약관 동의</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="terms"
                          checked={applicationData.agreeTerms}
                          onCheckedChange={(checked) => setApplicationData({...applicationData, agreeTerms: checked as boolean})}
                        />
                        <Label htmlFor="terms" className="text-sm">
                          이용약관에 동의합니다 (필수)
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="privacy"
                          checked={applicationData.agreePrivacy}
                          onCheckedChange={(checked) => setApplicationData({...applicationData, agreePrivacy: checked as boolean})}
                        />
                        <Label htmlFor="privacy" className="text-sm">
                          개인정보 처리방침에 동의합니다 (필수)
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                    disabled={!applicationData.agreeTerms || !applicationData.agreePrivacy}
                  >
                    DRM 라이센스 신청하기
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>SIDLE DRM 특징</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Badge className="bg-green-100 text-green-800">무료</Badge>
                    <div>
                      <h4 className="font-medium">완전 무료</h4>
                      <p className="text-sm text-gray-600">라이센스 비용 없음</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge className="bg-blue-100 text-blue-800">오픈소스</Badge>
                    <div>
                      <h4 className="font-medium">소스코드 공개</h4>
                      <p className="text-sm text-gray-600">투명하고 안전한 솔루션</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge className="bg-purple-100 text-purple-800">AD 연동</Badge>
                    <div>
                      <h4 className="font-medium">Active Directory</h4>
                      <p className="text-sm text-gray-600">기존 사용자 관리 시스템 활용</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge className="bg-orange-100 text-orange-800">실시간</Badge>
                    <div>
                      <h4 className="font-medium">실시간 정책 적용</h4>
                      <p className="text-sm text-gray-600">즉시 보안 정책 반영</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">처리 절차</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</div>
                    <span>신청서 제출</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">2</div>
                    <span>신청 검토 (24시간 이내)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">3</div>
                    <span>라이센스 키 이메일 발송</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">4</div>
                    <span>라이센스 활성화 및 설정</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
