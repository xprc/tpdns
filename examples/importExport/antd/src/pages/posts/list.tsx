import {
    useMany,
    useExport,
    IResourceComponentsProps,
} from "@pankod/refine-core";

import {
    useTable,
    useImport,
    Space,
    Table,
    EditButton,
    ShowButton,
    List,
    TextField,
    ExportButton,
    ImportButton,
} from "@pankod/refine-antd";

import { IPost, ICategory, IPostFile } from "interfaces";

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IPost>();

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const importProps = useImport<IPostFile>({
        mapData: (item) => {
            return {
                title: item.title,
                content: item.content,
                status: item.status,
                category: {
                    id: item.categoryId,
                },
                user: {
                    id: item.userId,
                },
            };
        },
    });

    const { triggerExport, isLoading: exportLoading } = useExport<IPost>({
        mapData: (item) => {
            return {
                id: item.id,
                title: item.title,
                slug: item.slug,
                content: item.content,
                status: item.status,
                categoryId: item.category.id,
                userId: item.user?.id,
            };
        },
    });

    return (
        <List
            pageHeaderProps={{
                extra: (
                    <Space>
                        <ImportButton {...importProps} />
                        <ExportButton
                            onClick={triggerExport}
                            loading={exportLoading}
                        />
                    </Space>
                ),
            }}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="ID" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.title
                                }
                            />
                        );
                    }}
                />
                <Table.Column<IPost>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
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
