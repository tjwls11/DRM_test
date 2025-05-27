
import React, { useState } from 'react';
import { Plus, Trash2, Save, Code, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface DSLCondition {
  operator: string;
  field: string;
  value: any;
}

interface DSLRule {
  id: string;
  description: string;
  condition: any;
  action: {
    allow?: string;
    deny?: string;
    rank_override?: number | null;
  };
  exception: {
    allowed_users: string[];
    allowed_groups: string[];
    allowed_ous: string[];
    allowed_ranks: number[] | null;
  };
}

interface DSLPolicy {
  policy_id: string;
  policy_type: string;
  target_dn: string;
  target_name: string;
  ldap_filter: string;
  priority: number;
  rules: DSLRule[];
  policy_description: string;
  is_active: boolean;
}

export const DSLPolicyEditor = () => {
  const [policy, setPolicy] = useState<DSLPolicy>({
    policy_id: "",
    policy_type: "OU",
    target_dn: "",
    target_name: "",
    ldap_filter: "",
    priority: 1,
    rules: [],
    policy_description: "",
    is_active: true
  });

  const [currentRule, setCurrentRule] = useState<DSLRule>({
    id: "",
    description: "",
    condition: {},
    action: {
      allow: "",
      deny: "",
      rank_override: null
    },
    exception: {
      allowed_users: [],
      allowed_groups: [],
      allowed_ous: [],
      allowed_ranks: null
    }
  });

  const [conditionBuilder, setConditionBuilder] = useState<DSLCondition[]>([]);
  const [showJsonEditor, setShowJsonEditor] = useState(false);

  const operators = [
    { value: "eq", label: "같음 (==)" },
    { value: "ne", label: "다름 (!=)" },
    { value: "gt", label: "큼 (>)" },
    { value: "ge", label: "크거나 같음 (>=)" },
    { value: "lt", label: "작음 (<)" },
    { value: "le", label: "작거나 같음 (<=)" },
    { value: "in", label: "포함됨 (in)" }
  ];

  const fields = [
    { value: "user.rank", label: "사용자 권한등급" },
    { value: "user.ou", label: "사용자 조직" },
    { value: "user.groups", label: "사용자 그룹" },
    { value: "file.rank", label: "파일 보안등급" },
    { value: "file.ou", label: "파일 조직" },
    { value: "file.extension", label: "파일 확장자" },
    { value: "file.name", label: "파일명" },
    { value: "file.is_private", label: "개인문서 여부" }
  ];

  const addCondition = () => {
    setConditionBuilder([...conditionBuilder, { operator: "eq", field: "user.rank", value: "" }]);
  };

  const updateCondition = (index: number, field: keyof DSLCondition, value: any) => {
    const newConditions = [...conditionBuilder];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setConditionBuilder(newConditions);
  };

  const removeCondition = (index: number) => {
    setConditionBuilder(conditionBuilder.filter((_, i) => i !== index));
  };

  const buildConditionObject = () => {
    if (conditionBuilder.length === 0) return {};
    if (conditionBuilder.length === 1) {
      const cond = conditionBuilder[0];
      return { [cond.operator]: [cond.field, cond.value] };
    }
    return {
      and: conditionBuilder.map(cond => ({ [cond.operator]: [cond.field, cond.value] }))
    };
  };

  const addRule = () => {
    const newRule = {
      ...currentRule,
      id: `rule_${Date.now()}`,
      condition: buildConditionObject()
    };
    setPolicy({
      ...policy,
      rules: [...policy.rules, newRule]
    });
    setCurrentRule({
      id: "",
      description: "",
      condition: {},
      action: { allow: "", deny: "", rank_override: null },
      exception: { allowed_users: [], allowed_groups: [], allowed_ous: [], allowed_ranks: null }
    });
    setConditionBuilder([]);
  };

  const removeRule = (ruleId: string) => {
    setPolicy({
      ...policy,
      rules: policy.rules.filter(rule => rule.id !== ruleId)
    });
  };

  const exportPolicy = () => {
    const policyJson = JSON.stringify(policy, null, 2);
    const blob = new Blob([policyJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `policy_${policy.policy_id || 'new'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const addExceptionItem = (type: 'users' | 'groups' | 'ous', value: string) => {
    if (!value.trim()) return;
    
    const fieldMap = {
      users: 'allowed_users',
      groups: 'allowed_groups',
      ous: 'allowed_ous'
    };
    
    const field = fieldMap[type];
    setCurrentRule({
      ...currentRule,
      exception: {
        ...currentRule.exception,
        [field]: [...currentRule.exception[field], value.trim()]
      }
    });
  };

  const removeExceptionItem = (type: 'users' | 'groups' | 'ous', index: number) => {
    const fieldMap = {
      users: 'allowed_users',
      groups: 'allowed_groups',
      ous: 'allowed_ous'
    };
    
    const field = fieldMap[type];
    const newArray = [...currentRule.exception[field]];
    newArray.splice(index, 1);
    
    setCurrentRule({
      ...currentRule,
      exception: {
        ...currentRule.exception,
        [field]: newArray
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* 정책 기본 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            DSL 정책 편집기
          </CardTitle>
          <CardDescription>
            Domain Specific Language를 사용하여 세밀한 접근 제어 정책을 작성합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="policy-id">정책 ID</Label>
              <Input
                id="policy-id"
                value={policy.policy_id}
                onChange={(e) => setPolicy({...policy, policy_id: e.target.value})}
                placeholder="예: POL_HR_001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="policy-type">정책 유형</Label>
              <Select value={policy.policy_type} onValueChange={(value) => setPolicy({...policy, policy_type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OU">조직 단위 (OU)</SelectItem>
                  <SelectItem value="LDAP_QUERY">LDAP 쿼리</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target-dn">대상 DN</Label>
              <Input
                id="target-dn"
                value={policy.target_dn}
                onChange={(e) => setPolicy({...policy, target_dn: e.target.value})}
                placeholder="예: OU=HR,DC=company,DC=com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">우선순위</Label>
              <Input
                id="priority"
                type="number"
                value={policy.priority}
                onChange={(e) => setPolicy({...policy, priority: Number(e.target.value)})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">정책 설명</Label>
            <Textarea
              id="description"
              value={policy.policy_description}
              onChange={(e) => setPolicy({...policy, policy_description: e.target.value})}
              placeholder="정책의 목적과 적용 범위를 설명하세요"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">정책 활성화</Label>
              <p className="text-sm text-muted-foreground">
                활성화된 정책만 시스템에 적용됩니다
              </p>
            </div>
            <Switch 
              checked={policy.is_active}
              onCheckedChange={(checked) => setPolicy({...policy, is_active: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* 규칙 추가 */}
      <Card>
        <CardHeader>
          <CardTitle>새 규칙 추가</CardTitle>
          <CardDescription>
            조건과 액션을 정의하여 새로운 규칙을 만듭니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rule-description">규칙 설명</Label>
            <Input
              id="rule-description"
              value={currentRule.description}
              onChange={(e) => setCurrentRule({...currentRule, description: e.target.value})}
              placeholder="예: HR 부서 직원만 인사 파일에 접근 가능"
            />
          </div>

          {/* 조건 빌더 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="font-medium">조건 설정</Label>
              <Button onClick={addCondition} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                조건 추가
              </Button>
            </div>

            {conditionBuilder.map((condition, index) => (
              <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                <Select value={condition.field} onValueChange={(value) => updateCondition(index, 'field', value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fields.map(field => (
                      <SelectItem key={field.value} value={field.value}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={condition.operator} onValueChange={(value) => updateCondition(index, 'operator', value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {operators.map(op => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  value={condition.value}
                  onChange={(e) => updateCondition(index, 'value', e.target.value)}
                  placeholder="값 입력"
                  className="flex-1"
                />

                <Button onClick={() => removeCondition(index)} size="sm" variant="ghost">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* 액션 설정 */}
          <div className="space-y-4">
            <Label className="font-medium">액션 설정</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>허용 권한</Label>
                <Select value={currentRule.action.allow || ""} onValueChange={(value) => 
                  setCurrentRule({...currentRule, action: {...currentRule.action, allow: value}})
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read_only">읽기 전용</SelectItem>
                    <SelectItem value="allow_all">모든 권한</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>차단 설정</Label>
                <Select value={currentRule.action.deny || ""} onValueChange={(value) => 
                  setCurrentRule({...currentRule, action: {...currentRule.action, deny: value}})
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deny_all">모든 접근 차단</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>권한 오버라이드</Label>
                <Input
                  type="number"
                  value={currentRule.action.rank_override || ""}
                  onChange={(e) => setCurrentRule({
                    ...currentRule, 
                    action: {...currentRule.action, rank_override: e.target.value ? Number(e.target.value) : null}
                  })}
                  placeholder="임시 권한등급"
                />
              </div>
            </div>
          </div>

          {/* 예외 설정 */}
          <div className="space-y-4">
            <Label className="font-medium">예외 설정</Label>
            
            {(['users', 'groups', 'ous'] as const).map((type) => (
              <div key={type} className="space-y-2">
                <Label>{type === 'users' ? '허용 사용자' : type === 'groups' ? '허용 그룹' : '허용 조직'}</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder={`${type === 'users' ? '사용자 ID' : type === 'groups' ? '그룹명' : 'OU 경로'} 입력`}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addExceptionItem(type, (e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <Button 
                    onClick={() => {
                      const input = document.querySelector(`input[placeholder*="${type === 'users' ? '사용자 ID' : type === 'groups' ? '그룹명' : 'OU 경로'}"]`) as HTMLInputElement;
                      if (input?.value) {
                        addExceptionItem(type, input.value);
                        input.value = '';
                      }
                    }}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentRule.exception[type === 'users' ? 'allowed_users' : type === 'groups' ? 'allowed_groups' : 'allowed_ous'].map((item, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeExceptionItem(type, index)}
                    >
                      {item} ×
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button onClick={addRule} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            규칙 추가
          </Button>
        </CardContent>
      </Card>

      {/* 현재 규칙 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>현재 규칙 목록</CardTitle>
          <CardDescription>
            정의된 규칙들을 확인하고 관리합니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          {policy.rules.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              아직 추가된 규칙이 없습니다.
            </p>
          ) : (
            <div className="space-y-4">
              {policy.rules.map((rule, index) => (
                <div key={rule.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{rule.description || `규칙 ${index + 1}`}</h4>
                    <Button onClick={() => removeRule(rule.id)} size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                      {JSON.stringify(rule.condition, null, 2)}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 저장 및 내보내기 */}
      <div className="flex gap-4">
        <Button onClick={() => console.log('정책 저장:', policy)} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          정책 저장
        </Button>
        <Button onClick={exportPolicy} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          JSON 내보내기
        </Button>
      </div>
    </div>
  );
};
