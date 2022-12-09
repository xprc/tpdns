import { GetServerSideProps } from "next";
import { LayoutWrapper, GetListResponse, useTable } from "@pankod/refine-core";
import { DataProvider } from "@pankod/refine-strapi-v4";

import { API_URL } from "src/constants";
import { IProduct, IStore } from "src/interfaces";
import { Button, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import { ProductCard, FilterButton } from "src/components";

type ItemProps = {
    products: GetListResponse<IProduct>;
    stores: IStore[];
};

export const ProductList: React.FC<ItemProps> = ({ products, stores }) => {
    const { tableQueryResult, setFilters, current, setCurrent, pageSize } =
        useTable<IProduct>({
            resource: "products",
            queryOptions: {
                initialData: products,
            },
            initialPageSize: 9,
            metaData: { populate: ["image"] },
        });

    const totalPageCount = Math.ceil(
        (tableQueryResult.data?.total ?? 0) / pageSize,
    );

    return (
        <LayoutWrapper>
            <Flex mt={6} gap={2}>
                <FilterButton
                    setFilters={() =>
                        setFilters([
                            {
                                field: "stores][id]",
                                operator: "eq",
                                value: undefined,
                            },
                        ])
                    }
                >
                    <Text fontSize={{ base: "12px", md: "14px", lg: "14px" }}>
                        All Products
                    </Text>
                </FilterButton>
                {stores?.map((item) => {
                    return (
                        <FilterButton
                            key={item.id}
                            setFilters={() =>
                                setFilters([
                                    {
                                        field: "stores][id]",
                                        operator: "eq",
                                        value: item.id,
                                    },
                                ])
                            }
                        >
                            <Text
                                fontSize={{
                                    base: "12px",
                                    md: "14px",
                                    lg: "14px",
                                }}
                            >
                                {item.title}
                            </Text>
                        </FilterButton>
                    );
                })}
            </Flex>

            <SimpleGrid columns={[1, 2, 3]} mt={6} spacing={3}>
                {tableQueryResult.data?.data.map((item) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        cardImage={
                            item.image
                                ? API_URL + item.image.url
                                : "./error.png"
                        }
                    />
                ))}
            </SimpleGrid>

            <Flex justify={"flex-end"} mt={4} mb={4} gap={2}>
                {Array.from(Array(totalPageCount), (e, i) => {
                    if (current > totalPageCount) {
                        setCurrent(i);
                    }
                    return (
                        <Button
                            key={i}
                            colorScheme={"teal"}
                            onClick={() => setCurrent(i + 1)}
                        >
                            {i + 1}
                        </Button>
                    );
                })}
            </Flex>
        </LayoutWrapper>
    );
};

export default ProductList;

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await DataProvider(API_URL + "/api").getList<IProduct>({
        resource: "products",
        metaData: { populate: ["image"] },
        pagination: { current: 1, pageSize: 9 },
    });

    const { data: storesData } =
        (await DataProvider(API_URL + "/api").getMany?.({
            resource: "stores",
            ids: ["1", "2", "3"],
        })) ?? {};

    return {
        props: { products: data, stores: storesData },
    };
};
