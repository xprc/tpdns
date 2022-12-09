import { createTreeView } from ".";
import { IResourceItem, ITreeMenu } from "src/interfaces";

const mockResources: IResourceItem[] = [
    {
        name: "cms",
    },
    {
        name: "content",
        parentName: "cms",
    },
    {
        name: "posts",
        parentName: "content",
    },
    {
        name: "categories-route",
        route: "/categories-route",
    },
    {
        name: "categories",
        route: "/categories",
    },
    {
        name: "categories",
        options: {
            label: "asd",
            route: "bitti/son/sonson",
        },
        parentName: "categories-route",
    },
    {
        name: "users",
        route: "/users",
    },
];

const expectedMockResources: ITreeMenu[] = [
    {
        name: "categories-route",
        route: "/categories-route",
        children: [
            {
                name: "categories",
                options: {
                    label: "asd",
                    route: "bitti/son/sonson",
                },
                parentName: "categories-route",
                children: [],
            },
        ],
    },
    {
        name: "categories",
        route: "/categories",
        children: [],
    },
    {
        name: "users",
        route: "/users",
        children: [],
    },
];

describe("createTreeView", () => {
    const tree: ITreeMenu[] = createTreeView(mockResources);
    it("should return an tree which has three member", async () => {
        expect(tree.length).toBe(3);
    });
    it("should be equal expectedMockLocation", async () => {
        expect(tree).toEqual(expectedMockResources);
    });
});
