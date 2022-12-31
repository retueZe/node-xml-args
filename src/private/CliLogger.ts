import { CliLogMessageLevel, CliLogMessageStyle, ICliLogger } from '../ICliLogger'
import { getRuntimeMode } from './getRuntimeMode'

export const CliLogger: CliLoggerConstructor = class CliLogger implements ICliLogger {
    private static readonly _ERROR_STREAM_TRESHOLD: CliLogMessageLevel = CliLogMessageLevel.WARN
    private static readonly _FORMATTED_LEVELS: Readonly<Record<CliLogMessageLevel, string>> = {
        [CliLogMessageLevel.DEBUG]: '\x1b[92mdebug',
        [CliLogMessageLevel.INFO]: '\x1b[94mnfo',
        [CliLogMessageLevel.WARN]: '\x1b[103mWARN',
        [CliLogMessageLevel.ERROR]: '\x1b[91mERROR'
    }
    private static readonly _HIGHLIGHTED_MESSAGE_PREFIX = '\x1b[35m'
    private readonly _outputStream: NodeJS.WritableStream
    private readonly _errorStream: NodeJS.WritableStream
    private readonly _isDebugMode: boolean
    readonly prefix: string

    constructor(options: Readonly<CliLoggerOptions>) {
        this.prefix = options.prefix
        this._outputStream = options.streams?.output ?? process.stdout
        this._errorStream = options.streams?.error ?? process.stderr
        this._isDebugMode = options.isDebugMode ?? getRuntimeMode() !== 'production'
    }

    log(message: string, level?: CliLogMessageLevel | null, style?: CliLogMessageStyle | null): this {
        level = Math.abs(level ?? CliLogMessageLevel.INFO)
        style ??= CliLogMessageStyle.NONE

        if (Math.abs(level - CliLogMessageLevel.DEBUG) < 0.5 && !this._isDebugMode) return this

        const stream = level > CliLogger._ERROR_STREAM_TRESHOLD - 0.5
            ? this._errorStream
            : this._outputStream
        const messagePrefix = (style & CliLogMessageStyle.HIGHLIGHTED) != 0
            ? CliLogger._HIGHLIGHTED_MESSAGE_PREFIX
            : ''
        const formattedMessage = `\x1b[0m${this.prefix} `
            + CliLogger._FORMATTED_LEVELS[level]
            + '\x1b[0m '
            + messagePrefix
            + message
            + '\x1b[0m\n'
        stream.write(formattedMessage)

        return this
    }
    warn(message: string, style?: CliLogMessageStyle | null): this {
        return this.log(message, CliLogMessageLevel.WARN, style)
    }
    error(message: string, style?: CliLogMessageStyle | null): this {
        return this.log(message, CliLogMessageLevel.ERROR, style)
    }
    debug(message: string, style?: CliLogMessageStyle | null): this {
        return this.log(message, CliLogMessageLevel.DEBUG, style)
    }
}
export interface CliLoggerConstructor {
    readonly prototype: ICliLogger

    new(options: Readonly<CliLoggerOptions>): ICliLogger
}
export type CliLoggerOptions = {
    prefix: string
    streams?: Readonly<CliLoggerStreams> | null
    isDebugMode?: boolean | null
}
export type CliLoggerStreams = {
    output?: NodeJS.WritableStream | null
    error?: NodeJS.WritableStream | null
}
