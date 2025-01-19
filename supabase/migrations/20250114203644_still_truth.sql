/*
  # Storage Policies Update

  1. Changes
    - Creates hair-analysis-photos bucket if it doesn't exist
    - Updates storage policies for photos
    - Adds proper access controls for authenticated and admin users

  2. Security
    - Public read access for photos
    - Authenticated users can upload photos
    - Admin users can update and delete photos
*/

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('hair-analysis-photos', 'hair-analysis-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload photos" ON storage.objects;
DROP POLICY IF EXISTS "Admin users can update photos" ON storage.objects;
DROP POLICY IF EXISTS "Admin users can delete photos" ON storage.objects;

-- Create new policies
CREATE POLICY "Public Access for Photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'hair-analysis-photos');

CREATE POLICY "Authenticated Upload for Photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'hair-analysis-photos' AND
  (storage.foldername(name))[1] = 'submissions'
);

CREATE POLICY "Admin Update for Photos"
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

CREATE POLICY "Admin Delete for Photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'hair-analysis-photos' AND
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  )
);