import { useEffect, useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import type { IHelpFormValues } from '../interface/IHelpFormValues';
import { HELP_DOCUMENT_DOWNLOAD, HELP_DOCUMENT_PDF, HELP_DOCUMENT_LINK } from '../constants/helps';

export const useDocumentAccept = () => {
  const { watch, setValue, clearErrors } = useFormContext<IHelpFormValues>();

  const watchDocumentType = watch('helpDocumentTypeId');
  const docTypeNum = useMemo(() => Number(watchDocumentType), [watchDocumentType]);

  const previousTypeRef = useRef<number | null>(null);

  const accept = useMemo(() => {
    switch (docTypeNum) {
      case HELP_DOCUMENT_PDF:
        return 'application/pdf,.pdf';
      case HELP_DOCUMENT_DOWNLOAD:
        return [
          'application/pdf,.pdf',
          '.doc,.docx,.txt,.rtf',
          '.xls,.xlsx',
          '.ppt,.pptx',

          '.jpg,.jpeg,.png,.gif,.bmp,.webp,.svg',

          '.mp4,.mov,.avi,.mkv,.wmv,.webm'
        ].join(',');
      default:
        return '*/*';
    }
  }, [docTypeNum]);

  useEffect(() => {
    const previous = previousTypeRef.current;

    if (previous !== null && previous !== docTypeNum) {

      if (docTypeNum === HELP_DOCUMENT_LINK) {
        setValue('document', []);
        clearErrors('document');
      }

      if (
        previous === HELP_DOCUMENT_LINK &&
        (docTypeNum === HELP_DOCUMENT_PDF || docTypeNum === HELP_DOCUMENT_DOWNLOAD)
      ) {
        setValue('document', []);
        clearErrors('document');
      }


      if (
        (previous === HELP_DOCUMENT_PDF && docTypeNum === HELP_DOCUMENT_DOWNLOAD) ||
        (previous === HELP_DOCUMENT_DOWNLOAD && docTypeNum === HELP_DOCUMENT_PDF)
      ) {
        setValue('document', []);
        clearErrors('document');
      }
    }

    previousTypeRef.current = docTypeNum;
  }, [docTypeNum, setValue, clearErrors]);

  return { accept, docTypeNum };
};
