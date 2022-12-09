import React from "react";
import { Option, useSelect } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    GridValueFormatterParams,
} from "@pankod/refine-mui";

import { ICategory, IPost } from "interfaces";

export const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>({
        initialCurrent: 2,
        initialPageSize: 10,
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "status",
                operator: "eq",
                value: "draft",
            },
        ],
        syncWithLocation: true,
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
        <List>
            <DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
                rowsPerPageOptions={[10, 20, 30, 50, 100]}
            />
        </List>
    );
};
