Feature: 自动同步代理 (SyncAgent) - 代码驱动文档更新

  作为一个研发负责人，当我的一线开发者在 IDE 中修改了核心业务模型（如实体字段）时，
  我希望 Aird 能够自动感知这种“代码侵蚀”，并主动发起一个“文档更新建议”，
  以确保 PRD 和领域模型不会因为代码的快速迭代而失效。

  Background: 预设一份已同步的文档与代码
    Given 存在一个领域模型节点 "UserEntity" (ID: node-model-user)
    And 该模型定义了字段: ["id", "username", "email"]
    And 对应的代码实现类 "User" 也定义了相同的字段: ["id", "username", "email"]

  Scenario: 检测到代码中新增字段并同步至文档
    When 开发者在代码类 "User" 中新增了一个字段 "phoneNumber"
    And SyncAgent 扫描到该代码变更
    Then Aird 应识别出代码与领域模型 "node-model-user" 存在不一致
    And Aird 应自动生成一个 "文档更新建议 (Document Update Suggestion)"
    And 建议内容应包含: "为 UserEntity 增加 phoneNumber 字段"
    And 该建议的状态应标记为 "PENDING_REVIEW" (等待架构师评审)

  Scenario: 代码与文档一致时无需同步
    When 代码类 "User" 未发生结构性变更
    Then SyncAgent 不应生成任何更新建议
