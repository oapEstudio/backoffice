import type { IProfile } from "../../domain/entities/IProfile";
import type { IStatuses } from "../../domain/entities/IStatuses";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { IProfileCreateDto } from "../dtos/IProfileCreateDto";
import type { IProfileUpdateDto } from "../dtos/IProfileUpdateDto";
import type { IProfileUpdateGroups } from "../dtos/IProfileUpdateGroups";

export interface IProfileRepository {

  getProfiles(params: IPageParameters): Promise<IPaginatedResponse<IProfile>>;
  updateProfile(id: string, payload: IProfileUpdateDto): Promise<IProfile>;
  updateProfileGroups(id: string, payload: IProfileUpdateGroups): Promise<IProfile>;
  createProfile(dto: IProfileCreateDto): Promise<string>
  getStatuses(params: IPageParameters): Promise<IPaginatedResponse<IStatuses>>;
  
}