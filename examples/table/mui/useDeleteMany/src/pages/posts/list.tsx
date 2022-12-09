import React from "react";
import { Option, useSelect, useDeleteMany } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    Button,
    GridValueFormatterParams,
} from "@pankod/refine-mui";

import { ICategory, IPost } from "interfaces";

export const PostsList: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
        [],
    );
    const hasSelected = selectedRowKeys.length > 0;

    const { mutate } = useDeleteMany<IPost>();

    const deleteSelectedItems = () => {
        mutate(
            {
                resource: "posts",
                ids: selectedRowKeys.map(String),
            },
            {
                onSuccess: () => {
                    setSelectedRowKeys([]);
                },
            },
        );
    };

    const { dataGridProps } = useDataGrid<IPost>({
        initialPageSize: 10,
    });

    const {
        options,
        queryResult: { isLoading },
    } = useSelect<ICategory>({
        resource: "categories",
        hasPagination: false,
    });

    const columns = React.useMemo<GridColumns<IPost>>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "number",
                width: 50,
            },
            { field: "title", headerName: "Title", minWidth: 400, flex: 1 },
            {
                field: "category.id",
                headerName: "Category",
                type: "singleSelect",
                headerAlign: "left",
                align: "left",
                minWidth: 250,
                flex: 0.5,
                valueOptions: options,
                valueFormatter: (params: GridValueFormatterParams<Option>) => {
                    return params.value;
                },
                renderCell: function render({ row }) {
                    if (isLoading) {
                        return "Loading...";
                    }

                    const category = options.find(
                        (item) =>
                            item.value.toString() ===
                            row.category.id.toString(),
                    );
                    return category?.label;
                },
            },
            {
                field: "status",
                headerName: "Status",
                minWidth: 120,
                flex: 0.3,
                type: "singleSelect",
                valueOptions: ["draft", "published", "rejected"],
            },
        ],
        [options, isLoading],
    );

    return (
        <List
            cardProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
            headerButtons={
                <Button
                    onClick={deleteSelectedItems}
                    disabled={!hasSelected}
                    size="small"
                    variant="contained"
                    color="error"
                >
                    Delete Selected
                </Button>
            }
        >
            <DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
                checkboxSelection
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectedRowKeys(newSelectionModel as React.Key[]);
                }}
                rowsPerPageOptions={[10, 20, 50, 100]}
                selectionModel={selectedRowKeys}
            />
        </List>
    );
};
