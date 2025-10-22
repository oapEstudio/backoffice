// hooks/useEditHelpModal.ts
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { HELP_ARTICLE, HELP_DOCUMENT, HELP_SECTION } from '../shared/constants/helps';
import type { IHelpFormValues } from '../shared/interface/IHelpFormValues';
import { useGetHelpById } from './useGetHelpById';
import HelpSectionDetailsFields from '../shared/components/details-fields/HelpSectionDetailsFields';
import type { IHelpUpdateDto } from '../../../../application/dtos/IHelpUpdateDto';
import { eToast, Toast } from '../../../components/ui/toast/CustomToastService';
import { useUpdateHelp } from './useUpdateHelp';
import { toHelpSelect } from '../mappers/helpCreateMapper';
import { useHelpFilterOptions } from './useHelpsFilterOptions';
import { useGetHelpStatus } from './useGetHelpsState';
import HelpArticleDetailsFields from '../shared/components/details-fields/HelpArticleDetailsField';

interface UseEditHelpModalProps {
  open: boolean;
  helpType: number;
  helpId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const useEditHelpModal = ({
  open,
  helpId,
  helpType,
  onSuccess,
  onClose
}: UseEditHelpModalProps) => {
  const { fetchById, loading: loadingFetch } = useGetHelpById();
  const { update, loading: loadingUpdate } = useUpdateHelp()
  const { result: statuses } = useGetHelpStatus({
    stateFilters: { forUpdate: true }
  });

  const selectItemsStatuses = useMemo(
    () => statuses.map(toHelpSelect),
    [statuses]
  );

  const form = useForm<IHelpFormValues>({
    defaultValues: {
      name: '',
      description: '',
      parentId: '',
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
          state: String(help.statusId ?? ''),
          description: help.description ?? '',
          parentId: help.parentId  ?? '',
          title: help.title,
          document: [],
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

  const handleOk = form.handleSubmit(async (data) => {

    if (!helpId) return;

    try {
      const payload: IHelpUpdateDto = {
        description: data.description ? data.description : '',
        name: data.name,
        title: data.title ? data.title : '',
        statusId: Number(data.state),
        parentId: '',
        link: '',
        helpTypeId: Number(data.helpTypeId),
        helpDocumentTypeId: '',
        documents: []
      };

      await update(helpId, payload);
      Toast({ message: 'Item de ayuda actualizado', type: eToast.Success });
      onSuccess();
      onClose();
    } catch {
      Toast({ message: 'Error al actualizar el item de ayuda', type: eToast.Error });
    }
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);


  const shouldShowFields = useMemo(() => {
    switch (helpType) {
      case HELP_SECTION:
        return <HelpSectionDetailsFields disabledState={false} selectItemsStatuses={selectItemsStatuses} />;
      case HELP_ARTICLE:
        return <HelpArticleDetailsFields disabledState={false} selectItemsSection={[]}  selectItemsStatuses={selectItemsStatuses} />;
      case HELP_DOCUMENT:
        return null;
      default:
        return null;
    }
  }, [helpType]);

  const isLoading = loadingFetch || loadingUpdate;
  const isDisabled = !form.formState.isValid || isLoading;

  return {
    form,
    helpType,
    shouldShowFields,
    isLoading,
    isDisabled,
    handleOk
  };
};