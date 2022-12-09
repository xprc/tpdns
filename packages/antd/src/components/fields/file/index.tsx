import React from "react";

import { UrlField } from "@components";
import { FileFieldProps } from "../types";

/**
 * This field is used to display files and uses {@link https://ant.design/components/typography `<Typography.Link>`} from Ant Design.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/file} for more details.
 */
export const FileField: React.FC<FileFieldProps> = ({
    title,
    src,
    ...rest
}) => {
    return (
        <UrlField value={src} title={title} {...rest}>
            {title ?? src}
        </UrlField>
    );
};
