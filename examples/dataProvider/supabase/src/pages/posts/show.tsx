import { useShow, IResourceComponentsProps, useOne } from "@pankod/refine-core";

import {
    Show,
    Typography,
    MarkdownField,
    Space,
    ImageField,
    Alert,
    Button,
    ListButton,
    EditButton,
    RefreshButton,
} from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";
import { useState } from "react";

const { Title, Text } = Typography;

export const PostShow: React.FC<IResourceComponentsProps> = () => {
    const [isDeprecated, setIsDeprecated] = useState(false);

    const { queryResult } = useShow<IPost>({
        liveMode: "manual",
        onLiveEvent: () => {
            setIsDeprecated(true);
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } =
        useOne<ICategory>({
            resource: "categories",
            id: record?.categoryId || "",
            queryOptions: {
                enabled: !!record,
            },
        });

    const handleRefresh = () => {
        queryResult.refetch();
        setIsDeprecated(false);
    };

    return (
        <Show
            isLoading={isLoading}
            pageHeaderProps={{
                extra: (
                    <>
                        <ListButton />
                        <EditButton />
                        <RefreshButton onClick={handleRefresh} />
                    </>
                ),
            }}
        >
            {isDeprecated && (
                <Alert
                    message="This post is changed. Reload to see it's latest version."
                    type="warning"
                    style={{
                        marginBottom: 20,
                    }}
                    action={
                        <Button
                            onClick={handleRefresh}
                            size="small"
                            type="ghost"
                        >
                            Refresh
                        </Button>
                    }
                />
            )}

            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>Category</Title>
            <Text>
                {categoryIsLoading ? "Loading..." : categoryData?.data.title}
            </Text>

            <Title level={5}>Content</Title>
            <MarkdownField value={record?.content} />

            <Title level={5}>Images</Title>
            <Space wrap>
                {record?.images ? (
                    record?.images.map((img) => (
                        <ImageField
                            key={img.name}
                            value={img.url}
                            title={img.name}
                            width={200}
                        />
                    ))
                ) : (
                    <Text>Not found any images</Text>
                )}
            </Space>
        </Show>
    );
};
