import React from "react";
import dayjs from "dayjs";
import { Typography } from "antd";

import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

const defaultLocale = dayjs.locale();

import { DateFieldProps } from "../types";

/**
 * This field is used to display dates. It uses {@link https://day.js.org/docs/en/display/format `Day.js`} to display date format.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/fields/date} for more details.
 */
export const DateField: React.FC<DateFieldProps> = ({
    value,
    locales,
    format: dateFormat = "L",
    ...rest
}) => {
    const { Text } = Typography;

    return (
        <Text {...rest}>
            {dayjs(value)
                .locale(locales || defaultLocale)
                .format(dateFormat)}
        </Text>
    );
};
