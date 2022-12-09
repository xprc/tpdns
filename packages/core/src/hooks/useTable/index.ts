import React, { useMemo, useState, useEffect } from "react";
import { QueryObserverResult, UseQueryOptions } from "@tanstack/react-query";
import qs from "qs";
import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";

import {
    useRouterContext,
    useSyncWithLocation,
    useNavigation,
    useResourceWithRoute,
    useList,
    useLiveMode,
} from "@hooks";
import {
    stringifyTableParams,
    parseTableParams,
    unionFilters,
    setInitialFilters,
    setInitialSorters,
    unionSorters,
} from "@definitions/table";

import {
    ResourceRouterParams,
    BaseRecord,
    CrudFilters,
    CrudSorting,
    GetListResponse,
    SuccessErrorNotification,
    HttpError,
    MetaDataQuery,
    LiveModeProps,
} from "../../interfaces";

type SetFilterBehavior = "merge" | "replace";

export type useTableProps<TData, TError> = {
    /**
     * Resource name for API data interactions
     * @default Resource name that it reads from route
     */
    resource?: string;
    /**
     * Initial page index
     * @default 10
     */
    initialCurrent?: number;
    /**
     * Initial number of items per page
     * @default 10
     */
    initialPageSize?: number;
    /**
     * Initial sorter state
     */
    initialSorter?: CrudSorting;
    /**
     * Default and unchangeable sorter state
     *  @default `[]`
     */
    permanentSorter?: CrudSorting;
    /**
     * Initial filter state
     */
    initialFilter?: CrudFilters;
    /**
     * WDefault and unchangeable filter state
     * @default `[]`
     */
    permanentFilter?: CrudFilters;
    /**
     *Default behavior of the `setFilters` function
     * @default `"merge"`
     */
    defaultSetFilterBehavior?: SetFilterBehavior;
    /**
     * Whether to use server side pagination or not.
     * @default `true`
     */
    hasPagination?: boolean;
    /**
     * Sortings, filters, page index and records shown per page are tracked by browser history
     * @default Value set in [Refine](/docs/api-reference/core/components/refine-config/#syncwithlocation). If a custom resource is given, it will be `false`
     */
    syncWithLocation?: boolean;
    /**
     * react-query's [useQuery](https://tanstack.com/query/v4/docs/reference/useQuery) options
     */
    queryOptions?: UseQueryOptions<GetListResponse<TData>, TError>;
    /**
     * Metadata query for dataProvider
     */
    metaData?: MetaDataQuery;
    /**
     * If there is more than one `dataProvider`, you should use the `dataProviderName` that you will use.
     */
    dataProviderName?: string;
} & SuccessErrorNotification &
    LiveModeProps;

type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

type SyncWithLocationParams = {
    pagination: { current?: number; pageSize?: number };
    sorter: CrudSorting;
    filters: CrudFilters;
};

export type useTablePaginationKeys =
    | "current"
    | "setCurrent"
    | "pageSize"
    | "setPageSize"
    | "pageCount";

export type useTableReturnType<TData extends BaseRecord = BaseRecord> = {
    tableQueryResult: QueryObserverResult<GetListResponse<TData>>;
    sorter: CrudSorting;
    setSorter: (sorter: CrudSorting) => void;
    filters: CrudFilters;
    setFilters: ((filters: CrudFilters, behavior?: SetFilterBehavior) => void) &
        ((setter: (prevFilters: CrudFilters) => CrudFilters) => void);
    createLinkForSyncWithLocation: (params: SyncWithLocationParams) => string;
    current: number;
    setCurrent: ReactSetState<useTableReturnType["current"]>;
    pageSize: number;
    setPageSize: ReactSetState<useTableReturnType["pageSize"]>;
    pageCount: number;
};

export type useTableNoPaginationReturnType<
    TData extends BaseRecord = BaseRecord,
> = Omit<useTableReturnType<TData>, useTablePaginationKeys> &
    Record<useTablePaginationKeys, undefined>;

/**
 * By using useTable, you are able to get properties that are compatible with
 * Ant Design {@link https://ant.design/components/table/ `<Table>`} component.
 * All features such as sorting, filtering and pagination comes as out of box.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/table/useTable} for more details.
 */

const defaultPermanentFilter: CrudFilters = [];
const defaultPermanentSorter: CrudSorting = [];

// overload with pagination
export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    props?: useTableProps<TData, TError> & {
        hasPagination?: true;
    },
): useTableReturnType<TData>;
// overload without pagination
export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>(
    props?: useTableProps<TData, TError> & {
        hasPagination: false;
    },
): useTableNoPaginationReturnType<TData>;
// implementation
export function useTable<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
>({
    initialCurrent = 1,
    initialPageSize = 10,
    hasPagination = true,
    initialSorter,
    permanentSorter = defaultPermanentSorter,
    defaultSetFilterBehavior = "merge",
    initialFilter,
    permanentFilter = defaultPermanentFilter,
    syncWithLocation: syncWithLocationProp,
    resource: resourceFromProp,
    successNotification,
    errorNotification,
    queryOptions,
    liveMode: liveModeFromProp,
    onLiveEvent,
    liveParams,
    metaData,
    dataProviderName,
}: useTableProps<TData, TError> = {}):
    | useTableReturnType<TData>
    | useTableNoPaginationReturnType<TData> {
    const { syncWithLocation: syncWithLocationContext } = useSyncWithLocation();

    const syncWithLocation = syncWithLocationProp ?? syncWithLocationContext;

    const { useLocation, useParams } = useRouterContext();
    const { search, pathname } = useLocation();
    const liveMode = useLiveMode(liveModeFromProp);

    // We want to always parse the query string even when syncWithLocation is
    // deactivated, for hotlinking to work properly
    const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
        parseTableParams(search);

    const defaultCurrent = parsedCurrent || initialCurrent;
    const defaultPageSize = parsedPageSize || initialPageSize;
    const defaultSorter = parsedSorter.length ? parsedSorter : initialSorter;
    const defaultFilter = parsedFilters.length ? parsedFilters : initialFilter;

    const { resource: routeResourceName } = useParams<ResourceRouterParams>();

    const { replace } = useNavigation();
    const resourceWithRoute = useResourceWithRoute();

    const resource = resourceWithRoute(resourceFromProp ?? routeResourceName);

    const [sorter, setSorter] = useState<CrudSorting>(
        setInitialSorters(permanentSorter, defaultSorter ?? []),
    );
    const [filters, setFilters] = useState<CrudFilters>(
        setInitialFilters(permanentFilter, defaultFilter ?? []),
    );
    const [current, setCurrent] = useState<number>(defaultCurrent);
    const [pageSize, setPageSize] = useState<number>(defaultPageSize);

    const createLinkForSyncWithLocation = ({
        pagination: { current, pageSize },
        sorter,
        filters,
    }: SyncWithLocationParams) => {
        const currentQueryParams = qs.parse(search?.substring(1)); // remove first ? character

        const stringifyParams = stringifyTableParams({
            pagination: {
                pageSize,
                current,
            },
            sorter,
            filters,
            ...currentQueryParams,
        });
        return `${pathname}?${stringifyParams}`;
    };

    useEffect(() => {
        if (search === "") {
            setCurrent(defaultCurrent);
            setPageSize(defaultPageSize);
            setSorter(setInitialSorters(permanentSorter, defaultSorter ?? []));
            setFilters(setInitialFilters(permanentFilter, defaultFilter ?? []));
        }
    }, [search]);

    const currentQueryParams = (): object => {
        // We get QueryString parameters that are uncontrolled by refine.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { sorter, filters, pageSize, current, ...rest } = qs.parse(
            search,
            {
                ignoreQueryPrefix: true,
            },
        );

        return rest;
    };

    useEffect(() => {
        if (syncWithLocation) {
            const queryParams = currentQueryParams();
            const stringifyParams = stringifyTableParams({
                ...(hasPagination
                    ? {
                          pagination: {
                              pageSize,
                              current,
                          },
                      }
                    : {}),
                sorter: differenceWith(sorter, permanentSorter, isEqual),
                filters: differenceWith(filters, permanentFilter, isEqual),
                ...queryParams,
            });

            // Careful! This triggers render
            return replace(`${pathname}?${stringifyParams}`, undefined, {
                shallow: true,
            });
        }
    }, [syncWithLocation, current, pageSize, sorter, filters]);

    const queryResult = useList<TData, TError>({
        resource: resource.name,
        config: {
            hasPagination,
            pagination: { current, pageSize },
            filters: unionFilters(permanentFilter, filters),
            sort: unionSorters(permanentSorter, sorter),
        },
        queryOptions,
        successNotification,
        errorNotification,
        metaData,
        liveMode,
        liveParams,
        onLiveEvent,
        dataProviderName,
    });

    const setFiltersAsMerge = (newFilters: CrudFilters) => {
        setFilters((prevFilters) =>
            unionFilters(permanentFilter, newFilters, prevFilters),
        );
    };

    const setFiltersAsReplace = (newFilters: CrudFilters) => {
        setFilters(unionFilters(permanentFilter, newFilters));
    };

    const setFiltersWithSetter = (
        setter: (prevFilters: CrudFilters) => CrudFilters,
    ) => {
        setFilters((prev) => unionFilters(permanentFilter, setter(prev)));
    };

    const setFiltersFn: useTableReturnType<TData>["setFilters"] = (
        setterOrFilters,
        behavior: SetFilterBehavior = defaultSetFilterBehavior,
    ) => {
        if (typeof setterOrFilters === "function") {
            setFiltersWithSetter(setterOrFilters);
        } else {
            if (behavior === "replace") {
                setFiltersAsReplace(setterOrFilters);
            } else {
                setFiltersAsMerge(setterOrFilters);
            }
        }
    };

    const setSortWithUnion = (newSorter: CrudSorting) => {
        setSorter(() => unionSorters(permanentSorter, newSorter));
    };

    const paginationValues = useMemo(() => {
        if (hasPagination) {
            return {
                current,
                setCurrent,
                pageSize,
                setPageSize,
                pageCount: pageSize
                    ? Math.ceil((queryResult.data?.total ?? 0) / pageSize)
                    : 1,
            };
        }

        return {
            current: undefined,
            setCurrent: undefined,
            pageSize: undefined,
            setPageSize: undefined,
            pageCount: undefined,
        };
    }, [hasPagination, current, pageSize, queryResult.data?.total]);

    return {
        tableQueryResult: queryResult,
        sorter,
        setSorter: setSortWithUnion,
        filters,
        setFilters: setFiltersFn,
        ...paginationValues,
        createLinkForSyncWithLocation,
    };
}
