import imageCompression from 'browser-image-compression';

export async function compressImage(file: File): Promise<File> {
  // Validate input
  if (!(file instanceof File)) {
    throw new Error('Invalid input: Expected File object');
  }

  const options = {
    maxSizeMB: 1, // Max file size in MB
    maxWidthOrHeight: 1920, // Max width/height
    useWebWorker: true,
    fileType: 'image/jpeg',
    initialQuality: 0.8,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error; // Propagate error for proper handling
  }
}