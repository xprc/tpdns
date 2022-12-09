import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    EditButton,
    DeleteButton,
    DateField,
    List,
    Stack,
} from "@pankod/refine-mui";

import { IPost } from "interfaces";

export const PostList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>({
        metaData: {
            populate: ["category"],
        },
    });

    const columns = React.useMemo<GridColumns<IPost>>(
        () => [
            { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
            {
                field: "category.title",
                headerName: "Category",
                minWidth: 250,
                flex: 1,
                renderCell: function render({ row }) {
                    return row.category?.title;
                },
            },

            {
                field: "createdAt",
                headerName: "CreatedAt",
                minWidth: 220,
                renderCell: function render({ row }) {
                    return <DateField format="LLL" value={row.createdAt} />;
                },
            },
            {
                headerName: "Actions",
                headerAlign: "center",
                field: "actions",
                minWidth: 180,
                align: "center",
                flex: 1,
                sortable: false,
                renderCell: function render({ row }) {
                    return (
                        <Stack direction="row" spacing={1}>
                            <EditButton
                                size="small"
                                hideText
                                recordItemId={row.id}
                            />
                            <DeleteButton
                                size="small"
                                hideText
                                recordItemId={row.id}
                            />
                        </Stack>
                    );
                },
            },
        ],
        [],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
