import React from "react";
import { RefineFieldFileProps } from "@pankod/refine-ui-types";

import { render } from "@test";

export const fieldFileTests = function (
    FileField: React.ComponentType<RefineFieldFileProps<any, any>>,
): void {
    describe("[@pankod/refine-ui-tests] Common Tests / File Field", () => {
        it("renders an anchor with file link", () => {
            const value = {
                title: "Test",
                src: "www.google.com",
            };

            const { getByTitle } = render(
                <FileField src={value.src} title={value.title} />,
            );

            expect(getByTitle(value.title)).toHaveAttribute("href", value.src);
        });

        it("renders an anchor with src", () => {
            const value = {
                src: "www.google.com",
            };

            const { getByText } = render(<FileField src={value.src} />);

            expect(getByText(value.src)).toHaveAttribute("href", value.src);
        });
    });
};
