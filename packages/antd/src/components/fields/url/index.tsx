import React from "react";
import { Typography } from "antd";

const { Link } = Typography;

import { UrlFieldProps } from "../types";

/**
 * This field lets you embed a link. It uses Ant Design's {@link https://ant.design/components/typography/ `<Typography.Link>`} component.
 * You can pass a URL in its `value` property and you can show a text in its place by passing any `children`.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/url} for more details.
 */
export const UrlField: React.FC<UrlFieldProps> = ({
    children,
    value,
    ...rest
}) => {
    return (
        <Link href={value} {...rest}>
            {children ?? value}
        </Link>
    );
};
