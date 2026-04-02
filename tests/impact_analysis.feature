Feature: 研发知识图谱的影响分析 (Impact Analysis)

  作为一个架构师，当需求发生变更时，我希望 Aird 能够自动分析出哪些领域模型和 API 契约受到了波及，
  以便我能及时评估变更成本并通知相关负责人。

  Background: 预设一个已有关联的研发图谱
    Given 存在一个项目 "Aird Core"
    And 存在一个需求节点 "Req_001: 用户认证" (ID: node-req-auth)
    And 存在一个领域模型节点 "Model_001: UserEntity" (ID: node-model-user)
    And 节点 "node-model-user" 显式声明派生自 (DERIVES_FROM) "node-req-auth"

  Scenario: 修改需求内容触发下游影响识别
    When 我更新了需求节点 "node-req-auth" 的内容为 "增加手机号一键登录功能"
    And 我请求对节点 "node-req-auth" 进行影响分析 (Impact Analysis)
    Then 分析结果应包含 1 个受影响节点
    And 受影响节点应包含 "node-model-user"
    And 影响等级 (Impact Level) 应标记为 "HIGH"
    And 影响路径应显示为 "REQUIREMENT -> [DERIVES_FROM] -> MODEL"

  Scenario: 孤立节点变更不产生影响
    Given 存在一个孤立的需求节点 "Req_002: 帮助文档" (ID: node-req-help)
    When 我更新了需求节点 "node-req-help" 的内容
    And 我请求对节点 "node-req-help" 进行影响分析
    Then 分析结果应为空 (No impacted nodes)
