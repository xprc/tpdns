import {
    IResourceComponentsProps,
    useMany,
    CrudFilters,
    HttpError,
} from "@pankod/refine-core";

import {
    List,
    Table,
    TextField,
    useTable,
    Space,
    EditButton,
    ShowButton,
    useSelect,
    Form,
    Input,
    Button,
    DatePicker,
    DateField,
    Card,
    Icons,
    Select,
    Tag,
    FormProps,
    Row,
    Col,
} from "@pankod/refine-antd";

import { IPost, ICategory, IPostFilterVariables } from "interfaces";

const { RangePicker } = DatePicker;

export const PostList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, searchFormProps } = useTable<
        IPost,
        HttpError,
        IPostFilterVariables
    >({
        onSearch: (params) => {
            const filters: CrudFilters = [];
            const { q, category, status, createdAt } = params;

            filters.push(
                {
                    field: "q",
                    operator: "eq",
                    value: q,
                },
                {
                    field: "category.id",
                    operator: "eq",
                    value: category,
                },
                {
                    field: "status",
                    operator: "eq",
                    value: status,
                },
                {
                    field: "createdAt",
                    operator: "gte",
                    value: createdAt ? createdAt[0].toISOString() : undefined,
                },
                {
                    field: "createdAt",
                    operator: "lte",
                    value: createdAt ? createdAt[1].toISOString() : undefined,
                },
            );

            return filters;
        },
    });

    const categoryIds =
        tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    const { data, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    return (
        <Row gutter={[16, 16]}>
            <Col lg={6} xs={24}>
                <Card title="Filters">
                    <Filter formProps={searchFormProps} />
                </Card>
            </Col>
            <Col lg={18} xs={24}>
                <List>
                    <Table {...tableProps} rowKey="id">
                        <Table.Column dataIndex="id" title="ID" />
                        <Table.Column dataIndex="title" title="Title" />
                        <Table.Column
                            dataIndex="status"
                            title="Status"
                            render={(value) => {
                                let color;
                                switch (value) {
                                    case "published":
                                        color = "green";
                                        break;
                                    case "rejected":
                                        color = "red";
                                        break;
                                    case "draft":
                                        color = "blue";
                                        break;
                                    default:
                                        color = "";
                                        break;
                                }
                                return <Tag color={color}>{value}</Tag>;
                            }}
                        />
                        <Table.Column
                            dataIndex="createdAt"
                            title="Created At"
                            render={(value) => (
                                <DateField format="LLL" value={value} />
                            )}
                        />
                        <Table.Column
                            dataIndex={["category", "id"]}
                            key="category.id"
                            title="Category"
                            render={(value) => {
                                if (isLoading) {
                                    return <TextField value="Loading..." />;
                                }

                                return (
                                    <TextField
                                        value={
                                            data?.data.find(
                                                (item) => item.id === value,
                                            )?.title
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
            </Col>
        </Row>
    );
};

const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
    const { selectProps: categorySelectProps } = useSelect<ICategory>({
        resource: "categories",
    });

    return (
        <Form layout="vertical" {...formProps}>
            <Form.Item label="Search" name="q">
                <Input
                    placeholder="ID, Title, Content, etc."
                    prefix={<Icons.SearchOutlined />}
                />
            </Form.Item>
            <Form.Item label="Status" name="status">
                <Select
                    allowClear
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
                    placeholder="Post Status"
                />
            </Form.Item>
            <Form.Item label="Category" name="category">
                <Select
                    {...categorySelectProps}
                    allowClear
                    placeholder="Search Categories"
                />
            </Form.Item>
            <Form.Item label="Created At" name="createdAt">
                <RangePicker />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary">
                    Filter
                </Button>
            </Form.Item>
        </Form>
    );
};
