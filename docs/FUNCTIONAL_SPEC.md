# Aird 平台功能说明书 (Functional Specification)

## 1. 产品定位与目标 (Product Vision)

在 20-30 人的工程化团队中，传统文档（如 Notion, Confluence）极易与代码实现脱节，导致沟通损耗和知识腐蚀。**Aird** 定位为**“下一代 AI 驱动的动态契约与协作中枢”**。

**核心目标：**
将“需求-设计-开发-测试”的完整研发生命周期转化为**可计算、可追溯、可执行的图谱结构**，利用 AI Agents 自动维护共识（Consensus），消除文档过期问题。

---

## 2. 核心架构：研发知识图谱 (Development Knowledge Graph)

Aird 的底层不是单纯的富文本数据库，而是一个关联图谱。项目中的每一个产出物都是图谱中的一个节点（Node）：

1.  **需求节点 (Requirement Node)**：业务目标、用户故事 (User Story)、验收标准。
2.  **设计节点 (Design Node)**：基于 DDD 的领域模型（实体、聚合根、值对象）。
3.  **契约节点 (Contract Node)**：系统间通信协议（OpenAPI, GraphQL, AsyncAPI）。
4.  **实现节点 (Code Node)**：关联到代码仓库中的具体类、方法或模块。
5.  **验证节点 (Test Node)**：可执行的验收测试用例 (BDD/Gherkin)。

**核心逻辑**：任何一个节点的变更，都会通过关系边（Edges）触发对其他节点的影响分析。

---

## 3. 核心流水线与角色协同 (Engineering Pipeline & Collaboration)

Aird 将“Vibe Coding”的直觉转化为工业级的 5 阶段流水线：

### 阶段 1：需求澄清 (Requirement Definition)
*   **人类角色**：产品经理 (PO) 负责输入业务意图并最终确认。
*   **AI Agent (ReqAgent)**：
    *   将自然语言转化为结构化的 `PRD.md` 或 User Story。
    *   自动推演边缘场景 (Edge Cases) 并提示 PO 补充。
*   **输出物**：结构化需求文档，状态变为 `Ready for Design`。

### 阶段 2：领域建模 (Domain Modeling)
*   **人类角色**：架构师/Tech Lead 负责审核模型边界和命名。
*   **AI Agent (ModelAgent)**：
    *   读取需求节点，提取名词和动词，建议 DDD 领域模型。
    *   生成标准化的 `domain.yml`（包含实体、属性、关联关系）。
*   **输出物**：领域模型契约，状态变为 `Ready for Contract`。

### 阶段 3：契约协同 (Contract First)
*   **人类角色**：前后端开发 Lead 共同 Review 接口设计。
*   **AI Agent (SpecAgent)**：
    *   基于 `domain.yml` 自动推导并生成 API 契约（如 `openapi.yaml`）。
    *   自动生成并维护 Mock Server，解除前后端依赖阻塞。
*   **输出物**：API 契约文档，状态变为 `Ready for Implementation/Test`。

### 阶段 4：测试驱动 (Test-Driven Specification)
*   **人类角色**：测试工程师 (QA) 负责补充业务异常流的测试。
*   **AI Agent (TestAgent)**：
    *   根据需求和 API 契约，自动生成 BDD 风格的验收测试脚本（如 Cucumber/Gherkin）。
*   **输出物**：可执行测试规格 `acceptance.feature`。

### 阶段 5：实现与自动同步 (Implementation & Auto-Sync)
*   **人类角色**：开发者 (Dev) 专注复杂业务逻辑的编码。
*   **AI Agent (SyncAgent)**：
    *   **正向**：根据模型和契约生成代码骨架。
    *   **反向（核心）**：监听代码仓库（如 GitHub/GitLab）的提交。如果开发者在代码中修改了核心实体的结构或 API 的入参，SyncAgent 会自动发起一个“文档更新 PR”，提示相关负责人（PO/架构师）文档需要同步。

---

## 4. 关键产品模块 (Key Product Modules)

为了支撑上述流水线，Aird MVP（最小可行性产品）必须包含以下核心模块：

### 4.1 变更影响分析器 (Impact Analyzer)
*   **功能**：当图谱中的任意节点发生变化时，计算“爆炸半径”。
*   **场景**：PO 修改了 PRD 中的一个计费规则，Analyzer 会立刻高亮显示受影响的 `domain.yml`、订单 API 和 相关的测试用例。

### 4.2 双向同步引擎 (Bi-directional Sync Engine)
*   **功能**：打破“文档”与“代码”的物理隔离。
*   **场景**：支持通过 IDE 插件或 Git Webhook 监听代码变更，逆向解析 AST（抽象语法树），对比当前领域的元数据，发现不一致时自动提报 Issue 或 更新建议。

### 4.3 智能评审工作流 (AI-Assisted Review Workflow)
*   **功能**：所有 AI 生成的内容必须经过对应人类角色的批准（Approve）才能流转到下一阶段。
*   **场景**：ModelAgent 提交了新的实体设计，系统会阻断流程，直到架构师点击“确认”。

---

## 5. 交互界面构想 (UI/UX Concepts)

*   **双栏视图**：左侧为人类可读的富文本/图形化文档，右侧为 AI 解析的结构化 Schema / 关联图谱。
*   **依赖高亮**：在阅读需求文档时，点击某个业务术语，悬浮展示其在代码中的定义和关联的测试状态。
*   **对话式微调**：在每个阶段，用户都可以选中特定段落，呼出 AI 侧边栏进行局部修改（例如：“将这里的订单状态增加一个『已退款』枚举”）。
