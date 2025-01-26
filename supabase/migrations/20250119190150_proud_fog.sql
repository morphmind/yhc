-- Add pattern_match column to success_stories table
ALTER TABLE success_stories 
ADD COLUMN pattern_match text[] NOT NULL DEFAULT '{none}',
ADD CONSTRAINT success_stories_pattern_match_check 
CHECK (pattern_match <@ ARRAY['none', 'light', 'slight-crown', 'strong-crown', 'semi-bald', 'bald']::text[]);

-- Add index for pattern matching
CREATE INDEX idx_success_stories_pattern_match ON success_stories USING GIN (pattern_match);

-- Update existing stories with appropriate patterns
UPDATE success_stories
SET pattern_match = CASE
  WHEN grafts <= 2000 THEN ARRAY['light']::text[]
  WHEN grafts <= 3000 THEN ARRAY['light', 'slight-crown']::text[]
  WHEN grafts <= 4000 THEN ARRAY['slight-crown', 'strong-crown']::text[]
  WHEN grafts <= 5000 THEN ARRAY['strong-crown', 'semi-bald']::text[]
  ELSE ARRAY['semi-bald', 'bald']::text[]
END;

-- Create function to get matching success stories
CREATE OR REPLACE FUNCTION get_matching_success_stories(pattern text)
RETURNS SETOF success_stories
LANGUAGE sql
STABLE
AS $$
  SELECT *
  FROM success_stories
  WHERE pattern = ANY(pattern_match)
  AND status = 'published'
  ORDER BY 
    CASE WHEN pattern = pattern_match[1] THEN 0 ELSE 1 END,
    created_at DESC;
$$;