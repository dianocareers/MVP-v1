-- SEED DATA FOR DIANO CAREERS MVP 2.0

-- 1. Organizations & Branding
INSERT INTO public.organizations (id, name, slug)
VALUES 
  ('org-1-uuid', 'TechCorp Solutions', 'techcorp'),
  ('org-2-uuid', 'Leadership First', 'leadership-first');

INSERT INTO public.tenant_branding (organization_id, primary_color, secondary_color, logo_url, custom_domain)
VALUES 
  ('org-1-uuid', '#0f172a', '#3b82f6', 'https://techcorp.com/logo.png', 'growth.techcorp.com'),
  ('org-2-uuid', '#7c3aed', '#f5f3ff', 'https://leadershipfirst.io/logo.svg', 'app.leadershipfirst.io');

-- 2. Skill Trees & Sub-Skills
INSERT INTO public.skill_trees (id, domain)
VALUES 
  ('st-tech-uuid', 'Technical'),
  ('st-lead-uuid', 'Leadership');

INSERT INTO public.sub_skills (id, skill_tree_id, domain, name, mastery_threshold, sequence_order)
VALUES 
  ('ss-arch-uuid', 'st-tech-uuid', 'Technical', 'Architecture', 0.8, 1),
  ('ss-code-uuid', 'st-tech-uuid', 'Technical', 'Code Quality', 0.75, 2),
  ('ss-ops-uuid', 'st-tech-uuid', 'Technical', 'Ops & Infra', 0.7, 3),
  ('ss-strat-uuid', 'st-lead-uuid', 'Leadership', 'Strategy', 0.85, 1),
  ('ss-pres-uuid', 'st-lead-uuid', 'Leadership', 'Presence', 0.7, 2),
  ('ss-ment-uuid', 'st-lead-uuid', 'Leadership', 'Mentorship', 0.9, 3);

-- 3. Marketplace Listings
INSERT INTO public.marketplace_listings (id, title, provider, category, type, description, external_url, alignment_tags)
VALUES 
  ('list-1', 'Staff Engineer Path', 'Diano Internal', 'Leadership', 'course', 'The definitive guide to becoming a Staff Engineer.', 'https://diano.careers/path/staff', '{"Leadership", "Strategy"}'),
  ('list-2', 'Distributed Systems 101', 'OReilly', 'Technical', 'course', 'Learn the fundamentals of high-scale architecture.', 'https://learning.oreilly.com/dist-sys', '{"Technical", "Architecture"}'),
  ('list-3', 'Leadership Prescence Masterclass', 'Udemy', 'Leadership', 'course', 'Cmd the room and influence stakeholders.', 'https://udemy.com/leadership-presence', '{"Leadership", "Presence"}'),
  ('list-4', 'AWS Certified Solutions Architect', 'AWS', 'Certifications', 'course', 'Official certification prep for AWS Architect.', 'https://aws.amazon.com/certification', '{"Technical", "Ops"}');

-- 4. Test Users (Profile table is usually created via Auth triggers, but seeding metadata here)
INSERT INTO public.profiles (id, full_name, role, organization_id)
VALUES 
  ('user-b2c-uuid', 'B2C Pilot User', 'b2c_user', NULL),
  ('user-b2b-admin-uuid', 'TechCorp Admin', 'admin', 'org-1-uuid'),
  ('user-b2b-member-uuid', 'TechCorp Engineer', 'member', 'org-1-uuid');
