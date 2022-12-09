import React from "react";
import { useOne, useTranslate, useResource } from "@pankod/refine-core";
import { RefineButtonTestIds } from "@pankod/refine-ui-types";
import { IconButton, Button } from "@chakra-ui/react";
import { IconRefresh } from "@tabler/icons";

import { RefreshButtonProps } from "../types";

/**
 * `<RefreshButton>` uses Chakra UI {@link https://chakra-ui.com/docs/components/button `<Button> `} component.
 * to update the data shown on the page via the {@link https://refine.dev/docs/core/hooks/data/useOne `useOne`} method provided by your dataProvider.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/chakra-ui/components/buttons/refresh-button} for more details.
 */
export const RefreshButton: React.FC<RefreshButtonProps> = ({
    resourceNameOrRouteName,
    recordItemId,
    hideText = false,
    metaData,
    dataProviderName,
    svgIconProps,
    children,
    onClick,
    ...rest
}) => {
    const { resourceName, id } = useResource({
        resourceNameOrRouteName,
        recordItemId,
    });

    const translate = useTranslate();

    const { refetch, isFetching } = useOne({
        resource: resourceName,
        id: id ?? "",
        queryOptions: {
            enabled: false,
        },
        metaData,
        liveMode: "off",
        dataProviderName,
    });

    return hideText ? (
        <IconButton
            variant="outline"
            aria-label={translate("buttons.refresh", "Refresh")}
            onClick={(e: React.PointerEvent<HTMLButtonElement>) =>
                onClick ? onClick(e) : refetch()
            }
            disabled={isFetching}
            data-testid={RefineButtonTestIds.RefreshButton}
            {...rest}
        >
            <IconRefresh size={20} {...svgIconProps} />
        </IconButton>
    ) : (
        <Button
            variant="outline"
            leftIcon={<IconRefresh size={20} {...svgIconProps} />}
            isLoading={isFetching}
            onClick={(e: React.PointerEvent<HTMLButtonElement>) =>
                onClick ? onClick(e) : refetch()
            }
            data-testid={RefineButtonTestIds.RefreshButton}
            {...rest}
        >
            {children ?? translate("buttons.refresh", "Refresh")}
        </Button>
    );
};
