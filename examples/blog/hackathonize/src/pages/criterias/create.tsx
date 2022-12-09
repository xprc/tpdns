import {
    Create,
    Form,
    Input,
    Select,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

import { CriteriaType, HackathonType } from "interfaces";

export const CriteriasCreate: React.FC = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<CriteriaType>();

    const { selectProps: hackathonSelectProps } = useSelect<HackathonType>({
        resource: "hackathons",
        defaultValue: queryResult?.data?.data?.hackathon_id,
        optionLabel: "name",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Hackathon" name="hackathon_id">
                    <Select {...hackathonSelectProps} />
                </Form.Item>
            </Form>
        </Create>
    );
};
