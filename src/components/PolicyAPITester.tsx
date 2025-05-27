
import React, { useState } from 'react';
import { Server, Play, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export const PolicyAPITester = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('evaluate_access');
  const [testUserId, setTestUserId] = useState('user1');
  const [testFilePath, setTestFilePath] = useState('/path/to/file.pdf');
  const [apiResponse, setApiResponse] = useState('');
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      name: 'evaluate_access',
      method: 'POST',
      path: '/api/v1/evaluate-access',
      description: '파일 접근 권한을 평가합니다',
      params: {
        user_id: 'string',
        file_path: 'string',
        db_path: 'string (optional)'
      }
    },
    {
      name: 'load_policies',
      method: 'GET',
      path: '/api/v1/policies',
      description: '활성화된 정책 목록을 조회합니다',
      params: {
        db_path: 'string (optional)'
      }
    },
    {
      name: 'get_user_info',
      method: 'GET',
      path: '/api/v1/users/{user_id}',
      description: '사용자 정보를 조회합니다',
      params: {
        user_id: 'string'
      }
    },
    {
      name: 'get_file_metadata',
      method: 'GET',
      path: '/api/v1/files/metadata',
      description: '파일 메타데이터를 조회합니다',
      params: {
        file_path: 'string'
      }
    }
  ];

  const generateCurlCommand = () => {
    const endpoint = endpoints.find(e => e.name === selectedEndpoint);
    if (!endpoint) return '';

    switch (selectedEndpoint) {
      case 'evaluate_access':
        return `curl -X POST "http://localhost:8000${endpoint.path}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "${testUserId}",
    "file_path": "${testFilePath}",
    "db_path": "policy.db"
  }'`;
      
      case 'load_policies':
        return `curl -X GET "http://localhost:8000${endpoint.path}?db_path=policy.db"`;
      
      case 'get_user_info':
        return `curl -X GET "http://localhost:8000${endpoint.path.replace('{user_id}', testUserId)}"`;
      
      case 'get_file_metadata':
        return `curl -X GET "http://localhost:8000${endpoint.path}?file_path=${encodeURIComponent(testFilePath)}"`;
      
      default:
        return '';
    }
  };

  const generatePythonCode = () => {
    const endpoint = endpoints.find(e => e.name === selectedEndpoint);
    if (!endpoint) return '';

    switch (selectedEndpoint) {
      case 'evaluate_access':
        return `import requests

# DSL 정책 기반 파일 접근 평가
response = requests.post("http://localhost:8000${endpoint.path}", json={
    "user_id": "${testUserId}",
    "file_path": "${testFilePath}",
    "db_path": "policy.db"
})

result = response.json()
print(f"접근 결과: {result['decision']}")
print(f"사유: {result['reason']}")`;

      case 'load_policies':
        return `import requests

# 활성화된 정책 목록 조회
response = requests.get("http://localhost:8000${endpoint.path}", params={
    "db_path": "policy.db"
})

policies = response.json()
print(f"총 {len(policies)} 개의 정책이 활성화되어 있습니다")`;

      case 'get_user_info':
        return `import requests

# 사용자 정보 조회
response = requests.get("http://localhost:8000${endpoint.path.replace('{user_id}', testUserId)}")

user_info = response.json()
print(f"사용자: {user_info['id']}")
print(f"권한등급: {user_info['rank']}")
print(f"조직: {user_info['ou']}")`;

      case 'get_file_metadata':
        return `import requests

# 파일 메타데이터 조회
response = requests.get("http://localhost:8000${endpoint.path}", params={
    "file_path": "${testFilePath}"
})

file_info = response.json()
print(f"파일: {file_info['name']}")
print(f"보안등급: {file_info['rank']}")
print(f"소유자: {file_info['owner_user_id']}")`;

      default:
        return '';
    }
  };

  const testAPI = async () => {
    setApiResponse('API 호출 중...');
    
    setTimeout(() => {
      const mockResponses = {
        evaluate_access: {
          decision: "ALLOW_ALL",
          reason: "사용자 권한등급(3)이 파일 보안등급(2)보다 높음",
          user_info: {
            id: testUserId,
            rank: 3,
            ou: "OU=IT",
            groups: ["Developer", "Admin"]
          },
          file_info: {
            name: testFilePath.split('/').pop(),
            rank: 2,
            ou: "OU=IT",
            is_private: false
          }
        },
        load_policies: [
          {
            policy_id: "POL_IT_001",
            priority: 1,
            is_active: true,
            rules: [
              {
                condition: { "eq": ["file.ou", "OU=IT"] },
                action: { "allow": "read_only" }
              }
            ]
          }
        ],
        get_user_info: {
          id: testUserId,
          rank: 3,
          dn: `CN=${testUserId},OU=IT,DC=company,DC=com`,
          ou: "OU=IT",
          groups: ["Developer", "Admin"]
        },
        get_file_metadata: {
          name: testFilePath.split('/').pop(),
          file_ou: "OU=IT",
          file_rank: 2,
          is_private: false,
          owner_user_id: "admin",
          extension: testFilePath.split('.').pop()
        }
      };

      setApiResponse(JSON.stringify(mockResponses[selectedEndpoint], null, 2));
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            DSL 정책 API 테스트
          </CardTitle>
          <CardDescription>
            FastAPI 기반 DSL 정책 엔진 API를 테스트하고 통합 코드를 생성합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>API 엔드포인트</Label>
              <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {endpoints.map(endpoint => (
                    <SelectItem key={endpoint.name} value={endpoint.name}>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {endpoint.method}
                        </Badge>
                        {endpoint.path}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>설명</Label>
              <p className="text-sm text-muted-foreground">
                {endpoints.find(e => e.name === selectedEndpoint)?.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user-id">사용자 ID</Label>
              <Input
                id="user-id"
                value={testUserId}
                onChange={(e) => setTestUserId(e.target.value)}
                placeholder="user1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file-path">파일 경로</Label>
              <Input
                id="file-path"
                value={testFilePath}
                onChange={(e) => setTestFilePath(e.target.value)}
                placeholder="/path/to/file.pdf"
              />
            </div>
          </div>

          <Button onClick={testAPI} className="w-full">
            <Play className="h-4 w-4 mr-2" />
            API 테스트 실행
          </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>cURL 명령어</CardTitle>
              <Button 
                onClick={() => copyToClipboard(generateCurlCommand())} 
                size="sm" 
                variant="outline"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              {generateCurlCommand()}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Python 코드</CardTitle>
              <Button 
                onClick={() => copyToClipboard(generatePythonCode())} 
                size="sm" 
                variant="outline"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              {generatePythonCode()}
            </pre>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API 응답</CardTitle>
          <CardDescription>
            테스트 실행 결과가 여기에 표시됩니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={apiResponse}
            readOnly
            placeholder="API 테스트를 실행하면 응답이 여기에 표시됩니다"
            className="min-h-[200px] font-mono text-sm"
          />
        </CardContent>
      </Card>

      {/* FastAPI 서버 코드 */}
      <Card>
        <CardHeader>
          <CardTitle>FastAPI 서버 코드</CardTitle>
          <CardDescription>
            아래 코드를 main.py로 저장하고 "uvicorn main:app --reload"로 실행하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto max-h-96">
{`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import uvicorn
from policy_dsl_enum import evaluate_file_access, load_policies, get_user_info, get_file_metadata, prepare_file_context

app = FastAPI(title="DSL 정책 API", version="2.0")

class AccessRequest(BaseModel):
    user_id: str
    file_path: str
    db_path: Optional[str] = "policy.db"

class AccessResponse(BaseModel):
    decision: str
    reason: str
    user_info: Dict[str, Any]
    file_info: Dict[str, Any]

@app.post("/api/v1/evaluate-access", response_model=AccessResponse)
async def evaluate_access(request: AccessRequest):
    try:
        result = evaluate_file_access(request.user_id, request.file_path, request.db_path)
        user_info = get_user_info(request.user_id, request.db_path)
        file_info = get_file_metadata(request.file_path, request.db_path)
        file_info = prepare_file_context(file_info)
        
        return AccessResponse(
            decision=result.value,
            reason=f"정책 평가 결과: {result.value}",
            user_info=user_info,
            file_info=file_info
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/v1/policies")
async def get_policies(db_path: Optional[str] = "policy.db"):
    try:
        policies = load_policies(db_path)
        return policies
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/v1/users/{user_id}")
async def get_user(user_id: str, db_path: Optional[str] = "policy.db"):
    try:
        user_info = get_user_info(user_id, db_path)
        return user_info
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get("/api/v1/files/metadata")
async def get_file_meta(file_path: str, db_path: Optional[str] = "policy.db"):
    try:
        file_info = get_file_metadata(file_path, db_path)
        file_info = prepare_file_context(file_info)
        return file_info
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`}
          </pre>
        </CardContent>
      </Card>

      {/* 설치 및 실행 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>설치 및 실행 가이드</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">1. 필요한 패키지 설치</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm">
pip install fastapi uvicorn
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">2. 서버 실행</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm">
uvicorn main:app --reload --host 0.0.0.0 --port 8000
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">3. API 문서 확인</h4>
            <p className="text-sm text-muted-foreground">
              서버 실행 후 <code>http://localhost:8000/docs</code>에서 Swagger UI를 확인할 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};`}
          </pre>
        </CardContent>
      </Card>

      {/* 설치 및 실행 가이드 */}
      <Card>
        <CardHeader>
          <CardTitle>설치 및 실행 가이드</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">1. 필요한 패키지 설치</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm">
pip install fastapi uvicorn
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">2. 서버 실행</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm">
uvicorn main:app --reload --host 0.0.0.0 --port 8000
            </pre>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">3. API 문서 확인</h4>
            <p className="text-sm text-muted-foreground">
              서버 실행 후 <code>http://localhost:8000/docs</code>에서 Swagger UI를 확인할 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
