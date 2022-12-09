import { useGetIdentity, usePermissions } from "@pankod/refine-core";

import { Row, Col, Card, Avatar, Typography, Space } from "@pankod/refine-antd";

const { Text } = Typography;

export const DashboardPage: React.FC = () => {
    const { data: identity } = useGetIdentity<{
        id: string;
        name: string;
        avatar: string;
    }>();
    const permissions = usePermissions();

    return (
        <Row gutter={20}>
            <Col span={6}>
                <Card
                    title="Identity"
                    style={{ height: "300px", borderRadius: "15px" }}
                    headStyle={{ textAlign: "center" }}
                >
                    <Space align="center" direction="horizontal">
                        <Avatar size="large" src={identity?.avatar} />
                        <Text>{identity?.name}</Text>
                    </Space>
                </Card>
            </Col>
            <Col span={6}>
                <Card
                    title="Permissions"
                    style={{ height: "300px", borderRadius: "15px" }}
                    headStyle={{ textAlign: "center" }}
                >
                    <Text>{permissions.data}</Text>
                </Card>
            </Col>
        </Row>
    );
};
