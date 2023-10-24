"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HostsFileParser_1 = __importDefault(require("./HostsFileParser"));
class Hosts {
    constructor(hostFilePath) {
        this.get = () => {
            return this._hostFileParser.getHosts();
        };
        this._hostFilePath = hostFilePath;
        this._hostFileParser = new HostsFileParser_1.default(hostFilePath);
    }
}
exports.default = Hosts;
