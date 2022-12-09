import React from "react";
import { Button, notification, Progress } from "antd";
import { OpenNotificationParams } from "@pankod/refine-core";
import { UndoOutlined } from "@ant-design/icons";

export type UndoableNotificationProps = {
    notificationKey: OpenNotificationParams["key"];
    message: OpenNotificationParams["message"];
    cancelMutation: OpenNotificationParams["cancelMutation"];
    undoableTimeout: OpenNotificationParams["undoableTimeout"];
};

export const UndoableNotification: React.FC<UndoableNotificationProps> = ({
    notificationKey,
    message,
    cancelMutation,
    undoableTimeout,
}) => (
    <div
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "-7px",
        }}
    >
        <Progress
            type="circle"
            percent={(undoableTimeout ?? 0) * 20}
            format={(time) => time && time / 20}
            width={50}
            strokeColor="#1890ff"
            status="normal"
        />
        <span style={{ marginLeft: 8, width: "100%" }}>{message}</span>
        <Button
            style={{ flexShrink: 0 }}
            onClick={() => {
                cancelMutation?.();
                notification.close(notificationKey ?? "");
            }}
            disabled={undoableTimeout === 0}
            icon={<UndoOutlined />}
        ></Button>
    </div>
);
