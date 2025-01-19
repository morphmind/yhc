-- Drop existing policies if they exist
DO $$ BEGIN
  -- Drop policies one by one to handle cases where they don't exist
  BEGIN
    DROP POLICY IF EXISTS "Public Access for Photos" ON storage.objects;
  EXCEPTION WHEN undefined_object THEN NULL;
  END;
  
  BEGIN
    DROP POLICY IF EXISTS "Anyone can upload photos" ON storage.objects;
  EXCEPTION WHEN undefined_object THEN NULL;
  END;
  
  BEGIN
    DROP POLICY IF EXISTS "Admin users can update photos" ON storage.objects;
  EXCEPTION WHEN undefined_object THEN NULL;
  END;
  
  BEGIN
    DROP POLICY IF EXISTS "Admin users can delete photos" ON storage.objects;
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
    WHERE policyname = 'Storage Public Access'
  ) THEN
    CREATE POLICY "Storage Public Access"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'hair-analysis-photos');
  END IF;

  -- Upload policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Storage Upload'
  ) THEN
    CREATE POLICY "Storage Upload"
    ON storage.objects FOR INSERT
    WITH CHECK (
      bucket_id = 'hair-analysis-photos' AND
      (storage.foldername(name))[1] = 'submissions'
    );
  END IF;

  -- Admin update policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Storage Admin Update'
  ) THEN
    CREATE POLICY "Storage Admin Update"
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
    WHERE policyname = 'Storage Admin Delete'
  ) THEN
    CREATE POLICY "Storage Admin Delete"
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