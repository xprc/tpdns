---
id: number
title: Number
swizzle: true
---

import numberField from '@site/static/img/guides-and-concepts/fields/number/numberField.png'

This field is used to display a number formatted according to the browser locale, right aligned. and uses [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) to display date format.

:::info-tip Swizzle
You can swizzle this component to customize it with the [**refine CLI**](/docs/packages/documentation/cli)
:::

## Usage

`<NumberField>` uses Intl.NumberFormat() if available, passing the locales and options props as arguments. This allows a perfect display of decimals, currencies, percentages, etc. See [Intl.NumberFormat documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) for the options prop syntax.

If Intl is not available, `<NumberField>` outputs numbers as is (and ignores the locales and options props).

```tsx
// highlight-next-line
import { List, Table, NumberField } from "@pankod/refine-antd";

export const PostList: React.FC = () => {
    return (
        <List>
            <Table rowKey="id">
                <Table.Column dataIndex="title" title="Title" key="title" />
                <Table.Column<IPost>
                    key="hit"
                    title="Hit"
                    dataIndex="hit"
                    render={(value) => (
                        // highlight-start
                        <NumberField
                            value={value}
                            options={{
                                notation: "compact",
                            }}
                        />
                        // highlight-end
                    )}
                />
            </Table>
        </List>
    );
};

interface IPost {
    id: number;
    hit: number;
}
```

<br/>
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={numberField} alt="NumberField" />
</div>

## API Reference

### Properties

<PropsTable module="@pankod/refine-antd/NumberField" value-description="Number value" />

:::tip External Props
It also accepts all props of Ant Design [Text](https://ant.design/components/typography/#Typography.Text).
:::