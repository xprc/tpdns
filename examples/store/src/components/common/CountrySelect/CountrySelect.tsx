import { useOne } from "@pankod/refine-core";
import { useFormContext } from "@pankod/refine-react-hook-form";
import { Cart } from "@medusajs/medusa";

import { useCartContext } from "@lib/context";
import { NativeSelect } from "@components";

interface CountrySelectProps {
    registerName: string;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
    registerName,
}) => {
    const { cart } = useCartContext();

    const {
        register,
        formState: { errors, touchedFields },
    } = useFormContext();

    const { data: cartData } = useOne<{ cart: Cart }>({
        id: cart?.id || "",
        resource: "carts",
        queryOptions: {
            enabled: !!cart?.id,
        },
    });
    const countries = cartData?.data.cart.region.countries;

    return (
        <NativeSelect
            label="Country/Region"
            {...register(registerName, {
                required: "country is required",
            })}
            errors={errors}
            touched={touchedFields}
        >
            {countries?.map((country, index) => (
                <option key={index} value={country.iso_2}>
                    {country.display_name}
                </option>
            ))}
        </NativeSelect>
    );
};
