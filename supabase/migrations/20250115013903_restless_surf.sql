/*
  # Fix Storage Policies

  1. New Policies
  2. Enable public access for photos
  3. Add admin-specific policies
*/

-- Drop existing policies if they exist
DO $$ BEGIN
  -- Drop policies one by one to handle cases where they don't exist
  BEGIN
    DROP POLICY IF EXISTS "Public Access for Photos" ON storage.objects;
  EXCEPTION WHEN undefined_object THEN NULL;
  END;
  
  BEGIN
    DROP POLICY IF EXISTS "Authenticated Upload for Photos" ON storage.objects;
  EXCEPTION WHEN undefined_object THEN NULL;
  END;
  
  BEGIN
    DROP POLICY IF EXISTS "Admin Update for Photos" ON storage.objects;
  EXCEPTION WHEN undefined_object THEN NULL;
  END;
  
  BEGIN
    DROP POLICY IF EXISTS "Admin Delete for Photos" ON storage.objects;
  EXCEPTION WHEN undefined_object THEN NULL;
  END;
END $$;

-- Create bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('hair-analysis-photos', 'hair-analysis-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create new policies with unique names
DO $$ BEGIN
  -- Public access policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Public Photos Access Policy'
  ) THEN
    CREATE POLICY "Public Photos Access Policy"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'hair-analysis-photos');
  END IF;

  -- Upload policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Photos Upload Policy'
  ) THEN
    CREATE POLICY "Photos Upload Policy"
    ON storage.objects FOR INSERT
    WITH CHECK (
      bucket_id = 'hair-analysis-photos' AND
      (storage.foldername(name))[1] = 'submissions'
    );
  END IF;

  -- Admin update policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Admin Photos Update Policy'
  ) THEN
    CREATE POLICY "Admin Photos Update Policy"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
      bucket_id = 'hair-analysis-photos' AND
      auth.uid() IN (
        SELECT id FROM public.profiles WHERE role = 'admin'
      )
    )
    WITH CHECK (
      bucket_id = 'hair-analysis-photos' AND
      auth.uid() IN (
        SELECT id FROM public.profiles WHERE role = 'admin'
      )
    );
  END IF;

  -- Admin delete policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Admin Photos Delete Policy'
  ) THEN
    CREATE POLICY "Admin Photos Delete Policy"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
      bucket_id = 'hair-analysis-photos' AND
      auth.uid() IN (
        SELECT id FROM public.profiles WHERE role = 'admin'
      )
    );
  END IF;
END $$;