import React from "react";
import { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";
import { GetManyResponse, useMany } from "@pankod/refine-core";
import {
    List,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    HStack,
    Box,
    EditButton,
    Select,
    DateField,
} from "@pankod/refine-chakra-ui";
import { useModalForm } from "@pankod/refine-react-hook-form";

import {
    ColumnFilter,
    ColumnSorter,
    Pagination,
    CreatePostModal,
    EditPostModal,
} from "../../components";

import { FilterElementProps, ICategory, IPost } from "../../interfaces";

export const PostList: React.FC = () => {
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

    const columns = React.useMemo<ColumnDef<IPost>[]>(
        () => [
            {
                id: "id",
                header: "ID",
                accessorKey: "id",
                enableColumnFilter: false,
            },
            {
                id: "title",
                header: "Title",
                accessorKey: "title",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "status",
                header: "Status",
                accessorKey: "status",
                meta: {
                    filterElement: function render(props: FilterElementProps) {
                        return (
                            <Select
                                borderRadius="md"
                                size="sm"
                                placeholder="All Status"
                                {...props}
                            >
                                <option value="published">published</option>
                                <option value="draft">draft</option>
                                <option value="rejected">rejected</option>
                            </Select>
                        );
                    },
                    filterOperator: "eq",
                },
            },
            {
                id: "category.id",
                header: "Category",
                enableColumnFilter: false,
                accessorKey: "category.id",
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoriesData: GetManyResponse<ICategory>;
                    };
                    const category = meta.categoriesData?.data.find(
                        (item) => item.id === getValue(),
                    );
                    return category?.title ?? "Loading...";
                },
            },
            {
                id: "createdAt",
                header: "Created At",
                accessorKey: "createdAt",
                cell: function render({ getValue }) {
                    return (
                        <DateField value={getValue() as string} format="LLL" />
                    );
                },
                enableColumnFilter: false,
            },
            {
                id: "actions",
                header: "Actions",
                accessorKey: "id",
                enableColumnFilter: false,
                enableSorting: false,
                cell: function render({ getValue }) {
                    return (
                        <HStack>
                            <EditButton
                                hideText
                                onClick={() =>
                                    showEditModal(getValue() as number)
                                }
                            />
                        </HStack>
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
        refineCoreProps: {
            initialSorter: [
                {
                    field: "id",
                    order: "desc",
                },
            ],
        },
    });

    const categoryIds = tableData?.data?.map((item) => item.category.id) ?? [];
    const { data: categoriesData } = useMany<ICategory>({
        resource: "categories",
        ids: categoryIds,
        queryOptions: {
            enabled: categoryIds.length > 0,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoriesData,
        },
    }));

    return (
        <>
            <List createButtonProps={{ onClick: () => showCreateModal() }}>
                <TableContainer whiteSpace="pre-line">
                    <Table variant="simple">
                        <Thead>
                            {getHeaderGroups().map((headerGroup) => (
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <Th key={header.id}>
                                                {!header.isPlaceholder && (
                                                    <HStack spacing="xs">
                                                        <Box>
                                                            {flexRender(
                                                                header.column
                                                                    .columnDef
                                                                    .header,
                                                                header.getContext(),
                                                            )}
                                                        </Box>
                                                        <HStack spacing="xs">
                                                            <ColumnSorter
                                                                column={
                                                                    header.column
                                                                }
                                                            />
                                                            <ColumnFilter
                                                                column={
                                                                    header.column
                                                                }
                                                            />
                                                        </HStack>
                                                    </HStack>
                                                )}
                                            </Th>
                                        );
                                    })}
                                </Tr>
                            ))}
                        </Thead>
                        <Tbody>
                            {getRowModel().rows.map((row) => {
                                return (
                                    <Tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <Td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext(),
                                                    )}
                                                </Td>
                                            );
                                        })}
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Pagination
                    current={current}
                    pageCount={pageCount}
                    setCurrent={setCurrent}
                />
            </List>
            <CreatePostModal {...createModalFormProps} />
            <EditPostModal {...editModalFormProps} />
        </>
    );
};
