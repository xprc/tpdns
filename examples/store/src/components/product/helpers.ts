// import type { Product } from "@commerce/types/product";
export type SelectedOptions = Record<string, string | null>;
import { Dispatch, SetStateAction } from "react";
import Medusa from "@medusajs/medusa-js";
import { Product } from "@medusajs/medusa";

export type MedusaProduct = Awaited<
    ReturnType<Medusa["products"]["list"]>
>["products"][number];

export function getProductVariant(product: Product, opts: SelectedOptions) {
    const variant = product?.variants.find((variant) => {
        return Object.entries(opts).every(([_key, value]) =>
            variant.options.find((option) => {
                return (
                    option.value.toLocaleLowerCase() ===
                    value?.toLocaleLowerCase()
                );
            }),
        );
    });
    return variant;
}

export function selectDefaultOptionFromProduct(
    product: Product,
    updater?: Dispatch<SetStateAction<SelectedOptions>>,
): SelectedOptions {
    const selectedOptions: Record<string, string> = {};
    // Selects the default option
    product.variants[0]?.options?.forEach((v) => {
        const option = product.options.find(
            (o) => o.id.toLowerCase() === v.option_id.toLowerCase(),
        );

        if (option) {
            selectedOptions[option.title.toLowerCase()] = v.value.toLowerCase();
        }
    });
    updater?.(selectedOptions);
    return selectedOptions;
}

export function currencySymbolFromCode(code: string) {
    switch (code.toLowerCase()) {
        case "usd":
            return "$";
        case "eur":
            return "€";
        case "gbp":
            return "£";
        default:
            return code;
    }
}
