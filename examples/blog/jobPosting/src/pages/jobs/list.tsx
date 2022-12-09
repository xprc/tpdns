import {
    List,
    Table,
    TextField,
    useTable,
    IResourceComponentsProps,
    getDefaultSortOrder,
    Space,
    EditButton,
    DeleteButton,
    TagField,
    ShowButton,
    useSelect,
    FilterDropdown,
} from "@pankod/refine";
import { ICompany, IJob } from "interfaces";
import Select from "rc-select";

export const JobList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable<IJob>({
        initialSorter: [
            {
                field: "id",
                order: "desc",
            },
        ],
    });

    const { selectProps: companySelectProps } = useSelect<ICompany>({
        resource: "companies",
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    key="id"
                    title="ID"
                    render={(value) => <TextField value={value} />}
                    defaultSortOrder={getDefaultSortOrder("id", sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex={["company", "name"]}
                    title="Company"
                    filterDropdown={(props) => (
                        <FilterDropdown {...props}>
                            <Select
                                style={{ minWidth: 200 }}
                                mode="multiple"
                                placeholder="Select Company"
                                {...companySelectProps}
                            />
                        </FilterDropdown>
                    )}
                />
                <Table.Column
                    dataIndex="title"
                    key="title"
                    title="Title"
                    render={(value) => <TextField value={value} />}
                    defaultSortOrder={getDefaultSortOrder("title", sorter)}
                    sorter
                />
                <Table.Column
                    dataIndex="isActive"
                    key="isActive"
                    title="Is Active"
                    render={(value) => <TagField value={value} />}
                    defaultSortOrder={getDefaultSortOrder("status", sorter)}
                    sorter
                />
                <Table.Column<IJob>
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
                            <DeleteButton
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
