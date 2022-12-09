---
id: table-search
title: Table Search
---

import searchForm from '@site/static/img/guides-and-concepts/table-search/form.png';

We can make extensive search / filter operations using the `useTable` hook on the listing pages.

First, we create a form by extracting `searchFormProps` from `useTable`. We will use this form for search / filtering.

```tsx  title="pages/list.tsx"
import {
// highlight-start
    Form,
    Table,
    useTable,
// highlight-end
    Row,
    Col,
    Icons,
    List,
    Button,
    DatePicker,
    Space,
    Input,
} from "@pankod/refine-antd";

const { RangePicker } = DatePicker;

export const ListPage: React.FC = () => {
// highlight-next-line
    const { searchFormProps } = useTable<IPost>();

    return (
// highlight-start
        <Row gutter={[16, 16]}>
            <Col lg={6} xs={24}>
                <Form layout="vertical" {...searchFormProps}>
                    <Form.Item label="Search" name="q">
                        <Input
                            placeholder="ID, Title, Content, etc."
                            prefix={<Icons.SearchOutlined />}
                        />
                    </Form.Item>
                    <Form.Item label="Created At" name="createdAt">
                        <RangePicker />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Filter
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col lg={18} xs={24}>
                <List>
                    <Table>...</Table>
                </List>
            </Col>
        </Row>
// highlight-end
    );
};

interface IPost {
    id: number;
    title: string;
    createdAt: string;
}
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={searchForm} />
</div>

<br />

When the form is submitted, the `onSearch` method runs and we get the search form values. We have to return an object of type [`CrudFilters`](/api-reference/core/interfaces.md#crudfilters) for this method.

```tsx title="pages/list.tsx"
...
import { HttpError } from "@pankod/refine-core";
import { Dayjs } from "dayjs";

const { searchFormProps } = useTable<IPost, HttpError, { title: string; createdAt: [Dayjs, Dayjs] }>({
    onSearch: (params) => {
        const filters: CrudFilters = [];
        const { q, createdAt } = params;

            filters.push(
                {
                    field: "q",
                    operator: "eq",
                    value: q,
                },
                {
                    field: "createdAt",
                    operator: "gte",
                    value: createdAt ? createdAt[0].toISOString() : undefined,
                },
                {
                    field: "createdAt",
                    operator: "lte",
                    value: createdAt ? createdAt[1].toISOString() : undefined,
                },
            );

        return filters;
    },
});
...
```

:::caution
`CrudFilters` types object has `field`, `operator` and `value` properties. These properties help us to filter in which field, with which operator, and with which data.
:::

## Live StackBlitz Example

<iframe loading="lazy" src="https://stackblitz.com/github/refinedev/refine/tree/master/examples/table/tableFilter?embed=1&view=preview&theme=dark&preset=node&ctl=1"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-table-filter-example"
></iframe>

