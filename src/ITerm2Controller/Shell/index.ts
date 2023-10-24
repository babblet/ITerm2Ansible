import { execSync, SpawnSyncReturns } from 'node:child_process'

class Command {
  _command: string
  length: number
  constructor(command: string) {
    this._command = command
    this.length = command.length
  }

  toString(): string {
    return this._command
  }
}


class Shell {
  /**
   * @throws {Error|SpawnSyncReturns<Buffer>}
   * @returns Output of the command from stdout as a string
   */
  static executeCommand = (command: Command): string => {
    if (command?.length) {
      return execSync(command.toString(), {}).toString().trim()
    }
    throw new Error('Invalid command provided')
  }
}

export default Shell
export { SpawnSyncReturns, Command }
