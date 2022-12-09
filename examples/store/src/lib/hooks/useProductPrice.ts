import { useMemo } from "react";
import { useList } from "@pankod/refine-core";
import { Product } from "@medusajs/medusa";
import { formatAmount } from "medusa-react";

import { CalculatedVariant } from "../../types/medusa";
import { useCartContext } from "@lib/context";

interface UseProductPriceProps {
    id: string;
    variantId?: string;
}

export const useProductPrice = ({ id, variantId }: UseProductPriceProps) => {
    const { cart } = useCartContext();

    const {
        data: productData,
        isLoading,
        isError,
    } = useList<Product>({
        resource: "products",
        config: {
            filters: [
                {
                    field: "id",
                    value: id,
                    operator: "eq",
                },
                {
                    field: "cart_id",
                    value: cart?.id,
                    operator: "eq",
                },
            ],
        },
        queryOptions: {
            enabled: !!cart?.id,
        },
    });

    const product = productData?.data[0];

    const getPercentageDiff = (original: number, calculated: number) => {
        const diff = original - calculated;
        const decrease = (diff / original) * 100;

        return decrease.toFixed();
    };

    const cheapestPrice = useMemo(() => {
        if (!product || !cart?.region) {
            return null;
        }

        const variants = product.variants as CalculatedVariant[];

        const cheapestVariant = variants.reduce((prev, curr) => {
            return prev.calculated_price < curr.calculated_price ? prev : curr;
        });

        return {
            calculated_price: formatAmount({
                amount: cheapestVariant.calculated_price,
                region: cart.region,
                includeTaxes: false,
            }),
            original_price: formatAmount({
                amount: cheapestVariant.original_price,
                region: cart.region,
                includeTaxes: false,
            }),
            price_type: cheapestVariant.calculated_price_type,
            percentage_diff: getPercentageDiff(
                cheapestVariant.original_price,
                cheapestVariant.calculated_price,
            ),
        };
    }, [product, cart]);

    const variantPrice = useMemo(() => {
        if (!product || !variantId || !cart?.region) {
            return null;
        }

        const variant = product.variants.find(
            (v) => v.id === variantId || v.sku === variantId,
        ) as CalculatedVariant;

        if (!variant) {
            return null;
        }

        return {
            calculated_price: formatAmount({
                amount: variant.calculated_price,
                region: cart.region,
                includeTaxes: false,
            }),
            original_price: formatAmount({
                amount: variant.original_price,
                region: cart.region,
                includeTaxes: false,
            }),
            price_type: variant.calculated_price_type,
            percentage_diff: getPercentageDiff(
                variant.original_price,
                variant.calculated_price,
            ),
        };
    }, [product, variantId, cart]);

    return {
        product,
        cheapestPrice,
        variantPrice,
        isLoading,
        isError,
    };
};
