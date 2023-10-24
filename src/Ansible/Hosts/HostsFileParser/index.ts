import { readFileSync } from 'node:fs'
import { Host } from '../Types'
import Logger from '../../../Logger'

type HostsFileRaw = string
type HostsFileLine = string

class HostsFileParser {
  _hostFilePath: string  
  _hosts: Host[] = []
  constructor(hostFilePath: string) {
    this._hostFilePath = hostFilePath
  }

  getHosts = (): Host[] => {
    if (this._hostsEmpty()) {
      this._hosts = this._getHosts()
    }
    return this._hosts
  }

  _getHosts = (): Host[] => {
    return this._parseHostsFile(this._readHostFile())
  }

  _parseHostsFile = (hostsFileRaw: HostsFileRaw): Host[] => {
    const filteredHostsFileRaw = this._filterHostsFileRaw(hostsFileRaw)
    return filteredHostsFileRaw.split('\n').map((hostsFileLine) => {
      return this._parseHostsFileLine(hostsFileLine)
    })
  }

  _filterHostsFileRaw = (hostsFileRaw: HostsFileRaw): HostsFileRaw => {
    const linesWithAnsibleHost = this._filterHostsFileRawOnlyAnsibleHost(hostsFileRaw)
    const linesWithoutComments = this._filterHostsFileRemoveCommentedLines(linesWithAnsibleHost);
    return linesWithoutComments
  }

  _filterHostsFileRawOnlyAnsibleHost = (hostsFileRaw: HostsFileRaw): HostsFileRaw => {
    const filtered = hostsFileRaw.split('\n').filter((hostsFileLine) => {
      return hostsFileLine.includes('ansible_host')
    })

    if (filtered) {
      return filtered.join('\n')
    } else {
      throw new Error('ansible_host not found in hosts file, no hosts to parse')
    }
  }

  _filterHostsFileRemoveCommentedLines = (hostsFileRaw: HostsFileRaw): HostsFileRaw => {
    return hostsFileRaw.split('\n').filter((hostsFileLine) => {
      return !hostsFileLine.startsWith('#')
    }).join('\n')
  }

  _parseHostsFileLine = (hostsFileLine: HostsFileLine): Host => {
    return {
      ip: this._parseHostsFileLineIp(hostsFileLine),
      hostname: this._parseHostsFileLineHostName(hostsFileLine)
    }
  }

  _parseHostsFileLineHostName = (hostsFileLine: HostsFileLine): string => {
    return hostsFileLine.split(' ')[0]
  }

  _parseHostsFileLineIp = (hostsFileLine: HostsFileLine): string => {
    return hostsFileLine.split(' ')[1].split('=')[1]
  }

  _readHostFile = (): HostsFileRaw => {
    return readFileSync(this._hostFilePath).toString()
  }

  _hostsEmpty = (): boolean => {
    return this._hosts.length === 0
  }
}

export default HostsFileParser
