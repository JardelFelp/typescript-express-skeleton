import winston from 'winston'
import moment from 'moment'

class Logger {
  constructor (
    logLevel = 'info',
    fileName = '',
    { logName, executedProcess } = {}
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

  /**
   * Faz um print no console
   * @param {string} log mensagem
   */
  info (log) {
    this.logs.push(`${this.logName} - ${this.executedProcess} - ${log}`)
    return this.consoleLogger.info(
      `${this.logName} - ${this.executedProcess} - ${log}`
    )
  }

  /**
   * Faz um print no console e salva o log em arquivo
   * @param {string} level nivel de importancia do log
   * @param {string} log mensagem
   */
  log (level, log) {
    this.info(log)
    return this.fileLogger.log(level, `[${moment().format()}] ${log}`)
  }

  allLog () {
    return this.logs
  }

  resetLog () {
    this.logs = []
  }

  addLog (logs) {
    for (let i = 0; i < logs.length; i++) {
      this.logs.push(logs[i])
    }
  }
}

export default Logger
