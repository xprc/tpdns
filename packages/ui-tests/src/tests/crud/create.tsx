import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    RefineCrudCreateProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";

import { ITestWrapperProps, render, TestWrapper } from "@test";

const renderCreate = (
    create: React.ReactNode,
    wrapperProps?: ITestWrapperProps,
) => {
    return render(
        <Routes>
            <Route path="/:resource/:action" element={create} />
        </Routes>,
        {
            wrapper: TestWrapper(
                wrapperProps
                    ? wrapperProps
                    : {
                          routerInitialEntries: ["/posts/create"],
                      },
            ),
        },
    );
};

export const crudCreateTests = function (
    Create: React.ComponentType<
        RefineCrudCreateProps<any, any, any, any, any, any, {}>
    >,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / CRUD Create", () => {
        beforeAll(() => {
            jest.spyOn(console, "warn").mockImplementation(jest.fn());
        });

        it("should render children", async () => {
            const { getByText } = renderCreate(<Create>Something</Create>);

            getByText("Something");
        });

        it("should render default save button successfuly", async () => {
            const { queryByTestId } = renderCreate(<Create></Create>);

            expect(
                queryByTestId(RefineButtonTestIds.SaveButton),
            ).not.toBeNull();
        });

        it("should render optional button with actionButtons prop", async () => {
            const { container, getByText } = renderCreate(
                <Create footerButtons={<button>Optional Button</button>} />,
            );

            expect(container.querySelector("button")).toBeTruthy();
            getByText("Optional Button");
        });

        it("should render default title successfuly", async () => {
            const { getByText } = renderCreate(<Create />);

            getByText("Create Post");
        });

        it("should render with label instead of resource name successfully", async () => {
            const { getByText } = renderCreate(<Create />, {
                resources: [
                    {
                        name: "posts",
                        options: { route: "posts", label: "test label" },
                    },
                ],
                routerInitialEntries: ["/posts/create"],
            });

            getByText("Create Test label");
        });

        it("should render optional title with title prop", async () => {
            const { getByText } = renderCreate(<Create title="New Title" />);

            getByText("New Title");
        });

        it("should render optional resource with resource prop", async () => {
            const { queryByText } = renderCreate(<Create resource="posts" />, {
                routerInitialEntries: ["/custom"],
            });

            queryByText("Create Post");
        });

        it("should render tags", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource/:action/:id"
                        element={<Create />}
                    ></Route>
                </Routes>,
                {
                    wrapper: TestWrapper({
                        routerInitialEntries: ["/posts/clone/1"],
                    }),
                },
            );

            getByText("Create Post");
        });
    });
};
