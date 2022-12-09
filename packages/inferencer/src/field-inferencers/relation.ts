import { FieldInferencer } from "@/types";

const relationRegexp = /(_id|_ids|Id|Ids|ID|IDs)(\[\])?$/;

export const relationInfer: FieldInferencer = (key, value) => {
    const isRelation = relationRegexp.test(key);
    const isBasicValue = typeof value === "string" || typeof value === "number";
    const isBasicArray =
        Array.isArray(value) &&
        value.every((v) => typeof v === "string" || typeof v === "number");

    if ((isRelation && isBasicValue) || (isRelation && isBasicArray)) {
        return {
            key,
            relation: true,
            multiple: isBasicArray ? true : false,
            type: "relation",
            priority: 1,
        };
    }

    return false;
};
