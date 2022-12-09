import { FieldInferencer, InferType } from "@/types";

export const arrayInfer: FieldInferencer = (key, value, record, infer) => {
    const isArray = Array.isArray(value);
    const isBasicArray =
        Array.isArray(value) &&
        value.every((v) => typeof v === "string" || typeof v === "number");

    if (isArray) {
        if (!isBasicArray) {
            const inferredInnerType = infer(key, value[0], record, infer);
            if (inferredInnerType) {
                return {
                    ...inferredInnerType,
                    key,
                    multiple: true,
                    priority: 1,
                };
            } else {
                return false;
            }
        }
        const basicType = infer(key, value[0], record, infer) || {
            type: "string" as InferType,
        };

        return {
            key,
            multiple: true,
            priority: 1,
            type: basicType?.type,
        };
    }

    return false;
};
