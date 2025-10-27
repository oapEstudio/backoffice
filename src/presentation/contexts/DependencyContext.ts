import React from 'react';

import { GetProfilesUseCase } from '../../application/usecases/GetProfilesUseCase';
import { ProfileRepository } from '../../infrastructure/adapters/http/ProfileRepository';
import { UpdateProfileUseCase } from '../../application/usecases/UpdateProfileUseCase';
import { GetGroupsUseCase } from '../../application/usecases/GetGroupsUseCase';
import { GroupRepository } from '../../infrastructure/adapters/http/GroupRepository';
import { CreateProfileUseCase } from '../../application/usecases/CreateProfilesUseCase';
import { DatasetFilterRepository } from '../../infrastructure/adapters/http/DatasetFilterRepository';
import { GetDatasetFiltersUseCase } from '../../application/usecases/GetDatasetFiltersUseCase';
import { UpdateProfileGroupsUseCase } from '../../application/usecases/UpdateProfileGroupsUseCase';
import { MenuRepository } from '../../infrastructure/adapters/http/MenuRepository';
import { GetMenuUseCase } from '../../application/usecases/GetMenuUseCase';
import { env } from '../../infrastructure/config/env';
import { CreateMenuUseCase } from '../../application/usecases/CreateMenuUseCase';
import { UpdateMenuProfileGroupUseCase } from '../../application/usecases/UpdateMenuProfileGroupUseCase';
import { UpdateMenuUseCase } from '../../application/usecases/UpdateMenuUseCase';
import { DeleteMenuUseCase } from '../../application/usecases/DeleteMenuUseCase';
import { UpdateMenuOrderUseCase } from '../../application/usecases/UpdateMenuOrderUseCase';
import { UpdateMenuOrderRootUseCase } from '../../application/usecases/UpdateMenuOrderRootUseCase';
import { HighlightUseCase } from '../../application/usecases/HighlightMenuUseCase';
import { GetHighlightUseCase } from '../../application/usecases/GetHighlightUseCase';
import { HighlightRepository } from '../../infrastructure/adapters/http/HighlightRepository';
import { GetNotificationsUseCase } from '../../application/usecases/GetNotificationsUseCase';
import { NotificationRepository } from '../../infrastructure/adapters/http/NotificationRepository';
import { CreateNotificationUseCase } from '../../application/usecases/CreateNotificationUseCase';
import { UpdateNotificationsProfilesUseCase } from '../../application/usecases/UpdateNotificationsProfilesUseCase';
import { CancellationNotificationUseCase } from '../../application/usecases/CancellationNotificationsUseCase';
import { GetNotificationByIdUseCase } from '../../application/usecases/GetNotificationByIdUseCase';
import { UpdateNotificationUseCase } from '../../application/usecases/UpdateNotificationUseCase';
import { GetHelpUseCase } from '../../application/usecases/GetHelpsUseCase';
import { HelpRepository } from '../../infrastructure/adapters/http/HelpRepositoy';
import { CreateHelpUseCase } from '../../application/usecases/CreateHelpUseCase';
import { GetHelpByIdUseCase } from '../../application/usecases/GetHelpByIdUseCase';
import { UpdateHelpProfilesUseCase } from '../../application/usecases/UpdateHelpProfilesUseCase';
import { UpdateHelpUseCase } from '../../application/usecases/UpdateHelpUseCase';
import { CancellationHelpUseCase } from '../../application/usecases/CancellationHelpUseCase';


const profileRepo = new ProfileRepository();
const groupRepo = new GroupRepository();
const menuRepo = new MenuRepository();
const highlightRepo = new HighlightRepository();
const notificationRepo = new NotificationRepository();
const helpRepo = new HelpRepository();

export interface IDependencies{
  getProfiles: GetProfilesUseCase,
  updateProfile: UpdateProfileUseCase,
  updateProfileGroup: UpdateProfileGroupsUseCase,
  getGroups: GetGroupsUseCase,
  createProfile: CreateProfileUseCase,
  getProfileStatuses: GetDatasetFiltersUseCase,
  getProfilesFilterProfiles: GetDatasetFiltersUseCase,
  getMenues: GetMenuUseCase,
  createMenu: CreateMenuUseCase,
  updateMenuProfileGroup: UpdateMenuProfileGroupUseCase,
  updateMenu: UpdateMenuUseCase,
  deleteMenu: DeleteMenuUseCase,
  updateMenuOrder: UpdateMenuOrderUseCase,
  updateMenuOrderRoot: UpdateMenuOrderRootUseCase,
  highlightMenu: HighlightUseCase,
  getHighlighteds: GetHighlightUseCase,
  getNotifications: GetNotificationsUseCase,
  getNotificationStatuses: GetDatasetFiltersUseCase,
  getNotificationTypes: GetDatasetFiltersUseCase,
  getNotificationCommon: GetDatasetFiltersUseCase,
  createNotification: CreateNotificationUseCase,
  updateNotificationProfiles: UpdateNotificationsProfilesUseCase,
  cancellationNotification: CancellationNotificationUseCase,
  getNotificationById: GetNotificationByIdUseCase,
  updateNotification: UpdateNotificationUseCase,
  getHelps: GetHelpUseCase,
  getHelpTypes: GetDatasetFiltersUseCase,
  getHelpSections: GetDatasetFiltersUseCase,
  getHelpStatuses: GetDatasetFiltersUseCase,
  createHelp: CreateHelpUseCase,
  getHelpById: GetHelpByIdUseCase,
  updateHelpProfiles: UpdateHelpProfilesUseCase,
  updateHelp: UpdateHelpUseCase,
  cancellationHelp: CancellationHelpUseCase,
  getHelpProfiles: GetDatasetFiltersUseCase,
}

const resourseDimDatasetProfile = env.resources.profiles.dim.dataset;
const resourseDimDatasetNotification = env.resources.notifications.dim.dataset;
const resourseDimDatasetHelp = env.resources.helps.dim.dataset;

/**Profiles */
const urlProfileStatus = resourseDimDatasetProfile.endpoint.replace('{dataset}','statuses');
const urlDimProfile = resourseDimDatasetProfile.endpoint.replace('{dataset}','profiles');


/**Notifications */
const urlNotificationStatus = resourseDimDatasetNotification.endpoint.replace('{dataset}','statuses');
const urlNotificationTypes = resourseDimDatasetNotification.endpoint.replace('{dataset}','types');
const urlNotificationCommonTypes = resourseDimDatasetNotification.endpoint.replace('{dataset}','commontypes');

/**Help Desk */
const urlHelpStatus = resourseDimDatasetHelp.endpoint.replace('{dataset}','statuses');
const urlHelpTypes = resourseDimDatasetHelp.endpoint.replace('{dataset}','types');
const urlHelpsSections = resourseDimDatasetHelp.endpoint.replace('{dataset}','sections');
const urlHelpsProfiles = resourseDimDatasetHelp.endpoint.replace('{dataset}','profiles');

export const defaultDependencies: IDependencies = {
  getProfiles: new GetProfilesUseCase(profileRepo),
  updateProfile: new UpdateProfileUseCase(profileRepo),
  getGroups: new GetGroupsUseCase(groupRepo),
  createProfile: new CreateProfileUseCase(profileRepo),
  getProfileStatuses: new GetDatasetFiltersUseCase(new DatasetFilterRepository(urlProfileStatus,resourseDimDatasetProfile.version)),
  getProfilesFilterProfiles: new GetDatasetFiltersUseCase(new DatasetFilterRepository(urlDimProfile,resourseDimDatasetProfile.version)),
  updateProfileGroup: new UpdateProfileGroupsUseCase(profileRepo),
  getMenues: new GetMenuUseCase(menuRepo),
  createMenu: new CreateMenuUseCase(menuRepo),
  updateMenuProfileGroup: new UpdateMenuProfileGroupUseCase(menuRepo),
  updateMenu: new UpdateMenuUseCase(menuRepo),
  deleteMenu: new DeleteMenuUseCase(menuRepo),
  updateMenuOrder: new UpdateMenuOrderUseCase(menuRepo),
  updateMenuOrderRoot: new UpdateMenuOrderRootUseCase(menuRepo),
  highlightMenu: new HighlightUseCase(menuRepo),
  getHighlighteds: new GetHighlightUseCase(highlightRepo),
  getNotifications: new GetNotificationsUseCase(notificationRepo),
  getNotificationStatuses: new GetDatasetFiltersUseCase(new DatasetFilterRepository(urlNotificationStatus,resourseDimDatasetNotification.version)),
  getNotificationTypes: new GetDatasetFiltersUseCase(new DatasetFilterRepository(urlNotificationTypes,resourseDimDatasetNotification.version)),
  getNotificationCommon: new GetDatasetFiltersUseCase(new DatasetFilterRepository(urlNotificationCommonTypes,resourseDimDatasetNotification.version)),
  createNotification: new CreateNotificationUseCase(notificationRepo),
  updateNotificationProfiles: new UpdateNotificationsProfilesUseCase(notificationRepo),
  cancellationNotification: new CancellationNotificationUseCase(notificationRepo),
  getNotificationById: new GetNotificationByIdUseCase(notificationRepo),
  updateNotification: new UpdateNotificationUseCase(notificationRepo),
  getHelps: new GetHelpUseCase(helpRepo),
  getHelpTypes: new GetDatasetFiltersUseCase(new DatasetFilterRepository(urlHelpTypes,resourseDimDatasetHelp.version)),
  getHelpSections: new GetDatasetFiltersUseCase(new DatasetFilterRepository(urlHelpsSections,resourseDimDatasetHelp.version)),
  getHelpStatuses: new GetDatasetFiltersUseCase(new DatasetFilterRepository(urlHelpStatus,resourseDimDatasetHelp.version)),
  getHelpProfiles: new GetDatasetFiltersUseCase(new DatasetFilterRepository(urlHelpsProfiles,resourseDimDatasetHelp.version)),
  createHelp: new CreateHelpUseCase(helpRepo),
  getHelpById: new GetHelpByIdUseCase(helpRepo),
  updateHelpProfiles: new UpdateHelpProfilesUseCase(helpRepo),
  updateHelp: new UpdateHelpUseCase(helpRepo),
  cancellationHelp: new CancellationHelpUseCase(helpRepo),
};

export const DependencyContext = React.createContext<IDependencies>(defaultDependencies);
