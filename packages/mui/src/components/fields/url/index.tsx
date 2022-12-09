import React from "react";
import { Typography, Link } from "@mui/material";

import { UrlFieldProps } from "../types";

/**
 * This field lets you embed a link.It uses the {@link https://mui.com/material-ui/react-typography/#main-content `<Typography>` }
 * and {@link https://mui.com/material-ui/react-link/#main-content `<Link>`} components from Material UI.
 * You can pass a URL in its `value` property and you can show a text in its place by passing any `children`.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/fields/url} for more details.
 */
export const UrlField: React.FC<UrlFieldProps> = ({
    children,
    value,
    ...rest
}) => {
    return (
        <Typography variant="body2">
            <Link href={value} {...rest}>
                {children ?? value}
            </Link>
        </Typography>
    );
};
