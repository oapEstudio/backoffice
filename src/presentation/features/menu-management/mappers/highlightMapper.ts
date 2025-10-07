import type { IHighlight } from "../../../../domain/entities/IHighlight";
import type { QuickLink } from "../../../components/widgets-home-page/relevant-applications/RelevantApplications";

export const toQuickLink = (data: IHighlight): QuickLink => {
    return {
        id: data.title,
        label: data.title,
        description: data.description,
        href: data.link,
        isActive: true,
        target: '_blank',
        order: data.hierarchyIndex
    }
};
