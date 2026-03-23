# Supabase PostgreSQL Schema: Diano Careers MVP 2.0

## Goal Description
Design a scalable PostgreSQL schema for Diano Careers MVP 2.0 that gracefully handles a hybrid B2C/B2B model. B2B users will belong to organizations, while B2C users will not. The schema will use UUIDs, enums where appropriate, and include timestamps to prepare for Row Level Security (RLS).

## User Review Required
> [!IMPORTANT]
> Please review the proposed schema, particularly the relationship between B2C users (nullable `organization_id`) vs B2B users. Verify that the table structure correctly models your expectations for assessments, pathways, and the marketplace.

## Proposed Schema Definitions

### Enums
```sql
-- Represents the role a user has within an organization (or platform if null organization)
CREATE TYPE user_role AS ENUM ('superadmin', 'admin', 'member', 'coach');

-- Represents the state of an assessment session
CREATE TYPE assessment_status AS ENUM ('in_progress', 'completed', 'abandoned');

-- Represents the confidence level of a user's answer during an assessment
CREATE TYPE confidence_level AS ENUM ('low', 'medium', 'high');

-- Represents the status of an actionable item in a growth plan
CREATE TYPE action_status AS ENUM ('planned', 'in_progress', 'completed', 'skipped');

-- Represents the type of a marketplace listing
CREATE TYPE listing_type AS ENUM ('job', 'coaching', 'course', 'mentorship');
```

### Tables, Foreign Keys, and Rationale

```sql
-- 1. organizations
-- Rationale: Represents B2B institutional clients. 
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    domain TEXT, -- Optional: used for auto-joining users based on email domain
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. users (maps to auth.users in Supabase, but useful to have a public profile extension)
-- Rationale: Core user entity.
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. user_profiles
-- Rationale: Stores non-auth profile information.
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    headline TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. organization_memberships
-- Rationale: Handles the core B2B (tenant) vs B2C requirement.
-- B2C users will NOT have a record here, or can be queried via left joins.
-- Alternatively, `users` could have an `organization_id` column, but a junction table 
-- allows users to belong to multiple orgs in the future if needed, and cleanly separates B2C.
CREATE TABLE organization_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'member',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, organization_id) -- A user should only have one membership per org
);

-- 5. tenant_branding
-- Rationale: Organizations can customize their UI (colors, logo) for B2B portals.
CREATE TABLE tenant_branding (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID UNIQUE NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    logo_url TEXT,
    primary_color TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. assessment_sessions
-- Rationale: Tracks an instance of a user taking a skill assessment.
CREATE TABLE assessment_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status assessment_status NOT NULL DEFAULT 'in_progress',
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. assessment_responses
-- Rationale: Tracks individual answers within an assessment session to enable deterministic scoring.
CREATE TABLE assessment_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES assessment_sessions(id) ON DELETE CASCADE,
    question_identifier TEXT NOT NULL, -- Reference to an external or static question bank
    answer_value TEXT NOT NULL,
    confidence confidence_level,
    time_taken_seconds INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. domain_scores
-- Rationale: The aggregated results of an assessment (e.g., "Frontend", "Backend", "Leadership").
-- This populates the "Skills Radar".
CREATE TABLE domain_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES assessment_sessions(id) ON DELETE SET NULL, -- Track which session generated this
    domain_name TEXT NOT NULL,
    score_value NUMERIC(5, 2) NOT NULL, -- e.g. 0-100 or 0.00-10.00
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. pathways
-- Rationale: Defines generic career tracks (e.g., "Senior Full Stack", "Engineering Manager").
CREATE TABLE pathways (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    target_domains JSONB, -- e.g. {"Frontend": 80, "Backend": 70}
    is_custom_b2b BOOLEAN NOT NULL DEFAULT FALSE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE, -- Null if global/B2C pathway
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. pathway_recommendations
-- Rationale: Links a user to pathways they are actively pursuing or recommended by the AI.
CREATE TABLE pathway_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pathway_id UUID NOT NULL REFERENCES pathways(id) ON DELETE CASCADE,
    match_score NUMERIC(5, 2), -- 0 to 100 percentage match
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, pathway_id)
);

-- 11. growth_plans
-- Rationale: A personalized timeline/roadmap for a user to achieve a pathway.
CREATE TABLE growth_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    pathway_id UUID REFERENCES pathways(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    target_completion_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. growth_plan_actions
-- Rationale: Individual steps (courses, tasks, readings) within a growth plan.
CREATE TABLE growth_plan_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES growth_plans(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status action_status NOT NULL DEFAULT 'planned',
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. reassessments
-- Rationale: Micro-assessments triggered when a user completes a growth plan action.
CREATE TABLE reassessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action_id UUID REFERENCES growth_plan_actions(id) ON DELETE SET NULL,
    domain_name TEXT NOT NULL, -- The specific skill being reassessed
    old_score NUMERIC(5, 2),
    new_score NUMERIC(5, 2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. marketplace_listings
-- Rationale: B2C roles, B2B internal mobility roles, or courses.
CREATE TABLE marketplace_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    type listing_type NOT NULL,
    description TEXT,
    url TEXT,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE, -- Null if global listing. If set, might be restricted to tenant.
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. audit_logs
-- Rationale: Critical for B2B enterprise compliance. Tracks who did what.
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    action TEXT NOT NULL, -- e.g., 'assessment_started', 'role_changed'
    entity_type TEXT NOT NULL, -- e.g., 'assessment_sessions', 'organization_memberships'
    entity_id UUID,
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Recommended Indexes

```sql
-- Speed up tenant-based queries (B2B lookups)
CREATE INDEX idx_org_memberships_org_id ON organization_memberships(organization_id);
CREATE INDEX idx_pathways_org_id ON pathways(organization_id);
CREATE INDEX idx_marketplace_org_id ON marketplace_listings(organization_id);
CREATE INDEX idx_audit_logs_org_id ON audit_logs(organization_id);

-- Speed up user-based lookups
CREATE INDEX idx_profiles_user_id ON user_profiles(id);
CREATE INDEX idx_assessment_sessions_user_id ON assessment_sessions(user_id);
CREATE INDEX idx_domain_scores_user_id ON domain_scores(user_id);
CREATE INDEX idx_growth_plans_user_id ON growth_plans(user_id);

-- Speed up assessment analytics
CREATE INDEX idx_responses_session_id ON assessment_responses(session_id);
CREATE INDEX idx_domain_scores_domain ON domain_scores(domain_name);

-- Speed up growth plan timelines
CREATE INDEX idx_actions_plan_id ON growth_plan_actions(plan_id);
```

## Verification Plan
1. You can copy the exact SQL statements into the Supabase SQL Editor.
2. The schema creates relations that correctly isolate standard users from tenant environments using `organization_id` foreign keys, while allowing `NULL` for B2C records natively.
