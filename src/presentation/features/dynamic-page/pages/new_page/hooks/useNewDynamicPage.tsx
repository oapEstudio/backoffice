import { useEffect, useMemo, useState } from "react";
import type { IDynamicPage } from "../../../../../../domain/entities/IDynamicPage";
import { ID_SECTION_ITEM_MENU } from "../../../shared/constants/constants";
import type { ISectionPage } from "../components/section-page/SectionPage";
import { useCreateDynamicPages } from "../../../hooks/useCreateDynamicPages";
import { useHref, useNavigate, useParams } from "react-router-dom";
import { DYNAMIC_PAGE, PREVIEW_DYNAMIC_PAGE } from "../../../../../router/routes";
import { resetDynamicPageStorage } from "../../../shared/storage/dp-reset";
import { saveDynamicPageToStorage } from "../../../shared/storage/dp-save";
import type { IModalSaveFormValues } from "../components/modal-save/ModalSave";
import type { ICreateDynamicPageDto, ISectionDto } from "../../../../../../application/dtos/ICreateDynamicPageDto";
import { eToast, Toast } from "../../../../../components/ui/toast/CustomToastService";
import type { IModalAddElementFormValues } from "../components/modal-add-element/ModalAddElement";
import { useGetDynamicPageById } from "../../../hooks/useGetDynamicPageById";
import { dataUrlToFile } from "../../../../../utils/dataUrlToFile";
import { useUpdateDynamicPage } from "../../../hooks/useUpdateDynamicPage";
import type { IUpdateDynamicPageDto } from "../../../../../../application/dtos/IUpdateDynamicPageDto";
import { eTypeElement, type IElementDynamicPage } from "../components/element-dynamic-page/ElementDynamicPage";

export function useNewDynamicPage(init?: IDynamicPage){

   const { create, loading: creating, error: createError } = useCreateDynamicPages();
   const {fetchById, loading: searchingById} = useGetDynamicPageById();
   const {update: updatePage, loading: updating} = useUpdateDynamicPage();

   const [pagesProps, setPagesProps] = useState<ISectionPage[]>([{
    elements: [],
    id: ID_SECTION_ITEM_MENU.toString(),
    backgroundColor: '',
    order: 0
  }]);
  const [openAddElement, setOpenAddElement] = useState<boolean>(false);
  const [openAddItemMenu, setOpenAddItemMenu] = useState<boolean>(false);
  const [openSave, setOpenSave] = useState<boolean>(false);
  const [openAddSection, setOpenAddSection] = useState<boolean>(false);
  const [sectionID, setSectionID] = useState<string>();    
  const [hasMenu, setHasMenu] = useState<boolean>(true);
  const [initFormSave, setInitFormSave] = useState<IModalSaveFormValues>()
  const [isEdit, setIsEdit] = useState(false);
  

  const hrefDynamicPage = useHref(PREVIEW_DYNAMIC_PAGE.name); 
  
  const navigate = useNavigate();


 const { id } = useParams<{ id: string }>();
 const pageId = useMemo(() => (id ? id : undefined), [id]);




  useEffect(() => {
    
    if (!pageId) return; 

    (async () => {
      try {
        const pageById = await fetchById(pageId);

       setPagesProps(() => {

          const MENU_ID = ID_SECTION_ITEM_MENU.toString();


          const menuElements: IElementDynamicPage[] = [];
          const normalSections: ISectionPage[] = [];

          for (const s of pageById.sections) {
           
            const mapped = (s.elements ?? []).map((e: any): IElementDynamicPage => {
              const type = e.type?.toString() as eTypeElement;
              const file = e.fileUrl ? dataUrlToFile(e.fileUrl) : null;

              return {
                ...e,
                id: String(e.id),
                type,
                file, 
              };
            });

          
            const sectionMenuElems = mapped.filter(el => el.type === eTypeElement.ITEM_MENU);
            const sectionOtherElems = mapped.filter(el => el.type !== eTypeElement.ITEM_MENU);

            
            if (sectionMenuElems.length) menuElements.push(...sectionMenuElems);

            
            if (sectionOtherElems.length) {
              normalSections.push({
                id: String(s.id),
                order: s.order,
                backgroundColor: s.backgroundColor ?? '',
                elements: sectionOtherElems,
              });
            }
          }

          
          const menuSection: ISectionPage = {
            id: MENU_ID,
            order: 0,
            backgroundColor: '',
            elements: menuElements,
          };

          return [menuSection, ...normalSections];
        });


        setInitFormSave({
          name: pageById.title,
          profiles: pageById.profiles,
          state: String(pageById.statusId)
        })
        setIsEdit(true);
        setHasMenu(pageById.hasMenu);

      } 
      catch (e: any) {
        
      } finally {
       
      }
    })();

  }, [pageId]);



  const handleDeleteSection = (sectionId: string) =>{

     setPagesProps((previous)=>previous.filter(s=>s.id!==sectionId));
  }

  const handleDeleteElement = (elementId: string) =>{

     setPagesProps(prev =>
        prev.map(sec => ({
          ...sec,
          elements: sec.elements.filter(el => el.id !== elementId),
        }))
      );
  }

  const handleCancelAddModal = ()=>{
    setOpenAddElement(false);
    setOpenAddItemMenu(false);
    setOpenAddSection(false);
    setOpenSave(false);
  }
  const handleAddElement = (id: string) =>{
      
      setSectionID(id);
      setOpenAddElement(true);
     
  }

  const newElement = (element: IModalAddElementFormValues)=>{
    
    if(element.type==eTypeElement.ITEM_MENU && !pagesProps.some(s=>s.id==ID_SECTION_ITEM_MENU.toString())){
          setPagesProps((previos)=>([
                    ...previos,
                    {
                        backgroundColor:'',
                        elements: [],
                        id: ID_SECTION_ITEM_MENU.toString(),
                        order: previos.length +1
                    }
        ]));
    }
    
     setPagesProps(prev =>
        prev.map(sec =>
          sec.id === sectionID
              ? {
                ...sec,
                elements: [
                  ...sec.elements,
                  { 
                    id: Date.now().toString(),
                    text: element.text,
                    fontSize: element.fontSize,
                    align: element.align, 
                    label: element.label, 
                    type: element.type, 
                    file: element.file, 
                    height: element.height,
                    link: element.link,
                    order: sec.elements.length + 1
                  }, 
                ],
              }
            : sec
        )
      );
      setOpenAddElement(false);
      setOpenAddItemMenu(false);  
  }
  const handleAddSection = (backgroundColor?: string)=>{

    setPagesProps((previos)=>([
                ...previos,
                {
                    backgroundColor: backgroundColor??'',
                    elements: [],
                    id: (previos.length + 1).toString(),
                    order: previos.length +1
                }
    ]));

    setOpenAddSection(false);
  }

  const handleAddItemMenu = ()=>{
    
    setSectionID(ID_SECTION_ITEM_MENU.toString());
    setOpenAddItemMenu(true);
  }
  const openNewPreview = () => window.open(hrefDynamicPage, '_blank', 'noopener,noreferrer');
  
  const handlePreview = async ()=>{

    await resetDynamicPageStorage();
    await saveDynamicPageToStorage(pagesProps, hasMenu);
   
    

    openNewPreview();
 
  }
  const handleSave = ()=>{
    setOpenSave(true);
  }

  const save = async (form: IModalSaveFormValues)=>{
    try {
                   
             if(creating) return;
    

             const mapCreate: ICreateDynamicPageDto = {
                hasMenu: hasMenu,
                profiles: form.profiles.map(p=>p.id),
                statusId: 1,
                title: form.name,
                description: '',
                sections: pagesProps.map(s=>{

                  const section: ISectionDto = {
                    order: s.order,
                    backgroundColor: s.backgroundColor,
                    elements: s.elements
                  };

                  return section
                })
              };

             const newId = await create(mapCreate);
                    
       
             Toast({
               message: 'Pagina creada correctamente',
               type: eToast.Success
             });
    
             navigate(DYNAMIC_PAGE.name);
    
           } catch(e) {
              
             Toast({
               message: 'Error al crear la pagina',
               type: eToast.Error
             });
           }
  }

  const update = async (form: IModalSaveFormValues)=>{
    try {
                   
             if(updating) return;
    

             const mapCreate: IUpdateDynamicPageDto = {
                hasMenu: hasMenu,
                profiles: form.profiles.map(p=>p.id),
                statusId: 1,
                title: form.name,
                description: '',
                sections: pagesProps.map(s=>{

                  const section: ISectionDto = {
                    order: s.order,
                    backgroundColor: s.backgroundColor,
                    elements: s.elements
                  };

                  return section
                })
              };

             await updatePage(pageId as string, mapCreate);
                    
       
             Toast({
               message: 'Pagina actualizada correctamente',
               type: eToast.Success
             });
    
             navigate(DYNAMIC_PAGE.name);
    
           } catch(e) {
              
             Toast({
               message: 'Error al actualizar la pagina',
               type: eToast.Error
             });
           }
  }


  return {
    setOpenAddSection,
    handlePreview,
    hasMenu,
    setHasMenu,
    handleSave,
    openAddElement,
    setOpenAddElement,
    handleCancelAddModal,
    newElement,
    openAddItemMenu,
    setOpenAddItemMenu,
    pagesProps,
    handleDeleteSection,
    handleAddItemMenu,
    handleAddElement,
    handleDeleteElement,
    openAddSection,
    handleAddSection,
    openSave,
    creating,
    updating,
    setOpenSave,
    searchingById,
    initFormSave,
    save,
    isEdit,
    update
  }
}