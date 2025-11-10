import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { IHelpFormValues } from '../interface/IHelpFormValues';
import { HELP_DOCUMENT_DOWNLOAD, HELP_DOCUMENT_PDF, HELP_DOCUMENT_LINK } from '../constants/helps';

export const useDocumentAccept = () => {
  const { watch, setValue, clearErrors } = useFormContext<IHelpFormValues>();

  const watchDocumentType = watch('helpDocumentTypeId');
  const docTypeNum = useMemo(() => Number(watchDocumentType), [watchDocumentType]);

  const accept = useMemo(() => {
    if (docTypeNum === HELP_DOCUMENT_PDF) {
      return 'application/pdf,.pdf';
    }
    if (docTypeNum === HELP_DOCUMENT_DOWNLOAD) {
      return 'text/plain,.doc,.docx,.txt';
    }
    return '*/*';
  }, [docTypeNum]);

  useEffect(() => {
    if (docTypeNum === HELP_DOCUMENT_LINK) {
      setValue('document', []);     
      clearErrors('document');
    }

  }, [docTypeNum, setValue, clearErrors]);

  return { accept, docTypeNum };
};
