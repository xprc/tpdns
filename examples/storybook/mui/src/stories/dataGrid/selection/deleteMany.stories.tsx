import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
    Button,
    DataGrid,
    GridColumns,
    useDataGrid,
    GridSelectionModel,
    Box,
} from "@pankod/refine-mui";
import { useDeleteMany } from "@pankod/refine-core";

import { RefineWithoutLayout } from "../../../../.storybook/preview";

export default {
    title: "Hooks / DataGrid / Selection",
    component: DataGrid,
    decorators: [(Story) => RefineWithoutLayout(Story)],
} as ComponentMeta<typeof DataGrid>;

const columns: GridColumns = [
    {
        field: "id",
        headerName: "ID",
        type: "number",
    },
    { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
    { field: "status", headerName: "Status", flex: 1 },
];

interface CustomToolbarProps {
    selectedRowIds: GridSelectionModel[];
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ selectedRowIds }) => {
    const { mutate } = useDeleteMany();

    return (
        <Box
            sx={{
                justifyContent: "center",
                display: "flex",
                borderBottom: 1,
                borderColor: "divider",
            }}
        >
            <Button
                disabled={selectedRowIds.length === 0}
                color="error"
                onClick={() => {
                    mutate({
                        resource: "posts",
                        ids: selectedRowIds.map(String),
                    });
                }}
            >
                Delete Selected
            </Button>
        </Box>
    );
};

export const DeleteMany: ComponentStory<typeof DataGrid> = () => {
    const { dataGridProps } = useDataGrid();

    const [selectedRowIds, setSelectedRowIds] = useState<GridSelectionModel>(
        [],
    );

    return (
        <div style={{ height: 700, width: "100%" }}>
            <DataGrid
                {...dataGridProps}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(newSelectionModel) => {
                    setSelectedRowIds(newSelectionModel);
                }}
                components={{
                    Toolbar: CustomToolbar,
                }}
                componentsProps={{
                    toolbar: {
                        selectedRowIds,
                    },
                }}
            />
        </div>
    );
};
