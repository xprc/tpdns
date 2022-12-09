import { BaseKey, MetaDataQuery } from "../../interfaces";

export type LogParams = {
    resource: string;
    action: string;
    data?: any;
    author?: {
        name?: string;
        [key: string]: any;
    };
    previousData?: any;
    meta: Record<number | string, any>;
};

export type IAuditLogContext = {
    create?: (params: LogParams) => Promise<any>;
    get?: (params: {
        resource: string;
        action?: string;
        meta?: Record<number | string, any>;
        author?: Record<number | string, any>;
        metaData?: MetaDataQuery;
    }) => Promise<any>;
    update?: (params: {
        id: BaseKey;
        name: string;
        [key: string]: any;
    }) => Promise<any>;
};

export type AuditLogProvider = Required<IAuditLogContext>;
