import { useContext, useState } from "react";
import { DependencyContext } from "../../../contexts/DependencyContext";
import { useGetProfiles } from "./useGetProfiles";
import type { IProfile } from "../../../../domain/entities/IProfile";
import { useUpdateProfile } from "./useUpdateProfile";
import type { IProfileUpdateDto } from "../../../../application/dtos/IProfileUpdateDto";

export function useProfileEditor(){

    const {getProfiles, updateProfile} = useContext(DependencyContext);

    const { result, loading, params, setParams } = useGetProfiles(getProfiles, {
        page: 1, pageSize: 10, sortBy: null, sortDescending: true
      });
    
   
    const {update, loading: saving, error: saveError} = 
        useUpdateProfile(updateProfile)

     const [editing,setEditing] = useState<IProfile | null>(null);

     const openEditor = (profile: IProfile) => setEditing(profile);
     const closeEditor = ()=> setEditing(null);

     const onSave = async (data:  IProfileUpdateDto) =>{
        if(!editing) return;

        await update(editing.id, data);

        closeEditor();

        setParams({...params})
     }

     return {
        result, loading, params, setParams, editing, saving, saveError, openEditor, closeEditor, onSave
     }

}