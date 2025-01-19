/*
  # Storage setup for hair analysis photos

  1. New Storage Bucket
    - Creates 'hair-analysis-photos' bucket for storing patient photos
  
  2. Security
    - Enables public access for viewing photos
    - Restricts uploads to authenticated users only
    - Allows admins to manage all files
*/

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('hair-analysis-photos', 'hair-analysis-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to view photos
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'hair-analysis-photos');

-- Allow authenticated users to upload photos
CREATE POLICY "Authenticated users can upload photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'hair-analysis-photos' AND
  (storage.foldername(name))[1] = 'submissions'
);

-- Allow admin users to update photos
CREATE POLICY "Admin users can update photos"
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

-- Allow admin users to delete photos
CREATE POLICY "Admin users can delete photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'hair-analysis-photos' AND
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  )
);