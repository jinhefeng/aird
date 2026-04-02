/**
 * ImpactAnalyzer.ts
 * Aird 核心引擎：研发知识图谱影响分析器
 */

export enum NodeType {
  REQUIREMENT = 'REQUIREMENT',
  MODEL = 'MODEL',
  CONTRACT = 'CONTRACT',
  TEST = 'TEST',
  CODE = 'CODE'
}

export enum RelationType {
  DERIVES_FROM = 'DERIVES_FROM',
  DEPENDS_ON = 'DEPENDS_ON',
  VERIFIES = 'VERIFIES',
  IMPLEMENTS = 'IMPLEMENTS'
}

export interface KnowledgeNode {
  id: string;
  type: NodeType;
  name: string;
}

export interface DependencyEdge {
  fromId: string; // 下游节点（依赖者）
  toId: string;   // 上游节点（被依赖者/源头）
  type: RelationType;
}

export interface ImpactedNode {
  nodeId: string;
  nodeName: string;
  impactLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  relationPath: string;
}

export class ImpactAnalyzer {
  private nodes: Map<string, KnowledgeNode> = new Map();
  private edges: DependencyEdge[] = [];

  constructor(nodes: KnowledgeNode[], edges: DependencyEdge[]) {
    nodes.forEach(n => this.nodes.set(n.id, n));
    this.edges = edges;
  }

  /**
   * 分析指定节点变更后的影响半径
   * 采用广度优先搜索 (BFS) 遍历依赖图
   */
  public analyze(startNodeId: string): ImpactedNode[] {
    const impacted: ImpactedNode[] = [];
    const visited = new Set<string>();
    const startNode = this.nodes.get(startNodeId);

    if (!startNode) return [];

    // 初始队列，存储当前节点 ID 和已走过的路径
    const queue: { id: string; path: string }[] = [{ 
      id: startNodeId, 
      path: startNode.type 
    }];
    visited.add(startNodeId);

    while (queue.length > 0) {
      const current = queue.shift()!;
      
      // 寻找所有“指向”当前节点的边（即依赖于当前节点的下游节点）
      // 在我们的定义中：fromId (下游) -> toId (上游)
      const downstreamEdges = this.edges.filter(e => e.toId === current.id);
      
      for (const edge of downstreamEdges) {
        if (!visited.has(edge.fromId)) {
          visited.add(edge.fromId);
          const node = this.nodes.get(edge.fromId);
          
          if (node) {
            const newPath = `${current.path} -> [${edge.type}] -> ${node.type}`;
            impacted.push({
              nodeId: node.id,
              nodeName: node.name,
              impactLevel: this.calculateImpactLevel(edge.type, node.type),
              relationPath: newPath
            });
            // 继续向下游传播影响
            queue.push({ id: node.id, path: newPath });
          }
        }
      }
    }

    return impacted;
  }

  /**
   * 根据关系类型和目标节点类型简单估算影响等级
   */
  private calculateImpactLevel(rel: RelationType, targetType: NodeType): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    if (rel === RelationType.VERIFIES) return 'CRITICAL'; // 测试验证失败
    if (rel === RelationType.DERIVES_FROM) return 'HIGH'; // 直接派生关系
    if (targetType === NodeType.CONTRACT || targetType === NodeType.CODE) return 'MEDIUM'; // 接口或代码波及
    return 'LOW';
  }
}
