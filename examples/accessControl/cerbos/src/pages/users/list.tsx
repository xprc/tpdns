import { IResourceComponentsProps } from "@pankod/refine-core";

import {
    List,
    Table,
    useTable,
    Space,
    EditButton,
    DeleteButton,
    ShowButton,
    EmailField,
} from "@pankod/refine-antd";

import { IUser } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable<IUser>();

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="firstName" title="First Name" />
                <Table.Column dataIndex="lastName" title="Last Name" />
                <Table.Column
                    dataIndex="email"
                    title="Email"
                    render={(value) => <EmailField value={value} />}
                />
                <Table.Column<IUser>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <Space>
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <EditButton
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
