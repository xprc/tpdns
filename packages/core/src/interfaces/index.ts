// contexts
export * from "../contexts/data/IDataContext";
export * from "../contexts/live/ILiveContext";
export * from "../contexts/auth/IAuthContext";
export * from "../contexts/refine/IRefineContext";
export * from "../contexts/translation/ITranslationContext";
export * from "../contexts/undoableQueue/IUndoableQueueContext";
export * from "../contexts/resource/IResourceContext";
export * from "../contexts/unsavedWarn/IUnsavedWarnContext";
export * from "../contexts/router/IRouterContext";
export * from "../contexts/accessControl/IAccessControlContext";
export * from "../contexts/notification/INotificationContext";
export * from "../contexts/auditLog/IAuditLogContext";

export * from "../components/pages/login";

// actions
export * from "./actions";

// notification
export * from "./notification";

// mutationMode
export * from "./mutationMode";

// mutationMode
export * from "./HttpError";

// custom components
export * from "./customComponents";

// resourceRouterParams
export * from "./resourceRouterParams";

// resourceErrorRouterParams
export * from "./resourceErrorRouterParams";

// mapData
export * from "./mapDataFn";

// successErrorNotification
export * from "./successErrorNotification";

//metaData
export * from "./metaData";

//queryKeys
export * from "./queryKey";

//menuItem
export * from "./menuItem";

//metaData
export * from "./live";

//auditLog
export * from "./auditLog";

export type BaseKey = string | number;
export type BaseRecord = {
    id?: BaseKey;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
};
export interface Option {
    label: string;
    value: string;
}

export * from "./auth";
