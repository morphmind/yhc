import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/useToast';

export default function AdminPanel() {
  const navigate = useNavigate();

  React.useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/admin/login');
        return;
      }

      // Check if user has admin role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        throw new Error('Profile check failed');
      }

      if (!profile || profile.role !== 'admin') {
        throw new Error('Yetkisiz erişim');
      }

      // Redirect to dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Yetkisiz erişim",
      });
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}