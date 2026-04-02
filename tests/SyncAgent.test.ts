import { describe, it, expect } from 'vitest';
import { SyncAgent, DomainEntity, CodeClassMetadata } from '../src/SyncAgent';

describe('SyncAgent Core Logic', () => {
  const syncAgent = new SyncAgent();

  it('当代码中新增了字段，应产生同步建议', () => {
    // 领域模型定义
    const entity: DomainEntity = {
      id: 'node-model-user',
      name: 'UserEntity',
      fields: ['id', 'username', 'email']
    };

    // 实际的代码类元数据（新增了 phoneNumber）
    const codeMeta: CodeClassMetadata = {
      className: 'User',
      properties: ['id', 'username', 'email', 'phoneNumber']
    };

    const result = syncAgent.sync(entity, codeMeta);

    expect(result).not.toBeNull();
    expect(result?.suggestion).toContain('新增字段：phoneNumber');
    expect(result?.status).toBe('PENDING_REVIEW');
  });

  it('当代码中删除了字段，应产生同步建议', () => {
    const entity: DomainEntity = {
      id: 'node-model-order',
      name: 'OrderEntity',
      fields: ['id', 'orderNo', 'amount', 'currency']
    };

    // 实际的代码类元数据（去掉了 currency）
    const codeMeta: CodeClassMetadata = {
      className: 'Order',
      properties: ['id', 'orderNo', 'amount']
    };

    const result = syncAgent.sync(entity, codeMeta);

    expect(result).not.toBeNull();
    expect(result?.suggestion).toContain('移除字段：currency');
  });

  it('当代码与模型完全一致，不应产生任何同步建议', () => {
    const entity: DomainEntity = {
      id: 'node-model-item',
      name: 'ItemEntity',
      fields: ['id', 'name']
    };

    const codeMeta: CodeClassMetadata = {
      className: 'Item',
      properties: ['id', 'name']
    };

    const result = syncAgent.sync(entity, codeMeta);

    expect(result).toBeNull();
  });
});
