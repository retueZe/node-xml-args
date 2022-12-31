export interface ICliLogger {
    readonly prefix: string

    log(message: string, level?: CliLogMessageLevel | null, style?: CliLogMessageStyle | null): this
    warn(message: string, style?: CliLogMessageStyle | null): this
    error(message: string, style?: CliLogMessageStyle | null): this
    debug(message: string, style?: CliLogMessageStyle | null): this
}
export enum CliLogMessageLevel {
    DEBUG = -1,
    INFO = 0,
    WARN = 1,
    ERROR = 2
}
export enum CliLogMessageStyle {
    NONE = 0x0,
    HIGHLIGHTED = 0x1
}
