"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
class HostsFileParser {
    constructor(hostFilePath) {
        this._hosts = [];
        this.getHosts = () => {
            if (this._hostsEmpty()) {
                this._hosts = this._getHosts();
            }
            return this._hosts;
        };
        this._getHosts = () => {
            return this._parseHostsFile(this._readHostFile());
        };
        this._parseHostsFile = (hostsFileRaw) => {
            const filteredHostsFileRaw = this._filterHostsFileRaw(hostsFileRaw);
            return filteredHostsFileRaw.split('\n').map((hostsFileLine) => {
                return this._parseHostsFileLine(hostsFileLine);
            });
        };
        this._filterHostsFileRaw = (hostsFileRaw) => {
            const linesWithAnsibleHost = this._filterHostsFileRawOnlyAnsibleHost(hostsFileRaw);
            const linesWithoutComments = this._filterHostsFileRemoveCommentedLines(linesWithAnsibleHost);
            return linesWithoutComments;
        };
        this._filterHostsFileRawOnlyAnsibleHost = (hostsFileRaw) => {
            const filtered = hostsFileRaw.split('\n').filter((hostsFileLine) => {
                return hostsFileLine.includes('ansible_host');
            });
            if (filtered) {
                return filtered.join('\n');
            }
            else {
                throw new Error('ansible_host not found in hosts file, no hosts to parse');
            }
        };
        this._filterHostsFileRemoveCommentedLines = (hostsFileRaw) => {
            return hostsFileRaw.split('\n').filter((hostsFileLine) => {
                return !hostsFileLine.startsWith('#');
            }).join('\n');
        };
        this._parseHostsFileLine = (hostsFileLine) => {
            return {
                ip: this._parseHostsFileLineIp(hostsFileLine),
                hostname: this._parseHostsFileLineHostName(hostsFileLine)
            };
        };
        this._parseHostsFileLineHostName = (hostsFileLine) => {
            return hostsFileLine.split(' ')[0];
        };
        this._parseHostsFileLineIp = (hostsFileLine) => {
            return hostsFileLine.split(' ')[1].split('=')[1];
        };
        this._readHostFile = () => {
            return (0, node_fs_1.readFileSync)(this._hostFilePath).toString();
        };
        this._hostsEmpty = () => {
            return this._hosts.length === 0;
        };
        this._hostFilePath = hostFilePath;
    }
}
exports.default = HostsFileParser;
