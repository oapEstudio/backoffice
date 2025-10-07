import type { IHeader } from "../header/header.interface";

export interface IContainer {
  title?: string;
  description: string;
  children: React.ReactNode;
  header?: IHeader;
  infinityScroll?: boolean;
  fetchMoreData?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}