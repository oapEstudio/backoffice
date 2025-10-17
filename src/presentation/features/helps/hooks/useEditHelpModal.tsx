// hooks/useEditHelpModal.ts
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { HELP_ARTICLE, HELP_DOCUMENT, HELP_SECTION } from '../shared/constants/helps';
import type { IHelpFormValues } from '../shared/interface/IHelpFormValues';
import { useGetHelpById } from './useGetHelpById';
import HelpSectionDetailsFields from '../shared/components/details-fields/HelpSectionDetailsFields';

interface UseEditHelpModalProps {
  open: boolean;
  helpType: number;
  helpId: string | null;
  onSuccess?: () => void;
}

export const useEditHelpModal = ({ 
  open, 
  helpId, 
  helpType,
  onSuccess 
}: UseEditHelpModalProps) => {
  const { fetchById, loading: loadingFetch } = useGetHelpById();

  const form = useForm<IHelpFormValues>({
    defaultValues: {
      name: '',
      description: '',
      parentId: '',
      profiles: [],
      title: '',
      document: [],
      state: '',
      helpTypeId: '',
      helpDocumentTypeId: '',
      link: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  
  useEffect(() => {
    if (!open || !helpId) return;

    const loadHelpData = async () => {
      try {
        const help = await fetchById(helpId);
        
        form.reset({
          name: help.name,
          description: help.description,
          parentId: help.parentId,
          profiles: (help.profile ?? []).map(p => ({ 
            id: String(p.id), 
            name: p.name 
          })),
          title: help.title,
          document: [],
          state: help.statusDescription,
          helpTypeId: String(help.helpTypeId),
          helpDocumentTypeId: '',
          link: String(help.link),
        });
      } catch (error) {
        console.error('Error loading help data:', error);
      }
    };

    loadHelpData();
  }, [open, helpId, fetchById, form]);

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);


  const shouldShowFields = useMemo(() => {
    switch (helpType) {
      case HELP_SECTION:
        return <HelpSectionDetailsFields disabledState={false} />;
      case HELP_ARTICLE:
        return null;
      case HELP_DOCUMENT:
        return null;
      default:
        return null;
    }
  }, [helpType]);

  //TODO AGREGAR FETCHEEDIT
  const isLoading = loadingFetch;
  const isDisabled = !form.formState.isValid || isLoading;

  return {
    form,
    shouldShowFields,
    isLoading,
    isDisabled,
  };
};