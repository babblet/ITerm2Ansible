"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("./Logger"));
const ITerm2Controller_1 = __importDefault(require("./ITerm2Controller"));
const Hosts_1 = __importDefault(require("./Ansible/Hosts"));
const SiteConfigFetcher_1 = __importDefault(require("./Ansible/SiteConfigFetcher"));
const hostFilePath = SiteConfigFetcher_1.default.get().ANSIBLE_ROOT + '/environments/staging/hosts';
Logger_1.default.info(`Hosts file path: ${hostFilePath}`);
const hosts = new Hosts_1.default(hostFilePath).get();
Logger_1.default.info(`Hosts: ${JSON.stringify(hosts)}`);
const controller = new ITerm2Controller_1.default();
controller.startSession(hosts[0].ip);
