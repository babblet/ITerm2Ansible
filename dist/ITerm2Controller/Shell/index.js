"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const node_child_process_1 = require("node:child_process");
class Command {
    constructor(command) {
        this._command = command;
        this.length = command.length;
    }
    toString() {
        return this._command;
    }
}
exports.Command = Command;
class Shell {
}
/**
 * @throws {Error|SpawnSyncReturns<Buffer>}
 * @returns Output of the command from stdout as a string
 */
Shell.executeCommand = (command) => {
    if (command === null || command === void 0 ? void 0 : command.length) {
        return (0, node_child_process_1.execSync)(command.toString(), {}).toString().trim();
    }
    throw new Error('Invalid command provided');
};
exports.default = Shell;
