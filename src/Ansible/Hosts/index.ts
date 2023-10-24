import { Host } from "./Types"
import HostsFileParser from "./HostsFileParser"
class Hosts {
  _hostFilePath: string
  _hostFileParser: HostsFileParser

  constructor(hostFilePath: string) {
    this._hostFilePath = hostFilePath
    this._hostFileParser = new HostsFileParser(hostFilePath)
  }

  get = (): Host[] => {
    return this._hostFileParser.getHosts()
  }
}


export default Hosts
export type { Host }