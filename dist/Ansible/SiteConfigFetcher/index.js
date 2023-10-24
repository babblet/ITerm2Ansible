"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
class SiteConfigFetcher {
    static get() {
        return SiteConfigFetcher._get();
    }
    static _get() {
        const siteConfigRaw = SiteConfigFetcher._readSiteConfigFile();
        const ansibleRoot = SiteConfigFetcher._findAnsibleRoot(siteConfigRaw);
        return {
            ANSIBLE_ROOT: ansibleRoot
        };
    }
}
SiteConfigFetcher._findAnsibleRoot = (siteConfigRaw) => {
    const ansibleRoot = SiteConfigFetcher._readSiteConfigFile().split('\n').find((line) => {
        return line.startsWith('ANSIBLE_ROOT=');
    });
    if (ansibleRoot) {
        return ansibleRoot.split('=')[1];
    }
    else {
        throw new Error('ANSIBLE_ROOT not found in site config');
    }
};
SiteConfigFetcher._readSiteConfigFile = () => {
    return (0, node_fs_1.readFileSync)(SiteConfigFetcher._siteConfigPath()).toString();
};
SiteConfigFetcher._siteConfigPath = () => {
    return `${process.env.HOME}/.ansible/site_config`;
};
exports.default = SiteConfigFetcher;
