---
description: Workflow for comprehensive code review post-implementation. Evaluates work against architecture, clean code, design guidelines, and security practices. Enforces zero-tolerance for errors (Lint, TSC, Tests) with immediate fixes.
---

# /code-review - Post-Implementation Verification

$ARGUMENTS

---

> 🔴 **CRITICAL INSTRUCTION:** BEFORE EXECUTING THIS WORKFLOW, YOU MUST ALWAYS READ AND STRICTLY FOLLOW THE ARCHITECTURE AND CLEAN CODE GUIDELINES DEFINED IN `@[docs/rules/CLEAN_CODE.md]`, `@[.agent/rules/CONVENTIONS.md]`, `@[.agent/rules/API_SECURITY.md]`, `@[docs/rules/FORM_VALIDATION.md]`, `@[.agent/rules/TSX_SCREEN_RULES.md]`, `@[docs/rules/DESIGN_PATTERNS.md]`. THIS IS A HIGH-PRIORITY MANDATORY INSTRUCTION.

--- 

## 🛡️ THE "FIX IMMEDIATELY" RULE (HIGH PRIORITY)

> 🔴 **ABSOLUTE RULE:** If you encounter ANY error from `lint`, `TypeScript (tsc)`, or `unit tests (vitest)`, you **MUST** fix it immediately. 
> 
> **It does NOT matter if the error was caused by your current changes or if it already existed in the project.** If you find a broken state, you are responsible for fixing it before proceeding with the review. "It was already there" is NOT an excuse.

---

## Context Parameters

This workflow expects the following parameters to be provided in the context automatically:

- **`task`** (string, mandatory): The analytical task or question for the architect/reviewer.
- **`relevantFiles`** (list of strings, mandatory): Full paths of the files to analyze.
- **`responsibility`** (string, default "evaluate_task"): Focus area - "debug", "plan", or "evaluate_task".
- **`includeGitDiff`** (bool, default false): Include the current uncommitted git diff.
- **`relevantGitCommits`** (string, optional): Git commit range to analyze (e.g., "HEAD~3..HEAD").

### Responsibilities

| Type | Description |
|------|-------------|
| **evaluate_task** | Evaluate completed or in-progress work against objectives. |
| **plan** | Create implementation plans with task breakdown and sequencing. |
| **debug** | Root cause analysis, reproduction steps, and recommended fixes. |

---

## 🔴 ENFORCEMENT: Why This Workflow Exists

The AI has a tendency to SKIP individual skill evaluations and produce a generic "all pass" report without actually reading the skill files. **This is unacceptable.**

This workflow enforces step-by-step execution with **parallel batching** where safe. Each step has an explicit action and a verification gate.

> 🔴 **VIOLATION:** Producing a review report WITHOUT having read EACH SKILL.md file = FAILED workflow.
> 🔴 **VIOLATION:** Skipping ANY of the integrity checks (lint, tsc, vitest) at any gate = FAILED workflow.
> 🔴 **VIOLATION:** Leaving existing errors unfixed ("it's not my change") = FAILED workflow.
> 🔴 **VIOLATION:** Marking a skill as "N/A" WITHOUT reading its SKILL.md first = FAILED workflow.
> 🔴 **VIOLATION:** Skipping ANY of the 6 project rule files = FAILED workflow.
> 🔴 **VIOLATION:** Skipping execution of ANY applicable skill script = FAILED workflow.
> 🔴 **VIOLATION:** Not validating code against rule document checklists = FAILED workflow.
> 🔴 **VIOLATION:** Skipping ANY of the mandatory scripts (Batches 1-3) = FAILED workflow.

---

## ⚡ Parallel Execution Strategy

> Uses `@[skills/parallel-agents]` patterns to maximize throughput while keeping strict gates.

### Dependency Graph

```
Step 0 (Global Integrity Gate)         ─── SEQUENTIAL (blocker)
    │
    ▼
Step 1 + Step 2                        ─── PARALLEL (context gathering + project rules)
    │
    ▼
Step 2.5 (Code-Level Rule Validation)  ─── SEQUENTIAL (applies rules to code)
    │
    ▼
Step 3 (Groups A+B+C+D)               ─── PARALLEL within groups
    │
    ▼
Step 3B (Mandatory Script Execution)   ─── PARALLEL (all applicable scripts)
    │
    ▼
Step 4 (Final Health Check)            ─── SEQUENTIAL (blocker)
    │
    ▼
Step 5 (report)                        ─── SEQUENTIAL (synthesis)
```

---

## Execution Steps

### Step 0: Global Integrity Gate 🚦 `[SEQUENTIAL]`

> 🔴 **MANDATORY FIRST ACTION.** Do this BEFORE any analysis. 
> 🔴 **FIX ALL ERRORS IMMEDIATELY.** Even if they are unrelated to your task.

**In sequence, run and verify:**

1. **Linting:**
   ```bash
   npm run lint
   ```
   - If fails → Fix all errors (use `npm run lint:fix` if available).

2. **Type Checking:**
   ```bash
   npm run typecheck
   ```
   - If fails → Fix all TypeScript errors.

3. **Unit Tests:**
   ```bash
   npm run test
   ```
   - If fails → Fix all failing tests in the project.

**Gate:** All three commands must exit 0 before continuing.

---

---

### Step 1 + Step 2: Context Gathering + Project Rules `[PARALLEL]`

> ⚡ These two steps have NO dependency on each other. Execute all tool calls in a **single parallel batch**.

**In ONE parallel tool call batch, do ALL of the following:**

1. **Context Gathering:**
   - If `includeGitDiff` is true → `run_command: git diff`
   - If `relevantGitCommits` is provided → `run_command: git log <range>`
   - `list_dir` to discover all files in `relevantFiles` directories
   - `view_file` for ALL files listed in `relevantFiles` (up to 5 per batch)

2. **🔴 Project Rules — MANDATORY (6 parallel reads):**

   > 🔴 **STOP. You MUST read ALL 6 files below using `view_file`.**

   | # | File Path | Contains |
   |---|-----------|----------|
   | 1 | `.agent/rules/CONVENTIONS.md` | Code style, naming, file organization, commit conventions, Inngest patterns |
   | 2 | `docs/rules/CLEAN_CODE.md` | DDD layers (Delivery/Domain/Infrastructure), architectural rules, component structure |
   | 3 | `docs/rules/FORM_VALIDATION.md` | Form validation patterns (Pattern A/B), Zod schema placement, error handling |
   | 4 | `.agent/rules/API_SECURITY.md` | API security rules, authentication, authorization, input validation |
   | 5 | `.agent/rules/TSX_SCREEN_RULES.md` | TSX screen rules, component patterns, design tokens, i18n |
   | 6 | `docs/rules/DESIGN_PATTERNS.md` | DDD patterns, dependency injection, composition |

**Gate:** All relevant files AND **all 6 rule files** must be loaded. Log the following before continuing:
```
✅ Context loaded
✅ CONVENTIONS.md loaded
✅ CLEAN_CODE.md loaded  
✅ FORM_VALIDATION.md loaded
✅ API_SECURITY.md loaded
✅ TSX_SCREEN_RULES.md loaded
✅ DESIGN_PATTERNS.md loaded
```

---

### Step 2.5: Code-Level Rule Validation Gate 🔍 `[SEQUENTIAL]`

> 🔴 **MANDATORY.** After reading all 6 rule documents, you MUST apply their checklists against the `relevantFiles`. Use `grep_search` and `view_file` to verify each item.

#### Checklist 1: CLEAN_CODE.md Validation

For EACH file in `relevantFiles`, verify:

| # | Rule | How to Check |
|---|------|-------------|
| 1 | No `any` type usage | `grep_search` for `: any`, `as any`, `<any>` in relevantFiles |
| 2 | No `Record<string, any>` | `grep_search` for `Record<string, any>` |
| 3 | Files ≤ 350 LOC | `view_file` → check total lines |
| 4 | No magic strings | `grep_search` for literal strings in `step.run()`, query keys, status comparisons |
| 5 | SRP — functions ≤ 20 lines | `view_file` → check function line ranges |
| 6 | DDD layers respected | Verify no `@/generated/prisma/*` direct imports in Client Components or Delivery layer `.tsx` files. DB access only via `@/lib/db` in repositories. |
| 7 | Zod validation at boundaries | Check API routes for Zod `.parse()` / `.safeParse()` on inputs |
| 8 | No over-fetching | `grep_search` for `findMany()` / `findFirst()` without `select` clause in API route handlers |

#### Checklist 2: CONVENTIONS.md Validation

| # | Rule | How to Check |
|---|------|-------------|
| 1 | File naming: kebab-case | Verify all file names in `relevantFiles` use kebab-case |
| 2 | Components: PascalCase export | `view_file` → check export names |
| 3 | Imports organized: external → internal → types | `view_file` top of each file |
| 4 | Inngest STEPS constant | If Inngest file: verify `const STEPS = { ... } as const` exists |
| 5 | No hardcoded step names | `grep_search` for `step.run('` (literal string) in Inngest files |
| 6 | No native Math/toFixed for money | `grep_search` for `\.toFixed\(` or `Math\.` without `// eslint-disable-next-line no-restricted-properties` |
| 7 | Routing & URLs in English | Verify page routes (/app/), API paths (/api/), and navigation links are exclusively in English |
| 8 | AI Knowledge Base (RAG) Sync | If business logic, APIs, or integrations changed (e.g. Stripe, WhatsApp, HeyGen), verify if the corresponding markdown files in `docs/kb/` were updated |
| 9 | API Cost tracking (Financial Control) | If a new or modified external API/integration exists, verify it implements the cost-tracking providers and DB logging as defined in CLEAN_CODE.md Section 12 |
| 10 | Prisma Migrations for DB changes | If `prisma/schema.prisma` was modified, verify that a corresponding migration folder and `migration.sql` was created under `prisma/migrations/` and is being committed together. Direct schema updates (`db push`) are strictly forbidden. |
| 11 | Clerk Mock Agent Login Sync | If a new user role/type (e.g., SpotVideo) or test scenario is introduced, verify that `src/app/api/test/agent-login/` is updated and documented in CONVENTIONS.md |
| 12 | SUPER_ADMIN mock verification | Verify that SUPER_ADMIN mock session and dynamic DB provisioning is functional and redirects correctly |
| 13 | SpotVideo merge fallback | Verify that client-side video merging falls back to single-threaded st build when SharedArrayBuffer is disabled |






#### Checklist 3: TSX_SCREEN_RULES.md Validation (only for .tsx files)

| # | Rule | How to Check |
|---|------|-------------|
| 1 | shadcn/ui used (no native `<table>`, `<dialog>`) | `grep_search` for `<table`, `<dialog` in .tsx files |
| 2 | Server Actions or SWR used (no untyped direct fetch) | Check that client fetches use SWR and state changes use Server Actions (no raw `fetch()` without try-catch or type definition) |
| 3 | `cursor-pointer` on interactive elements | `grep_search` for `<Button` without `cursor-pointer` |
| 4 | 4 UI states handled (error, loading, empty, data) | `view_file` → check for `isLoading`, `error`, empty array checks |
| 5 | i18n via `useT()` | `grep_search` for hardcoded UI strings in JSX |
| 6 | Mobile-first CSS | `grep_search` for `max-md:` or `max-sm:` (desktop-first violations) |
| 7 | Design tokens (no hardcoded colors) | `grep_search` for `bg-red-`, `bg-blue-`, `text-white`, `text-black`, `bg-[#` |
| 8 | Glass classes used | `grep_search` for `backdrop-blur` with raw bg transparency (should use `.glass` or `.glass-strong` classes) |
| 9 | `page.tsx` is thin wrapper | If page.tsx in relevantFiles: verify ≤ 5 lines |
| 10 | Zod schemas NOT in .tsx | `grep_search` for `z.object(` or `z.string()` in .tsx files |
| 11 | `AdaptiveModal` instead of `Dialog` | `grep_search` for direct `<Dialog` imports in mobile-facing components |
| 12 | Cancel button in form dialogs | `grep_search` for `DialogFooter` → verify Cancel button exists |
| 13 | `<FormattedCurrency>` for money UI | `grep_search` for manual `Intl.NumberFormat` or `toFixed()` inside components rendering values |
| 14 | Screen Spec created for new routes | If `page.tsx` is new or modified: check if `docs/kb/common/screens/<name>.md` exists |
| 15 | Unique descriptive HTML IDs used | `grep_search` for `btn-`, `input-`, `select-`, `tab-` in JSX; verify they match those in the Screen Spec |
| 16 | Onboarding visual contrast rules met | Check that popover elements like prev-btn (slate-300), progress-text, close-btn (slate-400) maintain AA level contrast |
| 17 | No active element elevated z-index that blocks transparency | Verify no forced z-index: 100000 or position relative on driver.js active elements to preserve SVG cutout transparency |

#### Checklist 4: FORM_VALIDATION.md Validation

| # | Rule | How to Check |
|---|------|-------------|
| 1 | Zod schema as Single Source of Truth | Verify schemas in `src/lib/validators/` or `types.ts`, not in .tsx |
| 2 | `*.validation.ts` co-located | Check form components have co-located validation files |
| 3 | Inline errors (no toast for form errors) | `grep_search` for `toast.error` inside form submit handlers |
| 4 | `onBlur` validation pattern | Check for `onBlur` handlers in form fields |

#### Checklist 5: API_SECURITY.md Validation

| # | Rule | How to Check |
|---|------|-------------|
| 1 | Input validated with Zod in API routes | Check all `POST`/`PATCH`/`PUT` handlers for Zod validation |
| 2 | No mass assignment | Verify destructured/picked fields, not `...body` spread |
| 3 | No data leaks (selected columns only) | Check API responses for column selection |
| 4 | Session/role verification in admin routes | `grep_search` for auth checks in admin API routes |
| 5 | No hardcoded secrets | `grep_search` for API keys, tokens, passwords as string literals |

#### Checklist 6: DESIGN_PATTERNS.md Validation

| # | Rule | How to Check |
|---|------|-------------|
| 1 | Dependency Injection used | Check service functions accept dependencies as params |
| 2 | Composition over inheritance | No class inheritance chains |
| 3 | Domain services pure | Verify domain services have no framework imports |

**Gate:** All applicable checklists must be evaluated. Record findings (✅ pass / ❌ violation / ⚪ N/A or justified deviation) for each item. Violations found here MUST be added to the final report.

---

### Step 3: Skill-by-Skill Evaluation (12 Skills) `[PARALLEL BATCHES]`

> 🔴 **CRITICAL: For EACH skill below, you MUST:**
> 1. **READ** the SKILL.md file using `view_file` tool
> 2. **APPLY** its checklist/rules to the `relevantFiles`
> 3. **RECORD** findings (pass/fail/N/A with justification)

#### ⚡ Parallel Batch Strategy (up to 5 concurrent `view_file` calls)

**Batch 1:** `architecture`, `database-design`, `nodejs-best-practices`, `clean-code`, `code-review-checklist`
**Batch 2:** `lint-and-validate`, `vulnerability-scanner`, `frontend-design`, `nextjs-react-expert`, `tailwind-patterns`
**Batch 3:** `web-design-guidelines`, `i18n-localization`

**Gate:** All 12 skills must have findings recorded before continuing.

---

### Step 3B: Mandatory Script Execution 🔧 `[PARALLEL]`

> 🔴 **MANDATORY.** After completing skill evaluations, you MUST execute ALL applicable scripts below. Scripts that require a URL or specific context (marked CONDITIONAL) must be run if the context is available.

#### ⚡ Execute ALL applicable scripts in parallel batches:

**Batch 1 — Always Run (Core):**

```bash
# 1. Security Scan
python .agent/skills/vulnerability-scanner/scripts/security_scan.py .

# 2. Lint Runner
python .agent/skills/lint-and-validate/scripts/lint_runner.py .

# 3. Type Coverage
python .agent/skills/lint-and-validate/scripts/type_coverage.py .

# 4. Test Runner
python .agent/skills/testing-patterns/scripts/test_runner.py .
```

**Batch 2 — Always Run (Quality):**

```bash
# 5. UX Audit
python .agent/skills/frontend-design/scripts/ux_audit.py .

# 6. Accessibility Checker
python .agent/skills/frontend-design/scripts/accessibility_checker.py .

# 7. API Validator
python .agent/skills/api-patterns/scripts/api_validator.py .

# 8. Schema Validator
python .agent/skills/database-design/scripts/schema_validator.py .
```

**Batch 3 — Always Run (Content & i18n):**

```bash
# 9. i18n Checker
python .agent/skills/i18n-localization/scripts/i18n_checker.py .

# 10. SEO Checker
python .agent/skills/seo-fundamentals/scripts/seo_checker.py .

# 11. GEO Checker
python .agent/skills/geo-fundamentals/scripts/geo_checker.py .

# 12. React Performance Checker
python .agent/skills/nextjs-react-expert/scripts/react_performance_checker.py .
```

**Batch 4 — CONDITIONAL (require URL or specific context):**

```bash
# 13. Lighthouse Audit (requires running dev server URL)
python .agent/skills/performance-profiling/scripts/lighthouse_audit.py <url>

# 14. Playwright E2E (requires running dev server URL)
python .agent/skills/webapp-testing/scripts/playwright_runner.py <url>

# 15. Mobile Audit (only if mobile components changed)
python .agent/skills/mobile-design/scripts/mobile_audit.py .
```

#### 🔴 Script Output Handling Protocol (READ → SUMMARIZE → RECORD)

**For EACH script executed, you MUST:**

1. **Run the script** and capture ALL output
2. **Parse the output** — identify errors, warnings, and passes
3. **Record in report** using this format:

```markdown
### Script: [script_name.py]
| Metric | Value |
|--------|-------|
| Status | ✅ PASS / ❌ FAIL / ⚠️ WARNINGS |
| Errors | X items |
| Warnings | Y items |
| Passed | Z items |

**Critical findings:**
- [File:Line] Description
```

4. **If errors found** → Fix immediately per "FIX IMMEDIATELY" rule
5. **After fixing** → Re-run script to confirm fix

> 🔴 **VIOLATION:** Running a script and ignoring its output = FAILED workflow.
> 🔴 **VIOLATION:** Not executing an applicable script = FAILED workflow.
> 🔴 **VIOLATION:** Marking a script as "skipped" without justification = FAILED workflow.

**Gate:** ALL 12 mandatory scripts (Batch 1-3) must have results recorded. Conditional scripts (Batch 4) must have results OR explicit justification for skipping.

---

### Step 4: Final Health Check 🚦 `[SEQUENTIAL]`

> 🔴 **MANDATORY.** Run AFTER all fixes applied during review to ensure zero regressions and zero remaining debt.

**Run in sequence:**
1. `npm run lint`
2. `npm run typecheck`
3. `npm run test`

**Gate:** All integrity checks must exit 0 before generating the report.

---

### Step 5: Generate Code Review Report `[SEQUENTIAL — Synthesis]`

Output a structured Markdown report with this EXACT format:

```markdown
# Code Review Report

## 🛡️ Global Health Status
| Check | Status | Action Taken |
|---|---|---|
| Lint (`npm run lint`) | ✅/❌ | (e.g., "Fixed 3 pre-existing errors") |
| TypeScript (`tsc --noEmit`) | ✅/❌ | (e.g., "All clean") |
| Unit Tests (`vitest run`) | ✅/❌ | (e.g., "Fixed 1 failing legacy test") |

## 📋 Project Rules Compliance (6 Documents)
| # | Rule File | Status | Violations Found | Action Taken |
|---|-----------|--------|------------------|--------------|
| 1 | CONVENTIONS.md | ✅/❌ | (list or "None") | (fixes applied) |
| 2 | CLEAN_CODE.md | ✅/❌ | (list or "None") | (fixes applied) |
| 3 | FORM_VALIDATION.md | ✅/⚪ N/A | (list or "None") | (fixes applied) |
| 4 | API_SECURITY.md | ✅/❌ | (list or "None") | (fixes applied) |
| 5 | TSX_SCREEN_RULES.md | ✅/❌ | (list or "None") | (fixes applied) |
| 6 | DESIGN_PATTERNS.md | ✅/❌ | (list or "None") | (fixes applied) |

### Code-Level Rule Violations Detail
> List each violation found during Step 2.5 with file, line, rule, and fix applied.

| File | Line | Rule Document | Violation | Fix Applied |
|------|------|---------------|-----------|-------------|
| ... | ... | ... | ... | ... |

## 🔧 Script Execution Results (Mandatory)
| # | Script | Skill | Status | Errors | Warnings | Passed |
|---|--------|-------|--------|--------|----------|--------|
| 1 | `security_scan.py` | vulnerability-scanner | ✅/❌ | X | Y | Z |
| 2 | `lint_runner.py` | lint-and-validate | ✅/❌ | X | Y | Z |
| 3 | `type_coverage.py` | lint-and-validate | ✅/❌ | X | Y | Z |
| 4 | `test_runner.py` | testing-patterns | ✅/❌ | X | Y | Z |
| 5 | `ux_audit.py` | frontend-design | ✅/❌ | X | Y | Z |
| 6 | `accessibility_checker.py` | frontend-design | ✅/❌ | X | Y | Z |
| 7 | `api_validator.py` | api-patterns | ✅/❌ | X | Y | Z |
| 8 | `schema_validator.py` | database-design | ✅/❌ | X | Y | Z |
| 9 | `i18n_checker.py` | i18n-localization | ✅/❌ | X | Y | Z |
| 10 | `seo_checker.py` | seo-fundamentals | ✅/❌ | X | Y | Z |
| 11 | `geo_checker.py` | geo-fundamentals | ✅/❌ | X | Y | Z |
| 12 | `react_performance_checker.py` | nextjs-react-expert | ✅/❌ | X | Y | Z |

### Conditional Scripts
| # | Script | Executed? | Reason |
|---|--------|-----------|--------|
| 13 | `lighthouse_audit.py` | ✅/⚪ Skipped | (URL or reason) |
| 14 | `playwright_runner.py` | ✅/⚪ Skipped | (URL or reason) |
| 15 | `mobile_audit.py` | ✅/⚪ Skipped | (reason) |

## 📊 Skill-by-Skill Evaluation
| # | Skill | Status | Key Findings |
|---|-------|--------|--------------|
| 1-12 | ... | ... | ... |

## Issues Found & Fixed During Review
| File | Issue | Source (Skill/Rule/Script) | Action |
|---|---|---|---|
| ... | ... | ... | Fixed |

## Critical Issues (Blockers)
- (list or "None")

## Action Items
- [ ] (list or "None — all clear")
```

---

## Exit Criteria

> 🔴 **You MUST NOT finish this workflow until ALL of the following are true:**

- [ ] Global Integrity Gate (Step 0) passed with exit 0 (after all fixes)
- [ ] Final Health Check (Step 4) passed with exit 0
- [ ] **ALL project errors found (Lint, TSC, Tests) were FIXED immediately.**
- [ ] ALL 12 SKILL.md files were read via `view_file`
- [ ] ALL 6 project rule files were read via `view_file`
- [ ] **Code-Level Rule Validation (Step 2.5) was executed against relevantFiles**
- [ ] **ALL 12 mandatory scripts (Step 3B Batches 1-3) were executed**
- [ ] **ALL script results were recorded in the report**
- [ ] Conditional scripts (Step 3B Batch 4) were executed OR have explicit skip justification
- [ ] Report follows the EXACT format above
