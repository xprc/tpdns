import React from "react";
import { RefineLayoutSiderProps } from "@pankod/refine-ui-types";

import { act, render, TestWrapper, waitFor } from "@test";

const mockAuthProvider = {
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () => Promise.resolve(),
    isProvided: true,
};

export const layoutSiderTests = function (
    SiderElement: React.ComponentType<RefineLayoutSiderProps>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Sider Element", () => {
        it("should render successful", async () => {
            const { container } = render(<SiderElement />, {
                wrapper: TestWrapper({}),
            });

            expect(container).toBeTruthy();
        });

        it("should render logout menu item successful", async () => {
            const { getAllByText } = render(<SiderElement />, {
                wrapper: TestWrapper({
                    authProvider: mockAuthProvider,
                }),
            });

            await waitFor(() =>
                expect(getAllByText("Posts").length).toBeGreaterThanOrEqual(1),
            );
            expect(getAllByText("Logout").length).toBeGreaterThanOrEqual(1);
        });

        it("should work menu item click", async () => {
            const { getAllByText } = render(<SiderElement />, {
                wrapper: TestWrapper({
                    authProvider: mockAuthProvider,
                }),
            });

            await waitFor(() => getAllByText("Posts")[0].click());
            await waitFor(() =>
                expect(window.location.pathname).toBe("/posts"),
            );
        });

        it("should work logout menu item click", async () => {
            const logoutMockedAuthProvider = {
                ...mockAuthProvider,
                logout: jest.fn().mockImplementation(() => Promise.resolve()),
            };
            const { getAllByText } = render(<SiderElement />, {
                wrapper: TestWrapper({
                    authProvider: logoutMockedAuthProvider,
                }),
            });

            await act(async () => {
                getAllByText("Logout")[0].click();
            });

            expect(logoutMockedAuthProvider.logout).toBeCalledTimes(1);
        });

        it("should render only allowed menu items", async () => {
            const { getAllByText, queryByText } = render(<SiderElement />, {
                wrapper: TestWrapper({
                    resources: [
                        {
                            name: "posts",
                            list: function render() {
                                return <div>posts</div>;
                            },
                        },
                        {
                            name: "users",
                            list: function render() {
                                return <div>users</div>;
                            },
                        },
                    ],
                    accessControlProvider: {
                        can: ({ action, resource }) => {
                            if (action === "list" && resource === "posts") {
                                return Promise.resolve({ can: true });
                            }
                            if (action === "list" && resource === "users") {
                                return Promise.resolve({ can: false });
                            }
                            return Promise.resolve({ can: false });
                        },
                    },
                }),
            });

            await waitFor(() => getAllByText("Posts")[0]);
            await waitFor(() => expect(queryByText("Users")).toBeNull());
        });

        it("should render custom element passed with render prop", async () => {
            const { getAllByText, queryAllByText } = render(
                <SiderElement
                    render={({ logout, dashboard, items }) => {
                        return (
                            <>
                                <div>custom-element</div>
                                {dashboard}
                                {items}
                                {logout}
                            </>
                        );
                    }}
                />,
                {
                    wrapper: TestWrapper({
                        authProvider: mockAuthProvider,
                        DashboardPage: function Dashboard() {
                            return <div>Dashboard</div>;
                        },
                    }),
                },
            );

            await waitFor(() =>
                expect(getAllByText("Posts").length).toBeGreaterThanOrEqual(1),
            );
            expect(queryAllByText("Logout").length).toBeGreaterThanOrEqual(1);
            expect(queryAllByText("Dashboard").length).toBeGreaterThanOrEqual(
                1,
            );
            expect(
                queryAllByText("custom-element").length,
            ).toBeGreaterThanOrEqual(1);
        });
    });
};
