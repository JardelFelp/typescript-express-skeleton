import winston from 'winston'
import moment from 'moment'

type LogProps = {
  logName: string
  executedProcess: string
}

class Logger {
  logName: string
  executedProcess: string
  logs: Array<string>
  consoleLogger: winston.Logger
  fileLogger: winston.Logger

  constructor (
    logLevel = 'info',
    fileName = '',
    { logName, executedProcess }: LogProps
  ) {
    this.logName = logName
    this.executedProcess = executedProcess
    this.logs = []

    this.consoleLogger = winston.createLogger({
      level: 'info',
      format: winston.format.simple(),
      transports: [new winston.transports.Console()]
    })

    this.fileLogger = winston.createLogger({
      level: logLevel,
      format: winston.format.simple(),
      transports: [
        new winston.transports.File({
          filename: fileName
        })
      ]
    })
  }

  info (log: string) {
    this.logs.push(`${this.logName} - ${this.executedProcess} - ${log}`)

    return this.consoleLogger.info(
      `${this.logName} - ${this.executedProcess} - ${log}`
    )
  }

  log (level: string, log: string) {
    this.info(log)
    return this.fileLogger.log(level, `[${moment().format()}] ${log}`)
  }

  allLog () {
    return this.logs
  }

  resetLog () {
    this.logs = []
  }

  addLog (logs: Array<string>) {
    for (let i = 0; i < logs.length; i++) {
      this.logs.push(logs[i])
    }
  }
}

export default Logger
