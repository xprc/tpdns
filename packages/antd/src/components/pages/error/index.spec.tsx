import React from "react";
import { pageErrorTests } from "@pankod/refine-ui-tests";
import ReactRouterDom, { Route, Routes } from "react-router-dom";

import { ErrorComponent } from ".";
import { render, fireEvent, TestWrapper } from "@test";
import { act } from "react-dom/test-utils";

const mHistory = {
    push: jest.fn(),
    replace: jest.fn(),
};
jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as typeof ReactRouterDom),
    useHistory: jest.fn(() => mHistory),
}));

describe("ErrorComponent", () => {
    pageErrorTests.bind(this)(ErrorComponent);

    it("renders subtitle successfully", () => {
        const { getByText } = render(<ErrorComponent />, {
            wrapper: TestWrapper({}),
        });

        getByText("Sorry, the page you visited does not exist.");
    });

    it("renders button successfully", () => {
        const { container, getByText } = render(<ErrorComponent />, {
            wrapper: TestWrapper({}),
        });

        expect(container.querySelector("button")).toBeTruthy();
        getByText("Back Home");
    });

    xit("renders called function successfully if click the button", () => {
        const { getByText } = render(<ErrorComponent />, {
            wrapper: TestWrapper({}),
        });

        act(async () => {
            fireEvent.click(getByText("Back Home"));
        });

        expect(mHistory.push).toBeCalledWith("/");
    });

    it("renders error messages if resources action's not found", async () => {
        const { getByTestId, findByText } = render(
            <Routes>
                <Route path="/:resource/:action" element={<ErrorComponent />} />
            </Routes>,
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/posts/create"],
                }),
            },
        );

        fireEvent.mouseOver(getByTestId("error-component-tooltip"));

        expect(
            await findByText(
                `You may have forgotten to add the "create" component to "posts" resource.`,
            ),
        ).toBeInTheDocument();
    });

    it("renders error messages if resource action's is different from 'create, edit, show'", () => {
        const { getByText } = render(
            <Routes>
                <Route path="/:resource/:action" element={<ErrorComponent />} />
            </Routes>,
            {
                wrapper: TestWrapper({
                    routerInitialEntries: ["/posts/invalidActionType"],
                }),
            },
        );

        getByText("Sorry, the page you visited does not exist.");
    });
});
