import React from "react";
import { Route, Routes } from "react-router-dom";
import {
    RefineCrudShowProps,
    RefineButtonTestIds,
} from "@pankod/refine-ui-types";
import { AccessControlProvider } from "@pankod/refine-core";

import { ITestWrapperProps, render, TestWrapper } from "@test";

const renderShow = (
    show: React.ReactNode,
    accessControlProvider?: AccessControlProvider,
    wrapperProps?: ITestWrapperProps,
) => {
    return render(
        <Routes>
            <Route path="/:resource/:action/:id" element={show} />
        </Routes>,
        {
            wrapper: TestWrapper(
                wrapperProps
                    ? wrapperProps
                    : {
                          routerInitialEntries: ["/posts/show/1"],
                          accessControlProvider,
                      },
            ),
        },
    );
};

export const crudShowTests = function (
    Show: React.ComponentType<RefineCrudShowProps<any, any, any, any, any, {}>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / CRUD Show", () => {
        beforeAll(() => {
            jest.spyOn(console, "warn").mockImplementation(jest.fn());
        });

        it("should render children", async () => {
            const { getByText } = renderShow(<Show>Something</Show>);

            getByText("Something");
        });

        it("should render default edit and delete buttons successfuly", async () => {
            const { queryByTestId } = renderShow(<Show canEdit canDelete />);

            expect(
                queryByTestId(RefineButtonTestIds.EditButton),
            ).not.toBeNull();
            expect(
                queryByTestId(RefineButtonTestIds.DeleteButton),
            ).not.toBeNull();
        });

        it("should render optional buttons with actionButtons prop", async () => {
            const { findByText } = renderShow(
                <Show
                    headerButtons={
                        <>
                            <button>New Save Button</button>
                            <button>New Delete Button</button>
                        </>
                    }
                />,
            );

            await findByText("New Save Button");
            await findByText("New Delete Button");
        });

        it("should render default title successfuly", async () => {
            const { getByText } = renderShow(<Show />);

            getByText("Show Post");
        });

        it("should render optional title with title prop", async () => {
            const { getByText } = renderShow(<Show title="Test Title" />);

            getByText("Test Title");
        });

        it("should render optional resource with resource prop", async () => {
            const { getByText } = render(
                <Routes>
                    <Route
                        path="/:resource"
                        element={<Show resource="posts" />}
                    ></Route>
                </Routes>,
                {
                    wrapper: TestWrapper({
                        routerInitialEntries: ["/custom"],
                    }),
                },
            );

            getByText("Show Post");
        });
    });
};
