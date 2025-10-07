import { env } from "../../../../infrastructure/config/env";


const PAGE_INIT = 1;
const SORT_DESCENDING = true;
const SORT_BY = null;

export const INITIAL_PARAMS_TABLE = {
    page: PAGE_INIT, pageSize: env.pageSize, sortBy: SORT_BY, sortDescending: SORT_DESCENDING
}

export const ROW_PER_PAGE = [env.pageSize, 15,25,50, 100];
export const ROW_PER_PAGE_LABEL = "Filas por página";