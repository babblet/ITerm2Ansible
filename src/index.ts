import * as nodeFs from 'node:fs'
import Logger from './Logger'
import ITerm2Controller from './ITerm2Controller'
import Hosts from './Ansible/Hosts'
import SiteConfigFetcher from './Ansible/SiteConfigFetcher'

const hostFilePath = SiteConfigFetcher.get().ANSIBLE_ROOT + '/environments/staging/hosts'
Logger.info(`Hosts file path: ${hostFilePath}`)

const hosts = new Hosts(hostFilePath).get()
Logger.info(`Hosts: ${JSON.stringify(hosts)}`)

const controller = new ITerm2Controller()
controller.startSession(hosts[0].ip)