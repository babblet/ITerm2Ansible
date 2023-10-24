import Logger from "../Logger"
import Shell, { Command } from "./Shell"

class ITerm2Controller {
  constructor() {}
  startSession = (host: string) => {
    Logger.info(`Starting session for ${host}`)
    this._startSessionLogic(host)
  }

  _startSessionLogic = (host: string) => {
    Shell.executeCommand(this._startSessionLogicCommand(host))
  }

  _startSessionLogicCommand = (host: string): Command => {
    return new Command(this._startSessionLogicCommandString(host))
  }

  _startSessionLogicCommandString = (host: string): string => {
    return `osascript -e '${this._startSessionLogicAppleScript(host)}'`
  }

  _startSessionLogicAppleScript = (host: string): string => {
    return `tell application "iTerm"
      activate
      tell current window
        create tab with default profile
        delay 3
        tell current session
          write text "ssh solidnoc@${host}"
        end tell
      end tell
    end tell`
  }
}

export default ITerm2Controller;