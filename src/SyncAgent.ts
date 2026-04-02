/**
 * SyncAgent.ts
 * Aird 核心代理：自动同步代理 (SyncAgent)
 */

export interface DomainEntity {
  id: string;
  name: string;
  fields: string[];
}

export interface CodeClassMetadata {
  className: string;
  properties: string[];
}

export interface UpdateSuggestion {
  nodeId: string;
  suggestion: string;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
}

export class SyncAgent {
  /**
   * 对比代码类元数据与领域实体，生成同步建议
   */
  public sync(entity: DomainEntity, codeMeta: CodeClassMetadata): UpdateSuggestion | null {
    // 检查代码中是否有模型中不存在的新字段
    const newFields = codeMeta.properties.filter(p => !entity.fields.includes(p));
    
    // 检查代码中是否删除了模型中存在的字段
    const removedFields = entity.fields.filter(f => !codeMeta.properties.includes(f));

    if (newFields.length === 0 && removedFields.length === 0) {
      return null;
    }

    let suggestionText = `检测到代码类 "${codeMeta.className}" 与领域模型 "${entity.name}" 不一致：`;
    
    if (newFields.length > 0) {
      suggestionText += `\n- 新增字段：${newFields.join(', ')}`;
    }
    
    if (removedFields.length > 0) {
      suggestionText += `\n- 移除字段：${removedFields.join(', ')}`;
    }

    return {
      nodeId: entity.id,
      suggestion: suggestionText,
      status: 'PENDING_REVIEW'
    };
  }
}
