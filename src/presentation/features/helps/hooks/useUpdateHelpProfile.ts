import { useContext, useState } from 'react';
import { DependencyContext } from '../../../contexts/DependencyContext';
import type { INotificationUpdateProfiles } from '../../../../application/dtos/INotificationUpdateProfiles';
import type { IHelpUpdateProfiles } from '../../../../application/dtos/IHelpUpdateProfiles';

export function useUpdateHelpProfile() {
    const { updateHelpProfiles } = useContext(DependencyContext)

    const [loading, setLoading] = useState(false);

    const update = async (id: string, data: IHelpUpdateProfiles) => {
        setLoading(true);
        try {
            const updated = await updateHelpProfiles.execute(id, data);
            return updated;
        } catch (error: any) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { update, loading };
}