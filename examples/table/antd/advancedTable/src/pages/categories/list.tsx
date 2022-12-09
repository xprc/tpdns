import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    Space,
    EditButton,
    ShowButton,
    BooleanField,
} from "@pankod/refine-antd";

import { ICategory, IPost } from "interfaces";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<ICategory>();

    return (
        <List>
            <Table
                expandable={{
                    expandedRowRender,
                }}
                {...tableProps}
                rowKey="id"
                scroll={{ x: 400 }}
            >
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex="active"
                    title="Active"
                    align="center"
                    render={(value) => {
                        return <BooleanField value={value} />;
                    }}
                />
                <Table.Column<ICategory>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

const CategoryPostsTable: React.FC<{ record: ICategory }> = ({ record }) => {
    const { tableProps: postTableProps } = useTable<IPost>({
        resource: "posts",
        permanentFilter: [
            {
                field: "category.id",
                operator: "eq",
                value: record.id,
            },
        ],
    });

    return (
        <Table {...postTableProps} rowKey="id">
            <Table.Column dataIndex="id" title="ID" />
            <Table.Column dataIndex="title" title="Title" />
            <Table.Column dataIndex="status" title="Status" align="center" />
            <Table.Column<IPost>
                title="Actions"
                dataIndex="actions"
                render={(_, record) => (
                    <Space>
                        <EditButton
                            size="small"
                            resourceName="posts"
                            recordItemId={record.id}
                        />
                        <ShowButton
                            size="small"
                            resourceName="posts"
                            recordItemId={record.id}
                        />
                    </Space>
                )}
            />
        </Table>
    );
};

const expandedRowRender = (record: ICategory) => {
    return <CategoryPostsTable record={record} />;
};
