import React from 'react';
import { Camera, Upload, Check, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';

interface PhotosStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onNext: () => void;
}

interface PhotoUpload {
  file: File | null;
  preview: string | null;
}

const photoTypes = [
  { id: 'front', label: 'Front View', description: 'Clear photo of your hairline' },
  { id: 'top', label: 'Top View', description: 'Shows crown area clearly' },
  { id: 'sides', label: 'Side Views', description: 'Both left and right sides' },
  { id: 'back', label: 'Back View', description: 'Shows donor area' },
];

export function PhotosStep({ formData, setFormData, onNext }: PhotosStepProps) {
  const { t } = useTranslation();
  const [photos, setPhotos] = React.useState<Record<string, PhotoUpload>>({});
  const fileInputRefs = React.useRef<Record<string, HTMLInputElement | null>>({});
  const [hoveredType, setHoveredType] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState<string | null>(null);

  const handleFileSelect = React.useCallback(async (id: string, file: File) => {
    if (!file) return;

    // Create a new FileReader
    const reader = new FileReader();

    // Set up the FileReader onload handler
    reader.onloadend = () => {
      // Update photos state with preview
      setPhotos(prev => ({
        ...prev,
        [id]: {
          file,
          preview: reader.result as string,
        }
      }));

      // Update form data with the file
      setFormData(prev => ({
        ...prev,
        photos: {
          ...prev.photos,
          [id]: file
        }
      }));
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  }, [setFormData]);

  const handleDragEnter = React.useCallback((id: string, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(id);
  }, []);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(null);
  }, []);

  const handleDrop = React.useCallback((id: string, e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(null);
    
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith('image/')) {
      handleFileSelect(id, file);
    }
  }, [handleFileSelect]);

  const handleRemovePhoto = React.useCallback((id: string) => {
    setPhotos(prev => {
      const newPhotos = { ...prev };
      delete newPhotos[id];
      return newPhotos;
    });

    setFormData(prev => {
      const newPhotos = { ...prev.photos };
      delete newPhotos[id];
      return { ...prev, photos: newPhotos };
    });
  }, [setFormData]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {photoTypes.map((type) => (
          <div 
            key={type.id}
            onMouseEnter={() => setHoveredType(type.id)}
            onMouseLeave={() => setHoveredType(null)}
            className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
              hoveredType === type.id
                ? 'scale-[1.02] shadow-lg'
                : 'hover:shadow-md'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={el => fileInputRefs.current[type.id] = el}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileSelect(type.id, file);
                }
              }}
            />

            <div
              onDragEnter={(e) => handleDragEnter(type.id, e)}
              onDragOver={(e) => e.preventDefault()}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(type.id, e)}
              className={`relative bg-white/80 dark:bg-white/5 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden transition-all duration-300 ${
                isDragging === type.id
                  ? 'ring-2 ring-primary shadow-lg scale-[1.02] bg-primary/5'
                  : ''
              }`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-grid-white/5 opacity-100 dark:opacity-20 mix-blend-overlay" />

              {/* Content */}
              <div className="relative p-6">
                {photos[type.id]?.preview ? (
                  <div className="relative aspect-square mb-4 rounded-lg overflow-hidden group">
                    <img
                      src={photos[type.id].preview!}
                      alt={type.label}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => fileInputRefs.current[type.id]?.click()}
                          className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
                        >
                          {t.hairAnalysis.steps.photos.changePhoto}
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleRemovePhoto(type.id)}
                          className="bg-white/10 backdrop-blur-sm hover:bg-red-500/20"
                        >
                          {t.hairAnalysis.steps.photos.deletePhoto}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
                      isDragging === type.id
                        ? 'bg-primary/10 dark:bg-primary/20'
                        : 'bg-white dark:bg-white/10'
                    }`}>
                      <Camera className={`w-8 h-8 transition-colors ${
                        isDragging === type.id
                          ? 'text-primary dark:text-white'
                          : 'text-muted-foreground'
                      }`} />
                    </div>
                    <h3 className="text-lg font-medium text-foreground dark:text-white mb-2">
                      {t.hairAnalysis.steps.photos.types[type.id as keyof typeof t.hairAnalysis.steps.photos.types].title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t.hairAnalysis.steps.photos.types[type.id as keyof typeof t.hairAnalysis.steps.photos.types].description}
                    </p>
                    <span className="text-sm text-muted-foreground mb-2">
                      ({t.hairAnalysis.steps.photos.optional})
                    </span>
                  </div>
                )}

                {!photos[type.id]?.preview && (
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2 bg-white/50 dark:bg-white/5"
                    onClick={() => fileInputRefs.current[type.id]?.click()}
                  >
                    <Upload className="w-4 h-4" />
                    {t.hairAnalysis.steps.photos.uploadButton}
                  </Button>
                )}
              </div>

              {/* Bottom Highlight */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <Button
        onClick={onNext}
        className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        type="button"
      >
        {t.hairAnalysis.navigation.next}
      </Button>
    </div>
  );
}