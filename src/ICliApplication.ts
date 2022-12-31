import { CliExecutable, CliExecutionContext, CliExecutionResult, CliParsedInput, CliValues } from './cli'
import { ICliInputParser } from './ICliInputParser'

export interface ICliApplication {
    readonly parser: ICliInputParser
    readonly commands: CliExecutableContainer
    readonly program: CliExecutable

    createExecutionContext<A extends CliValues = CliValues>(input: CliParsedInput<A>): CliExecutionContext<A>
    execute(input: CliParsedInput): CliExecutionResult
}
export type CliExecutableOrExecutableContainer =
    | CliExecutable
    | CliExecutableContainer
export type CliExecutableContainer = {
    [key: string]: CliExecutableOrExecutableContainer
}
