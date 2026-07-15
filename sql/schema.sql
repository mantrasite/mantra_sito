-- Menu storage schema (replaces the old menu.json on Vercel Blob)

CREATE TABLE IF NOT EXISTS site_settings (
  id              text PRIMARY KEY DEFAULT 'main',
  restaurant_info jsonb NOT NULL DEFAULT '{}'::jsonb,
  allergens_info  text NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS menu_sections (
  id          text PRIMARY KEY,
  "group"     text NOT NULL,
  label       text,
  eyebrow     text,
  title       text NOT NULL,
  description text,
  accent      text,
  items       jsonb NOT NULL DEFAULT '[]'::jsonb,
  position    integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS menu_backups (
  id         serial PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  data       jsonb NOT NULL
);
