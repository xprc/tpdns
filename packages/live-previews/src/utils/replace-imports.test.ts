import { replaceImports } from "./replace-imports";

describe("Replace Imports Helper", () => {
    it("works with default import", () => {
        const content = `import { default as RefineCore } from "@pankod/refine-core";`;
        const result = replaceImports(content);
        expect(result).toContain("const { default: RefineCore } = RefineCore;");
        expect(result).not.toContain(content);
    });
    it("works with named import", () => {
        const content = `import { useForm, useStepsForm } from "@pankod/refine-core";`;
        const result = replaceImports(content);
        expect(result).toContain(
            "const { useForm, useStepsForm } = RefineCore;",
        );
        expect(result).not.toContain(content);
    });
    it("works with namespace import", () => {
        const content = `import * as RefineCore from "@pankod/refine-core";`;
        const result = replaceImports(content);
        expect(result).toContain("const RefineCore = RefineCore;");
        expect(result).not.toContain(content);
    });
    it("removes side effect imports", () => {
        const content = `import "@pankod/refine-core";`;
        const result = replaceImports(content);
        expect(result).not.toContain(content);
    });
    it("works with name change", () => {
        const content = `import { useForm as useRefineForm } from "@pankod/refine-core";`;
        const result = replaceImports(content);
        expect(result).toContain(
            "const { useForm: useRefineForm } = RefineCore;",
        );
        expect(result).not.toContain(content);
    });
    it("should work with multiline code", () => {
        const content = `import { useForm, useStepsForm } from "@pankod/refine-core";
import { default as RefineCore } from "@pankod/refine-core";
import * as RefineCore from "@pankod/refine-core";
import "@pankod/refine-core";
//this should still be there`;
        const result = replaceImports(content);
        expect(result).toContain(
            "const { useForm, useStepsForm } = RefineCore;",
        );
        expect(result).toContain("const { default: RefineCore } = RefineCore;");
        expect(result).toContain("const RefineCore = RefineCore;");
        expect(result).not.toContain(content);
        expect(result).toContain("//this should still be there");
    });
});
