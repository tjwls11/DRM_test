import React, { useState } from 'react';
import { Building, Server, CheckCircle, AlertCircle } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const RegisterCompany = () => {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'testing' | 'connected'>('disconnected');
  const [licenseInfo] = useState({
    key: 'SIDLE-XXXXX-XXXXX-XXXXX-XXXXX',
    company: 'A컴퍼니',
    activated: '2024-01-15',
    expires: '2025-01-15'
  });
  
  const [adConfig, setAdConfig] = useState({
    serverUrl: '',
    domain: '',
    username: '',
    password: '',
    baseDn: '',
    userFilter: '',
    groupFilter: ''
  });

  const [fieldMapping, setFieldMapping] = useState({
    username: 'sAMAccountName',
    email: 'mail',
    department: 'department',
    displayName: 'displayName',
    title: 'title'
  });

  const handleTestConnection = async () => {
    setConnectionStatus('testing');
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 2000);
  };

  const handleSaveConfig = () => {
    console.log('AD 설정 저장:', { adConfig, fieldMapping });
  };

  const handleSyncUsers = () => {
    console.log('사용자 동기화 시작');
  };

  return (
    <div className="min-h-screen bg-white">
      <Layout userName="홍관리자" userRole="super_admin">
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">회사 등록 & AD 연동</h2>
            <p className="text-gray-600">Active Directory를 연결하여 사용자를 자동으로 관리합니다</p>
          </div>

          {/* 라이센스 정보 카드 */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                라이센스 활성화 완료
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">라이센스 키:</span>
                  <p className="font-mono text-green-700">{licenseInfo.key}</p>
                </div>
                <div>
                  <span className="text-gray-600">회사명:</span>
                  <p className="font-medium text-green-700">{licenseInfo.company}</p>
                </div>
                <div>
                  <span className="text-gray-600">활성화일:</span>
                  <p className="text-green-700">{licenseInfo.activated}</p>
                </div>
                <div>
                  <span className="text-gray-600">만료일:</span>
                  <p className="text-green-700">{licenseInfo.expires}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs defaultValue="connection" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                  <TabsTrigger value="connection" className="data-[state=active]:bg-white">AD 연결</TabsTrigger>
                  <TabsTrigger value="mapping" className="data-[state=active]:bg-white">필드 매핑</TabsTrigger>
                  <TabsTrigger value="sync" className="data-[state=active]:bg-white">동기화</TabsTrigger>
                </TabsList>

                <TabsContent value="connection">
                  <Card className="bg-white shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-800">
                        <Server className="h-5 w-5" />
                        Active Directory 연결 설정
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        회사의 AD 서버에 연결하여 사용자 정보를 가져옵니다
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="server-url" className="text-gray-700">AD 서버 URL</Label>
                          <Input
                            id="server-url"
                            placeholder="ldap://dc.company.com:389"
                            value={adConfig.serverUrl}
                            onChange={(e) => setAdConfig({...adConfig, serverUrl: e.target.value})}
                            className="bg-white border-gray-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="domain" className="text-gray-700">도메인</Label>
                          <Input
                            id="domain"
                            placeholder="company.local"
                            value={adConfig.domain}
                            onChange={(e) => setAdConfig({...adConfig, domain: e.target.value})}
                            className="bg-white border-gray-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-gray-700">관리자 계정</Label>
                          <Input
                            id="username"
                            placeholder="admin@company.local"
                            value={adConfig.username}
                            onChange={(e) => setAdConfig({...adConfig, username: e.target.value})}
                            className="bg-white border-gray-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-gray-700">비밀번호</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={adConfig.password}
                            onChange={(e) => setAdConfig({...adConfig, password: e.target.value})}
                            className="bg-white border-gray-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="base-dn" className="text-gray-700">Base DN</Label>
                        <Input
                          id="base-dn"
                          placeholder="DC=company,DC=local"
                          value={adConfig.baseDn}
                          onChange={(e) => setAdConfig({...adConfig, baseDn: e.target.value})}
                          className="bg-white border-gray-300"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="user-filter" className="text-gray-700">사용자 필터</Label>
                          <Input
                            id="user-filter"
                            placeholder="(&(objectClass=user)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))"
                            value={adConfig.userFilter}
                            onChange={(e) => setAdConfig({...adConfig, userFilter: e.target.value})}
                            className="bg-white border-gray-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="group-filter" className="text-gray-700">그룹 필터</Label>
                          <Input
                            id="group-filter"
                            placeholder="(objectClass=group)"
                            value={adConfig.groupFilter}
                            onChange={(e) => setAdConfig({...adConfig, groupFilter: e.target.value})}
                            className="bg-white border-gray-300"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button 
                          onClick={handleTestConnection}
                          disabled={connectionStatus === 'testing'}
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          {connectionStatus === 'testing' ? '연결 테스트 중...' : '연결 테스트'}
                        </Button>
                        <Button onClick={handleSaveConfig} className="bg-blue-600 hover:bg-blue-700">
                          설정 저장
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="mapping">
                  <Card className="bg-white shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-gray-800">AD 필드 매핑</CardTitle>
                      <CardDescription className="text-gray-600">
                        AD의 사용자 속성을 DRM 시스템의 필드와 매핑합니다
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="map-username" className="text-gray-700">사용자명 필드</Label>
                          <Input
                            id="map-username"
                            value={fieldMapping.username}
                            onChange={(e) => setFieldMapping({...fieldMapping, username: e.target.value})}
                            className="bg-white border-gray-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="map-email" className="text-gray-700">이메일 필드</Label>
                          <Input
                            id="map-email"
                            value={fieldMapping.email}
                            onChange={(e) => setFieldMapping({...fieldMapping, email: e.target.value})}
                            className="bg-white border-gray-300"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="map-department" className="text-gray-700">부서 필드</Label>
                          <Input
                            id="map-department"
                            value={fieldMapping.department}
                            onChange={(e) => setFieldMapping({...fieldMapping, department: e.target.value})}
                            className="bg-white border-gray-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="map-title" className="text-gray-700">직급 필드</Label>
                          <Input
                            id="map-title"
                            value={fieldMapping.title}
                            onChange={(e) => setFieldMapping({...fieldMapping, title: e.target.value})}
                            className="bg-white border-gray-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="map-display" className="text-gray-700">표시명 필드</Label>
                        <Input
                          id="map-display"
                          value={fieldMapping.displayName}
                          onChange={(e) => setFieldMapping({...fieldMapping, displayName: e.target.value})}
                          className="bg-white border-gray-300"
                        />
                      </div>

                      <Button onClick={handleSaveConfig} className="w-full bg-blue-600 hover:bg-blue-700">
                        매핑 설정 저장
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="sync">
                  <Card className="bg-white shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-gray-800">사용자 동기화</CardTitle>
                      <CardDescription className="text-gray-600">
                        AD에서 사용자 정보를 가져와 DRM 시스템에 동기화합니다
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Alert className="border-yellow-200 bg-yellow-50">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-800">
                          동기화 작업은 시간이 오래 걸릴 수 있습니다. 동기화 중에는 다른 작업을 진행하지 마세요.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-800">전체 동기화</h4>
                            <p className="text-sm text-gray-600">
                              모든 AD 사용자를 가져와 새로 등록하거나 정보를 업데이트합니다
                            </p>
                          </div>
                          <Button onClick={handleSyncUsers} className="bg-blue-600 hover:bg-blue-700">
                            전체 동기화 시작
                          </Button>
                        </div>

                        <div className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-800">증분 동기화</h4>
                            <p className="text-sm text-gray-600">
                              변경된 사용자 정보만 업데이트합니다
                            </p>
                          </div>
                          <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                            증분 동기화 시작
                          </Button>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium text-gray-800 mb-2">마지막 동기화 결과</h4>
                        <div className="text-sm space-y-1 text-gray-600">
                          <p>동기화 시간: 2024-01-15 09:00:00</p>
                          <p>처리된 사용자: 148명</p>
                          <p>새로 추가: 3명</p>
                          <p>업데이트: 12명</p>
                          <p>오류: 0건</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              {/* 연결 상태 */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Building className="h-5 w-5" />
                    연결 상태
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">AD 서버</span>
                      {connectionStatus === 'connected' ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          연결됨
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          연결 안됨
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">마지막 동기화</span>
                      <span className="text-xs text-gray-500">
                        2024-01-15 09:00
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">동기화된 사용자</span>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">148명</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 도움말 */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">설정 도움말</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-blue-700">
                  <p>• AD 서버 URL은 LDAP 또는 LDAPS 프로토콜을 사용하세요</p>
                  <p>• Base DN은 사용자가 위치한 최상위 조직 단위입니다</p>
                  <p>• 필드 매핑은 AD의 실제 속성명과 정확히 일치해야 합니다</p>
                  <p>• 동기화는 매일 자동으로 실행됩니다</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
