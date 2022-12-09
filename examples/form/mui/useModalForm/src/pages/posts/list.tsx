import React from "react";
import { useMany } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    List,
    EditButton,
} from "@pankod/refine-mui";
import { useModalForm } from "@pankod/refine-react-hook-form";

import { CreatePostModal, EditPostModal } from "components";
import { ICategory, IPost } from "interfaces";

export const PostsList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>();

    const categoryIds = dataGridProps.rows.map((item) => item.category.id);
    const { data: categoriesData, isLoading } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    const createModalFormProps = useModalForm<IPost>({
        refineCoreProps: { action: "create" },
    });
    const {
        modal: { show: showCreateModal },
    } = createModalFormProps;

    const editModalFormProps = useModalForm<IPost>({
        refineCoreProps: { action: "edit" },
    });
    const {
        modal: { show: showEditModal },
    } = editModalFormProps;

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
                type: "number",
                headerAlign: "left",
                align: "left",
                minWidth: 250,
                flex: 0.5,
                renderCell: function render({ row }) {
                    if (isLoading) {
                        return "Loading...";
                    }

                    const category = categoriesData?.data.find(
                        (item) => item.id === row.category.id,
                    );
                    return category?.title;
                },
            },
            { field: "status", headerName: "Status", minWidth: 120, flex: 0.3 },
            {
                field: "actions",
                headerName: "Actions",
                renderCell: function render({ row }) {
                    return (
                        <EditButton
                            hideText
                            onClick={() => showEditModal(row.id)}
                        />
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [],
    );

    return (
        <>
            <List createButtonProps={{ onClick: () => showCreateModal() }}>
                <DataGrid {...dataGridProps} columns={columns} autoHeight />
            </List>
            <CreatePostModal {...createModalFormProps} />
            <EditPostModal {...editModalFormProps} />
        </>
    );
};
