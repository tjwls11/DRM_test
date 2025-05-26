
import React, { useState } from 'react';
import { Shield, User, Lock, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [adLoginData, setAdLoginData] = useState({
    domain: '',
    username: '',
    password: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Local login:', loginData);
    // 로그인 로직 구현
  };

  const handleAdLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('AD login:', adLoginData);
    // AD 로그인 로직 구현
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary security-pattern">
      <div className="w-full max-w-md p-6 animate-fade-in">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">DRM Portal</h1>
          <p className="text-gray-300">관리자 인증이 필요합니다</p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-center">관리자 로그인</CardTitle>
            <CardDescription className="text-center">
              총관리자 또는 부서관리자 계정으로 로그인하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="local" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="local">로컬 계정</TabsTrigger>
                <TabsTrigger value="ad">AD 계정</TabsTrigger>
              </TabsList>
              
              <TabsContent value="local">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">사용자명</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="admin"
                        className="pl-10"
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">비밀번호</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    로그인
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="ad">
                <form onSubmit={handleAdLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="domain">도메인</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="domain"
                        type="text"
                        placeholder="company.local"
                        className="pl-10"
                        value={adLoginData.domain}
                        onChange={(e) => setAdLoginData({...adLoginData, domain: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ad-username">사용자명</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="ad-username"
                        type="text"
                        placeholder="user@company.local"
                        className="pl-10"
                        value={adLoginData.username}
                        onChange={(e) => setAdLoginData({...adLoginData, username: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ad-password">비밀번호</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="ad-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={adLoginData.password}
                        onChange={(e) => setAdLoginData({...adLoginData, password: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    AD 로그인
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-400">
          <p>접근 권한이 없으시다면 총관리자에게 문의하세요</p>
        </div>
      </div>
    </div>
  );
};
