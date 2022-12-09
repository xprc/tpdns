const urlLikeKeyRegexp = /(image|photo|avatar|url|logo|cover|thumbnail|icon)/i;

/**
 * Returns a list of keys that are likely to be fieldable.
 * @example getFieldableKeys("user", { id: 1, name: "John" }) === "name"
 */
export const getFieldableKeys = (
    key: string,
    data: Record<string, unknown>,
): string | string[] | undefined => {
    const fieldableProperties = [
        "name",
        "label",
        "title",
        "count",
        "content",
        "username",
        "nickname",
        "login",
        "firstName",
        "lastName",
        "url",
    ];

    if (urlLikeKeyRegexp.test(key)) {
        fieldableProperties.unshift("url");
    }

    const firstAvailable = fieldableProperties.find(
        (fkey) => fkey in data && !!data[fkey],
    );

    if (firstAvailable) {
        if (firstAvailable === "firstName" && "lastName" in data) {
            return ["firstName", "lastName"];
        }

        return firstAvailable;
    }

    return undefined;
};
