import path from "path";
import * as RefineCLI from "../../index";
import { getFileContent } from "./getFileContent";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Module = require("module");
const originalRequire = Module.prototype.require;

export const provideCliHelpers = (
    packagePath: string,
    isAbsolute?: boolean,
) => {
    Module.prototype.require = function (...args: Parameters<NodeRequire>) {
        if (args[0] === "@pankod/refine-cli") {
            return {
                ...RefineCLI,
                getFileContent: (filePath: string) => {
                    return getFileContent.call(
                        {
                            absolutePackageDir: isAbsolute
                                ? packagePath
                                : path.join(process.cwd(), packagePath),
                        },
                        filePath,
                    );
                },
            };
        }

        //do your thing here
        return originalRequire.apply(this, args);
    };
};
