import { renderHook } from "@testing-library/react";
import { TestWrapper } from "@test";

import { useHandleNotification } from "./";
import { OpenNotificationParams } from "../../../interfaces";

const dummyNotification: OpenNotificationParams = {
    key: "notification",
    type: "success",
    message: "test",
    description: "i am here!!",
};

const openMock = jest.fn();
const closeMock = jest.fn();

describe("useHandleNotification Hook", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const { result } = renderHook(() => useHandleNotification(), {
        wrapper: TestWrapper({
            notificationProvider: {
                open: openMock,
                close: closeMock,
            },
        }),
    });

    it("should call notification open when notification passed", async () => {
        result.current(dummyNotification);

        expect(openMock).toHaveBeenCalledTimes(1);
        expect(openMock).toHaveBeenCalledWith(dummyNotification);
    });

    it("should not call notification open when notification passed false", async () => {
        result.current(false);

        expect(openMock).toHaveBeenCalledTimes(0);
    });

    it("should not call notification open when notification passed to false and passed a fallback notification", async () => {
        result.current(false, dummyNotification);

        expect(openMock).toHaveBeenCalledTimes(0);
    });

    it("should work first notification when passed notification with fallback notification ", async () => {
        result.current(
            {
                ...dummyNotification,
                message: "i am here!",
            },
            dummyNotification,
        );

        expect(openMock).toHaveBeenCalledTimes(1);
        expect(openMock).toHaveBeenCalledWith({
            ...dummyNotification,
            message: "i am here!",
        });
    });

    it("should work fallback notification when not passed notification and passed fallback notification ", async () => {
        result.current(undefined, {
            ...dummyNotification,
            message: "i am here too!",
        });

        expect(openMock).toHaveBeenCalledTimes(1);
        expect(openMock).toHaveBeenCalledWith({
            ...dummyNotification,
            message: "i am here too!",
        });
    });
});
