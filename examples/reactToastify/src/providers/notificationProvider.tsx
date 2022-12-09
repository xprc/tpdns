import React from "react";
import { NotificationProvider } from "@pankod/refine-core";
import { toast } from "react-toastify";
import { UndoableNotification } from "components/undoableNotification";

export const notificationProvider: NotificationProvider = {
    open: ({ key, message, type, undoableTimeout, cancelMutation }) => {
        if (type === "progress") {
            if (toast.isActive(key as React.ReactText)) {
                toast.update(key as React.ReactText, {
                    progress: undoableTimeout && (undoableTimeout / 10) * 2,
                    render: (
                        <UndoableNotification
                            message={message}
                            cancelMutation={cancelMutation}
                        />
                    ),
                    type: "default",
                });
            } else {
                toast(
                    <UndoableNotification
                        message={message}
                        cancelMutation={cancelMutation}
                    />,
                    {
                        toastId: key,
                        updateId: key,
                        closeOnClick: false,
                        closeButton: false,
                        autoClose: false,
                        progress: undoableTimeout && (undoableTimeout / 10) * 2,
                    },
                );
            }
        } else {
            if (toast.isActive(key as React.ReactText)) {
                toast.update(key as React.ReactText, {
                    render: message,
                    closeButton: true,
                    autoClose: 5000,
                    type,
                });
            } else {
                toast(message, {
                    toastId: key,
                    type,
                });
            }
        }
    },
    close: (key) => toast.dismiss(key),
};
