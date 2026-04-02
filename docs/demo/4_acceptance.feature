Feature: 创建并版本化需求节点

  Background:
    Given I am authenticated as user "PO_JIN"

  Scenario: 成功创建第一个需求节点
    When I create a node with title "Aird Node Management" and content "# Initial Content"
    Then the status should be 201 Created
    And the node "currentRevision" should be 1
    And the node "status" should be "DRAFT"
    And a Domain Event "NodeCreated" should be emitted

  Scenario: 创建节点失败 - 标题太短
    When I try to create a node with title "Short"
    Then the status should be 400 Bad Request
    And the error message should contain "between 5 and 100 characters"
