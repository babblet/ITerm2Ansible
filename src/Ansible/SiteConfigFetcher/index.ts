import { readFileSync } from 'node:fs';

type SiteConfig = {
  ANSIBLE_ROOT: string
}
type SiteConfigRaw = string
type Path = string

class SiteConfigFetcher {
  static get(): SiteConfig {
    return SiteConfigFetcher._get()
  }

  static _get(): SiteConfig {
    const siteConfigRaw = SiteConfigFetcher._readSiteConfigFile()
    const ansibleRoot = SiteConfigFetcher._findAnsibleRoot(siteConfigRaw)
    return {
      ANSIBLE_ROOT: ansibleRoot
    }
  }

  static _findAnsibleRoot = (siteConfigRaw: SiteConfigRaw): string => {
    const ansibleRoot = SiteConfigFetcher._readSiteConfigFile().split('\n').find((line) => {
      return line.startsWith('ANSIBLE_ROOT=')
    })

    if (ansibleRoot) {
      return ansibleRoot.split('=')[1]
    } else {
      throw new Error('ANSIBLE_ROOT not found in site config')
    }
  }

  static _readSiteConfigFile = (): SiteConfigRaw => {
    return readFileSync(SiteConfigFetcher._siteConfigPath()).toString()
  }
  
  static _siteConfigPath = (): Path => {
    return `${process.env.HOME}/.ansible/site_config`
  }
}

export default SiteConfigFetcher