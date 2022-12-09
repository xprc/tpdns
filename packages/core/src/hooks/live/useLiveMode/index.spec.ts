import { renderHook } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useLiveMode } from "./";
import { defaultRefineOptions } from "@contexts/refine";
import { IRefineContextProvider } from "../../../interfaces";

const mockRefineProvider: IRefineContextProvider = {
    hasDashboard: false,
    ...defaultRefineOptions,
    options: defaultRefineOptions,
};

describe("useLiveMode Hook", () => {
    it("context: auto, params: off -> returns off", async () => {
        const { result } = renderHook(() => useLiveMode("off"), {
            wrapper: TestWrapper({
                refineProvider: {
                    ...mockRefineProvider,
                    liveMode: "auto",
                },
            }),
        });

        expect(result.current).toBe("off");
    });

    it("returns context value", async () => {
        const { result } = renderHook(() => useLiveMode(undefined), {
            wrapper: TestWrapper({
                refineProvider: {
                    ...mockRefineProvider,
                    liveMode: "auto",
                },
            }),
        });

        expect(result.current).toBe("auto");
    });
});
