# Aird 平台研发任务清单 (tasks.md)

本文件用于追踪 Aird (下一代 AI 驱动文档协作平台) 的研发进度。

## 1. 战略与定义 (Strategy & Definition) - [100%]
- [x] **愿景确立**: 定义“面向 AI 的文档协作”核心理念 (`docs/VISION.md`)。
- [x] **研发范式**: 确立 DDD + TDD 的 AI 原生研发流程 (`docs/AI_NATIVE_WORKFLOW.md`)。
- [x] **指令规范**: 生成 AI 协作最高准则 (`GEMINI.md`)。
- [x] **功能说明书**: 完成面向 20-30 人团队的工业级功能定义 (`docs/FUNCTIONAL_SPEC.md`)。

## 2. 核心架构与模型 (Architecture & Modeling) - [90%]
- [x] **元模型定义**: 完成 Aird 核心元数据模型 (`models/core_domain.yml`)。
- [x] **API 契约**: 定义核心 OpenAPI 规范 (`contracts/core_api.yaml`)。
- [x] **演示原型 (Demo)**: 完成全流程演示项目 (Requirement -> Model -> Spec -> Test -> Code) (`docs/demo/`)。
- [ ] **存储设计**: 设计持久化数据库 Schema (PostgreSQL/Neo4j) 以存储知识图谱。

## 3. 核心引擎开发 (Core Engine) - [70%]
- [x] **影响分析器 (Impact Analyzer)**:
    - [x] 实现 BFS 图遍历算法。
    - [x] 实现影响路径追踪与等级计算。
    - [x] 通过单元测试 (`tests/ImpactAnalyzer.test.ts`)。
- [x] **自动同步代理 (SyncAgent)**:
    - [x] 实现代码元数据与领域实体的对比逻辑。
    - [x] 实现同步建议生成机制。
    - [x] 通过单元测试 (`tests/SyncAgent.test.ts`)。
- [ ] **代码解析器 (Code Parser)**:
    - [ ] 实现针对 TypeScript/Java 的 AST (抽象语法树) 解析。
    - [ ] 提取类名、属性、装饰器等元数据。
- [ ] **Git 集成**: 实现基于 Webhook 的代码变更监听与 PR 自动发起。

## 4. 后端服务 (Backend Services) - [10%]
- [x] **环境初始化**: 完成 Node.js + TS + Vitest 环境配置。
- [ ] **API 实现**: 基于 Fastify/Express 实现 `core_api.yaml` 中的路由。
- [ ] **Agent 编排**: 集成 LLM (如 Gemini API) 驱动 ReqAgent, ModelAgent 等。
- [ ] **权限与 Workspace**: 实现多租户隔离与角色访问控制 (RBAC)。

## 5. 前端控制台 (Frontend Dashboard) - [0%]
- [ ] **脚手架搭建**: 初始化 React + Tailwind CSS 项目。
- [ ] **知识图谱可视化**: 实现基于 Canvas/SVG 的研发依赖图展示。
- [ ] **协作工作流视图**: 实现“审批/回退”的卡片式协作界面。
- [ ] **实时预览**: 实现 Markdown 文档与 Schema 定义的同屏预览。

## 6. 测试与交付 (Testing & Deployment) - [20%]
- [x] **BDD 测试框架**: 完成基于 Gherkin 的验收规格定义 (`tests/*.feature`)。
- [ ] **集成测试**: 完成从 API 到 核心引擎的端到端测试。
- [ ] **CI/CD**: 配置 GitHub Actions 自动运行测试并部署预览版。

---

## 下一阶段工作重点 (Immediate Next Steps)
1. **持久化层**: 实现数据库接口，让知识图谱能够真正存储并在重启后恢复。
2. **代码解析引擎**: 将 `SyncAgent` 从“模拟元数据对比”升级为“真实代码文件扫描”。
3. **前端原型**: 搭建第一个界面，让“影响分析”的结果能够以可视化图表的形式展示。

---
*注：本文件由 AI 架构师生成，作为项目的动态进度表，请随研发进展实时更新。*
