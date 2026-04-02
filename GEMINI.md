# Aird 项目指令规范 (GEMINI.md)

本文件定义了 Aird (下一代 AI 驱动文档协作平台) 的核心开发准则、架构哲学及 AI 协作流程。所有 AI Agent 在参与本项目时必须遵循以下指令。

## 1. 项目概述 (Project Overview)
Aird 旨在将传统的静态文档管理（如 Notion, Confluence）进化为面向“人与 AI”协作的**动态契约平台**。
- **核心理念**: 文档即契约 (Living Documents)，具备可计算、可执行、可溯源的特性。
- **愿景文档**: `docs/VISION.md`

## 2. 研发范式与工作流 (Methodology & Workflow)
项目严格执行 **AI 原生研发范式**，核心逻辑为：**DDD (领域驱动设计) + TDD (测试驱动开发)**。

### 核心阶段 (Critical Phases)
1. **领域建模 (The Brain)**: 优先定义通用语言 (Ubiquitous Language) 和领域模型 Schema。
2. **契约先行 (The Bridge)**: 在实现代码前，必须定义 API Spec (OpenAPI/GraphQL)。
3. **测试规格 (The Guard)**: 基于需求和契约生成 BDD (Gherkin) 和单元测试，确保“红灯”先于“绿灯”。
4. **文档驱动开发 (DD-DD)**: 任何代码变更前，必须先更新相关文档说明书（Functional Spec / Interaction Spec）。

## 3. 关键文件说明 (Key Files)
- `docs/VISION.md`: 项目核心理念与长远目标。
- `docs/AI_NATIVE_WORKFLOW.md`: 详尽的 AI 协作研发流程定义。

## 4. 开发约定 (Development Conventions)
- **通用语言强制性**: 文档、接口定义与代码变量名必须完全一致。
- **知识图谱绑定**: 需求、设计、代码、测试之间需建立可追踪的拓扑关系。
- **禁止直接编码**: 在未获得用户对《功能说明书》或《缺陷分析报告》确认前，严禁修改业务逻辑代码。

## 5. 待办与扩展 (TODOs)
- [ ] 初始化项目结构（`src`, `models`, `tests`）。
- [ ] 定义第一个核心领域模型 Schema (`domain.yml`)。
- [ ] 建立基于 AI 的自动化闭环验证工具链。

---
*注意：本文件由资深架构师 AI 生成，作为项目的 Source of Truth 之一，任何对核心流程的偏离都需向用户预警。*
