
import React from 'react';
import { Shield, FileCheck, Users, Lock, ArrowRight, CheckCircle, Github, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "강력한 보안",
      description: "파일 암호화 및 접근 제어로 기업 데이터를 안전하게 보호합니다."
    },
    {
      icon: FileCheck,
      title: "정책 기반 관리",
      description: "DSL을 활용한 세밀한 정책 설정으로 파일 접근을 제어합니다."
    },
    {
      icon: Users,
      title: "사용자 권한 관리",
      description: "조직 구조에 맞는 권한 체계로 효율적인 관리가 가능합니다."
    },
    {
      icon: Lock,
      title: "실시간 모니터링",
      description: "파일 접근 현황을 실시간으로 모니터링하고 감사할 수 있습니다."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Shield Gate DRM</span>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => window.open('https://github.com/your-username/shield-gate-drm', '_blank')}
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button 
                onClick={() => navigate('/login')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                로그인
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              Open Source DRM Solution
            </Badge>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Star className="h-4 w-4" />
              <span>오픈소스 프로젝트</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            오픈소스 디지털
            <br />
            <span className="text-blue-600">권한 관리 솔루션</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            DSL 기반의 정책 엔진으로 파일 접근을 세밀하게 제어하고,
            실시간 모니터링으로 기업의 중요한 데이터를 안전하게 보호하는 오픈소스 프로젝트입니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => window.open('https://github.com/your-username/shield-gate-drm', '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub에서 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/login')}
              className="text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              데모 체험하기
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              왜 Shield Gate DRM을 선택해야 할까요?
            </h2>
            <p className="text-xl text-gray-600">
              기업의 디지털 자산을 보호하는 핵심 기능들
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                DSL 기반 정책 엔진으로
                <br />
                정밀한 접근 제어
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Domain Specific Language를 활용하여 복잡한 비즈니스 규칙을 
                간단하고 직관적으로 표현할 수 있습니다.
              </p>
              
              <div className="space-y-4">
                {[
                  "사용자 권한과 파일 보안등급 기반 접근 제어",
                  "조직 구조(OU) 및 그룹 기반 정책 적용",
                  "실시간 정책 업데이트 및 적용",
                  "상세한 접근 로그 및 감사 기능"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 text-white">
              <div className="text-sm text-gray-400 mb-2">예시 DSL 정책</div>
              <pre className="text-sm overflow-x-auto">
{`{
  "condition": {
    "and": [
      {"eq": ["file.ou", "OU=HR"]},
      {"ge": ["user.rank", "file.rank"]},
      {"in": ["user.groups", ["HR_Admin"]]}
    ]
  },
  "action": {
    "allow": "read_only"
  },
  "exception": {
    "allowed_users": ["hr_manager"]
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            오픈소스로 함께 만들어가요
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            GitHub에서 프로젝트에 기여하고 커뮤니티와 함께 발전시켜나가세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => window.open('https://github.com/your-username/shield-gate-drm', '_blank')}
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub에서 기여하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/login')}
              className="text-white border-white hover:bg-white/10"
            >
              데모 둘러보기
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Shield className="h-6 w-6" />
            <span className="text-lg font-semibold">Shield Gate DRM</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Shield Gate DRM. MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
