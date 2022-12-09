import React from "react";
import { renderHook } from "@testing-library/react";

import { MockJSONServer, TestWrapper } from "@test";

import { useMenu } from "./";
const DashboardPage = () => <div>dashboard</div>;

/** Ignored due to being deprecated and having a buggy behavior of the unit tests (act warnings) */
xdescribe("useMenu Hook", () => {
    it("returns menuItems", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
            }),
        });

        expect(result.current.menuItems).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "posts",
                    route: "/posts",
                    key: "/posts",
                    label: "Posts",
                }),
            ]),
        );
    });

    it("should returns menuItems with custom route", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [
                    {
                        name: "posts",
                        options: {
                            label: "Posts",
                            route: "refine/posts",
                        },
                    },
                ],
            }),
        });

        expect(result.current.menuItems).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "posts",
                    route: "/refine/posts",
                    key: "/refine/posts",
                    label: "Posts",
                }),
            ]),
        );
    });

    it("should returns defaultOpenKeys correctly", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
                routerInitialEntries: ["/refine/posts"],
            }),
        });

        expect(result.current.defaultOpenKeys).toEqual(["refine", "posts"]);
    });

    it("returns dashboard if hasDashboard from RefineContext is true", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                resources: [{ name: "posts" }],
                DashboardPage,
            }),
        });

        expect(result.current.menuItems).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "posts",
                    route: "/posts",
                    key: "/posts",
                    label: "Posts",
                }),
                expect.objectContaining({
                    name: "Dashboard",
                    route: `/`,
                    key: "dashboard",
                    label: "Dashboard",
                }),
            ]),
        );
    });

    it("doesnt return dashboard if hasDashboard from RefineContext is false", async () => {
        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
            }),
        });

        expect(result.current.menuItems).toEqual(
            expect.not.arrayContaining([
                expect.objectContaining({
                    name: "Dashboard",
                    route: `/`,
                    key: "dashboard",
                    label: "Dashboard",
                }),
            ]),
        );
    });

    it("should show label correctly", async () => {
        const i18nProvider = {
            translate: (key: string) => {
                const translations: Record<string, string> = {
                    "posts.posts": "Dummy Label",
                    "users.users": "Dummy Label",
                };

                return translations[key];
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            changeLocale: async () => {},
            getLocale: () => "en",
        };

        const { result } = renderHook(() => useMenu(), {
            wrapper: TestWrapper({
                dataProvider: MockJSONServer,
                i18nProvider,
                resources: [
                    { name: "posts" },
                    {
                        name: "categories",
                        options: { label: "categories label text" },
                    },
                    {
                        name: "users",
                        options: {
                            label: "users label text",
                        },
                    },
                ],
            }),
        });

        expect(result.current.menuItems).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "posts",
                    route: "/posts",
                    key: "/posts",
                    label: "Dummy Label",
                }),
                expect.objectContaining({
                    name: "categories",
                    route: "/categories",
                    key: "/categories",
                    label: "categories label text",
                }),
                expect.objectContaining({
                    name: "users",
                    route: "/users",
                    key: "/users",
                    label: "users label text",
                }),
            ]),
        );
    });
});
