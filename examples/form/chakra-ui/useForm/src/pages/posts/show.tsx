import { useShow, useOne } from "@pankod/refine-core";
import {
    Show,
    Heading,
    Text,
    MarkdownField,
    Spacer,
} from "@pankod/refine-chakra-ui";

import { ICategory, IPost } from "../../interfaces";

export const PostShow: React.FC = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: categoryData } = useOne<ICategory>({
        resource: "categories",
        id: record?.category.id || "",
        queryOptions: {
            enabled: !!record?.category.id,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Heading as="h5" size="sm">
                Id
            </Heading>
            <Text mt={2}>{record?.id}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Title
            </Heading>
            <Text mt={2}>{record?.title}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Status
            </Heading>
            <Text mt={2}>{record?.status}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Category
            </Heading>
            <Text mt={2}>{categoryData?.data?.title}</Text>

            <Heading as="h5" size="sm" mt={4}>
                Content
            </Heading>
            <Spacer mt={2} />
            <MarkdownField value={record?.content} />
        </Show>
    );
};
