import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { HELP_ARTICLE, HELP_DOCUMENT, HELP_DOCUMENT_LINK, HELP_INVISIBLE, HELP_SECTION } from '../shared/constants/helps';
import type { IHelpFormValues } from '../shared/interface/IHelpFormValues';
import { useGetHelpById } from './useGetHelpById';
import HelpSectionDetailsFields from '../shared/components/details-fields/HelpSectionDetailsFields';
import type { IHelpUpdateDto } from '../../../../application/dtos/IHelpUpdateDto';
import { eToast, Toast } from '../../../components/ui/toast/CustomToastService';
import { useUpdateHelp } from './useUpdateHelp';
import { toHelpDocumentTypeSelectCommon, toHelpSelect } from '../mappers/helpCreateMapper';
import { useGetHelpStatus } from '../shared/components/hooks/useGetHelpsState';
import HelpArticleDetailsFields from '../shared/components/details-fields/HelpArticleDetailsField';
import HelpDocumentDetailsFields from '../shared/components/details-fields/HelpDocumentDetailsField';
import { useGetHelpDocumentType } from '../shared/components/hooks/useGetHelpsDocumentType';
import React from 'react';
import { dataUrlToFile } from '../../../utils/dataUrlToFile';
import HelpInvisibleDocumentDetailsFields from '../shared/components/details-fields/HelpInvisibleDocumentDetailsField';

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
  const { result: statuses } = useGetHelpStatus({ stateFilters: { forUpdate: true } });
  const existingFileRef = React.useRef<File>(null);


  const selectItemsStatuses = useMemo(
    () => statuses.map(toHelpSelect),
    [statuses]
  );

  const { result: documentTypes, loading: isLoadingDocumentTypes } = useGetHelpDocumentType();

  const selectItemsDocumentType = useMemo(
    () => documentTypes.map(toHelpDocumentTypeSelectCommon),
    [documentTypes]
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

        const isHelpDcocumentType = help.helpTypeId === HELP_DOCUMENT  ||  help.helpTypeId === HELP_INVISIBLE;
        const isHelpDocumentLink =  help.helpDocumentTypeId ===  HELP_DOCUMENT_LINK;

        if (!isHelpDocumentLink && isHelpDcocumentType) {

          existingFileRef.current = dataUrlToFile(
            help.document[0]?.link,
            `help-${help.id}`
          );
        } 
        
        form.reset({
          name: help.name,
          state: String(help.statusId ?? ''),
          description: help.description ?? '',
          typeSearch: help.isParentSection ? HELP_SECTION : HELP_ARTICLE,
          parentId: String(help.parentId ?? '').toUpperCase(),
          title: help.title,
          document: existingFileRef.current ? [existingFileRef.current] : null,
          helpTypeId: String(help.helpTypeId),
          helpDocumentTypeId: help.helpDocumentTypeId ? String(help.helpDocumentTypeId) : undefined ,
          link: help.link ? help.link : '',
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
        description: data.description ?? '',
        name: data.name,
        title: data.title,
        statusId: Number(data.state),
        parentId: String(data.parentId) ?? '',
        link: data.link ?? '',
        helpTypeId: Number(data.helpTypeId),
        helpDocumentTypeId: data.helpDocumentTypeId ?? '',
        documents: data.document ?? undefined
      };

      await update(helpId, payload);
      Toast({ message: 'Item de ayuda actualizado', type: eToast.Success });
      onSuccess();
      onClose();
    } catch (err: any) {
      const message = err?.error?.message;
      Toast({ message: message ? message : 'Error al actualizar item de ayuda', type: eToast.Error });
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
        return <HelpArticleDetailsFields disabledState={false} selectItemsStatuses={selectItemsStatuses} />;
      case HELP_DOCUMENT:
        return <HelpDocumentDetailsFields disabledState={false} selectItemsStatuses={selectItemsStatuses} selectItemsDocumentType={selectItemsDocumentType} />;
      case HELP_INVISIBLE:
        return <HelpInvisibleDocumentDetailsFields disabledState={false} selectItemsStatuses={selectItemsStatuses} selectItemsDocumentType={selectItemsDocumentType} />;
      default:
        return null;
    }
  }, [helpType, selectItemsStatuses]);

  const isLoading = loadingFetch || loadingUpdate || isLoadingDocumentTypes;
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