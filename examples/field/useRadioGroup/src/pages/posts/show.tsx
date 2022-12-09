import { useShow, IResourceComponentsProps, useOne } from "@pankod/refine-core";

import { Show, Typography, MarkdownField } from "@pankod/refine-antd";

import { IPost, ILanguage } from "interfaces";

const { Title, Text } = Typography;

export const PostShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IPost>();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: languageData, isLoading: languageIsLoading } =
        useOne<ILanguage>({
            resource: "languages",
            id: record?.language || "",
            queryOptions: {
                enabled: !!record,
            },
        });

    return (
        <Show isLoading={isLoading && languageIsLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Language</Title>
            <Text>{languageData?.data.title}</Text>

            <Title level={5}>Content</Title>
            <MarkdownField value={record?.content} />
        </Show>
    );
};
