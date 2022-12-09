import React from "react";
import { RefineFieldBooleanProps } from "@pankod/refine-ui-types";

import { act, fireEvent, render } from "@test";

export const fieldBooleanTests = function (
    BooleanField: React.ComponentType<
        RefineFieldBooleanProps<unknown, any, any>
    >,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / Boolean Field", () => {
        xit("should use prop for custom text", async () => {
            const baseDom = render(
                <BooleanField value={true} valueLabelTrue="test" />,
            );

            const booleanField = baseDom.getByTestId("custom-field");

            act(() => {
                fireEvent.mouseOver(booleanField);
            });

            expect(baseDom.getByLabelText("test")).toBeInTheDocument();
        });

        it("renders value with prop for custom icon", () => {
            const { getByTestId } = render(
                <div data-testid="custom-field">
                    <BooleanField
                        value={true}
                        trueIcon={<div data-testid="icon-custom-element" />}
                    />
                </div>,
            );

            expect(getByTestId("icon-custom-element")).toBeTruthy();
        });
    });
};
