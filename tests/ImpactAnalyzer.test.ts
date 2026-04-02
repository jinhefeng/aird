import { describe, it, expect } from 'vitest';
import { ImpactAnalyzer, NodeType, RelationType } from '../src/ImpactAnalyzer';

describe('ImpactAnalyzer Core Logic', () => {
  it('应该能够识别需求变更对直接派生模型的影响', () => {
    // 1. 准备节点数据
    const nodes = [
      { id: 'node-req-auth', type: NodeType.REQUIREMENT, name: '用户认证需求' },
      { id: 'node-model-user', type: NodeType.MODEL, name: 'UserEntity' },
      { id: 'node-contract-api', type: NodeType.CONTRACT, name: 'AuthAPI' }
    ];

    // 2. 准备依赖关系：Requirement <- Model <- Contract
    const edges = [
      { fromId: 'node-model-user', toId: 'node-req-auth', type: RelationType.DERIVES_FROM },
      { fromId: 'node-contract-api', toId: 'node-model-user', type: RelationType.DEPENDS_ON }
    ];

    const analyzer = new ImpactAnalyzer(nodes, edges);

    // 3. 执行分析：从需求节点开始
    const results = analyzer.analyze('node-req-auth');

    // 4. 验证结果
    expect(results).toHaveLength(2);
    
    // 验证第一个影响节点 (Model)
    const modelImpact = results.find(r => r.nodeId === 'node-model-user');
    expect(modelImpact).toBeDefined();
    expect(modelImpact?.impactLevel).toBe('HIGH');
    expect(modelImpact?.relationPath).toBe('REQUIREMENT -> [DERIVES_FROM] -> MODEL');

    // 验证第二个影响节点 (Contract - 级联传播)
    const apiImpact = results.find(r => r.nodeId === 'node-contract-api');
    expect(apiImpact).toBeDefined();
    expect(apiImpact?.impactLevel).toBe('MEDIUM');
    expect(apiImpact?.relationPath).toBe('REQUIREMENT -> [DERIVES_FROM] -> MODEL -> [DEPENDS_ON] -> CONTRACT');
  });

  it('孤立节点变更不应产生任何影响', () => {
    const nodes = [
      { id: 'node-req-help', type: NodeType.REQUIREMENT, name: '帮助文档' }
    ];
    const analyzer = new ImpactAnalyzer(nodes, []);
    const results = analyzer.analyze('node-req-help');
    expect(results).toHaveLength(0);
  });
});
