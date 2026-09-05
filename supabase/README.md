# Apollo Labs — Supabase

## Migrations

`migrations/20260904064214_apollo_initial_schema.sql` creates the initial
schema, triggers, and row level security. It is additive: it creates no
destructive statements and drops nothing except its own policies and triggers
(so it can be re-applied safely).

### Applying it

**Option A — Supabase CLI (preferred)**

```bash
brew install supabase/tap/supabase     # if not installed
supabase init                          # keeps the existing migrations/ folder
supabase link --project-ref <your-project-ref>
supabase db push                       # review the printed plan, then confirm
```

**Option B — Dashboard SQL editor**

Paste the entire migration file into the SQL editor and run it once.

### After applying

Promote the first admin (there is no other way in — the role guard blocks
self-promotion by design). Run this from the SQL editor, where `auth.uid()` is
null and the guard defers to the trusted server context:

```sql
update public.profiles set role = 'admin' where email = 'ashmitpai2009@gmail.com';
```

## Storage

The migration creates a **private** `project-files` bucket with no object
policies, so only the service role can touch it. Object-level policies ship
with the upload flow.
