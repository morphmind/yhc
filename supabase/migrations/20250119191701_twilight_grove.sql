-- Drop existing functions first
DROP FUNCTION IF EXISTS get_matching_success_stories(text);
DROP FUNCTION IF EXISTS get_similar_pattern_stories(text);

-- Add pattern_match column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'success_stories' AND column_name = 'pattern_match'
  ) THEN
    ALTER TABLE success_stories 
    ADD COLUMN pattern_match text[] NOT NULL DEFAULT '{none}';
  END IF;
END $$;

-- Drop existing constraint if it exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage 
    WHERE constraint_name = 'success_stories_pattern_match_check'
  ) THEN
    ALTER TABLE success_stories DROP CONSTRAINT success_stories_pattern_match_check;
  END IF;
END $$;

-- Add constraint for valid patterns
ALTER TABLE success_stories
ADD CONSTRAINT success_stories_pattern_match_check 
CHECK (pattern_match <@ ARRAY['none', 'light', 'slight-crown', 'strong-crown', 'semi-bald', 'bald']::text[]);

-- Drop existing index if it exists
DROP INDEX IF EXISTS idx_success_stories_pattern_match;

-- Add index for pattern matching
CREATE INDEX idx_success_stories_pattern_match 
ON success_stories USING GIN (pattern_match);

-- Update existing stories with appropriate patterns based on graft count
UPDATE success_stories
SET pattern_match = CASE
  WHEN grafts <= 2000 THEN ARRAY['light']::text[]
  WHEN grafts <= 3000 THEN ARRAY['light', 'slight-crown']::text[]
  WHEN grafts <= 4000 THEN ARRAY['slight-crown', 'strong-crown']::text[]
  WHEN grafts <= 5000 THEN ARRAY['strong-crown', 'semi-bald']::text[]
  ELSE ARRAY['semi-bald', 'bald']::text[]
END;

-- Function to get matching success stories
CREATE OR REPLACE FUNCTION get_matching_success_stories(search_pattern text)
RETURNS SETOF success_stories
LANGUAGE sql
STABLE
AS $$
  SELECT *
  FROM success_stories
  WHERE search_pattern = ANY(pattern_match)
  AND status = 'published'
  ORDER BY created_at DESC;
$$;

-- Function to get similar pattern stories
CREATE OR REPLACE FUNCTION get_similar_pattern_stories(search_pattern text)
RETURNS SETOF success_stories
LANGUAGE sql
STABLE
AS $$
  WITH pattern_severity AS (
    SELECT 
      CASE search_pattern
        WHEN 'none' THEN 0
        WHEN 'light' THEN 1
        WHEN 'slight-crown' THEN 2
        WHEN 'strong-crown' THEN 3
        WHEN 'semi-bald' THEN 4
        WHEN 'bald' THEN 5
      END as severity
  )
  SELECT DISTINCT ON (s.id) s.*
  FROM success_stories s, pattern_severity ps
  WHERE s.status = 'published'
  AND EXISTS (
    SELECT 1 
    FROM unnest(s.pattern_match) p
    WHERE CASE p
      WHEN 'none' THEN 0
      WHEN 'light' THEN 1
      WHEN 'slight-crown' THEN 2
      WHEN 'strong-crown' THEN 3
      WHEN 'semi-bald' THEN 4
      WHEN 'bald' THEN 5
    END BETWEEN GREATEST(ps.severity - 1, 0) AND ps.severity + 1
  )
  ORDER BY s.id, s.created_at DESC
  LIMIT 5;
$$;