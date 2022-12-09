import React, { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

import {
    AccessControlProvider,
    AuthProvider,
    NotificationProvider,
    Refine,
} from "@pankod/refine-core";

import { MockRouterProvider, MockJSONServer } from "@test";
import { I18nProvider, DataProvider, IResourceItem } from "@pankod/refine-core";

const List = () => {
    return <div>hede</div>;
};
export interface ITestWrapperProps {
    dataProvider?: DataProvider;
    authProvider?: AuthProvider;
    resources?: IResourceItem[];
    notificationProvider?: NotificationProvider;
    accessControlProvider?: AccessControlProvider;
    i18nProvider?: I18nProvider;
    routerInitialEntries?: string[];
    DashboardPage?: React.FC;
}

export const TestWrapper: (
    props: ITestWrapperProps,
) => React.FC<{ children?: ReactNode }> = ({
    dataProvider,
    authProvider,
    resources,
    notificationProvider,
    accessControlProvider,
    routerInitialEntries,
    DashboardPage,
    i18nProvider,
}) => {
    // Previously, MemoryRouter was used in this wrapper. However, the
    // recommendation by react-router developers (see
    // https://github.com/remix-run/react-router/discussions/8241#discussioncomment-159686)
    // is essentially to use the same router as your actual application. Besides
    // that, it's impossible to check for location changes with MemoryRouter if
    // needed.
    if (routerInitialEntries) {
        routerInitialEntries.forEach((route) => {
            window.history.replaceState({}, "", route);
        });
    }

    // eslint-disable-next-line react/display-name
    return ({ children }): React.ReactElement => {
        return (
            <BrowserRouter>
                <Refine
                    dataProvider={dataProvider ?? MockJSONServer}
                    i18nProvider={i18nProvider}
                    routerProvider={MockRouterProvider}
                    authProvider={authProvider}
                    notificationProvider={notificationProvider}
                    resources={resources ?? [{ name: "posts", list: List }]}
                    accessControlProvider={accessControlProvider}
                    DashboardPage={DashboardPage ?? undefined}
                    options={{
                        disableTelemetry: true,
                        reactQuery: {
                            clientConfig: {
                                defaultOptions: {
                                    queries: {
                                        cacheTime: 0,
                                        staleTime: 0,
                                        networkMode: "always",
                                    },
                                },
                            },
                        },
                    }}
                >
                    {children}
                </Refine>
            </BrowserRouter>
        );
    };
};
export {
    MockJSONServer,
    MockRouterProvider,
    MockAccessControlProvider,
    MockLiveProvider,
} from "./dataMocks";

// re-export everything
export * from "@testing-library/react";
