import React, { useState } from "react";
import { useShow, IResourceComponentsProps } from "@pankod/refine-core";

import {
    List,
    Create,
    Edit,
    Show,
    Table,
    Form,
    Select,
    Input,
    Drawer,
    Space,
    Typography,
    EditButton,
    ShowButton,
    DeleteButton,
    useTable,
    useDrawerForm,
} from "@pankod/refine-antd";

import { IPost } from "../../interfaces";

const { Title, Text } = Typography;

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>();

    // Create Drawer
    const {
        formProps: createFormProps,
        drawerProps: createDrawerProps,
        show: createDrawerShow,
        saveButtonProps: createSaveButtonProps,
    } = useDrawerForm<IPost>({
        action: "create",
    });

    // Edit Drawer
    const {
        formProps: editFormProps,
        drawerProps: editDrawerProps,
        show: editDrawerShow,
        saveButtonProps: editSaveButtonProps,
        deleteButtonProps,
        id,
        formLoading,
    } = useDrawerForm<IPost>({
        action: "edit",
        warnWhenUnsavedChanges: true,
    });

    // Show Drawer
    const [visibleShowDrawer, setVisibleShowDrawer] = useState<boolean>(false);
    const { queryResult, showId, setShowId } = useShow<IPost>();

    const { data: showQueryResult, isLoading: showIsLoading } = queryResult;
    const record = showQueryResult?.data;

    return (
        <>
            <List
                canCreate
                createButtonProps={{
                    onClick: () => {
                        createDrawerShow();
                    },
                }}
            >
                <Table {...tableProps} rowKey="id">
                    <Table.Column dataIndex="id" title="ID" />
                    <Table.Column dataIndex="title" title="Title" />
                    <Table.Column<IPost>
                        title="Actions"
                        dataIndex="actions"
                        key="actions"
                        render={(_, record) => (
                            <Space>
                                <EditButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                    onClick={() => editDrawerShow(record.id)}
                                />
                                <ShowButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                    onClick={() => {
                                        setShowId(record.id);
                                        setVisibleShowDrawer(true);
                                    }}
                                />
                            </Space>
                        )}
                    />
                </Table>
            </List>
            <Drawer {...createDrawerProps}>
                <Create saveButtonProps={createSaveButtonProps}>
                    <Form {...createFormProps} layout="vertical">
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                options={[
                                    {
                                        label: "Published",
                                        value: "published",
                                    },
                                    {
                                        label: "Draft",
                                        value: "draft",
                                    },
                                    {
                                        label: "Rejected",
                                        value: "rejected",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Form>
                </Create>
            </Drawer>
            <Drawer {...editDrawerProps}>
                <Edit
                    recordItemId={id}
                    saveButtonProps={{
                        ...editSaveButtonProps,
                        disabled: formLoading,
                    }}
                    deleteButtonProps={deleteButtonProps}
                >
                    <Form {...editFormProps} layout="vertical">
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                options={[
                                    {
                                        label: "Published",
                                        value: "published",
                                    },
                                    {
                                        label: "Draft",
                                        value: "draft",
                                    },
                                    {
                                        label: "Rejected",
                                        value: "rejected",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Form>
                </Edit>
            </Drawer>
            <Drawer
                visible={visibleShowDrawer}
                onClose={() => setVisibleShowDrawer(false)}
                width="500"
            >
                <Show
                    isLoading={showIsLoading}
                    actionButtons={<DeleteButton recordItemId={showId} />}
                >
                    <Title level={5}>Id</Title>
                    <Text>{record?.id}</Text>

                    <Title level={5}>Status</Title>
                    <Text>{record?.status}</Text>

                    <Title level={5}>Title</Title>
                    <Text>{record?.title}</Text>
                </Show>
            </Drawer>
        </>
    );
};
