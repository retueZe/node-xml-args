import { IAsyncOption } from 'async-option'
import { CliCondition, CliInput, CliParsedInput, CliProgramManifest, CliValues } from './cli'

export interface ICliInputParser{
    readonly manifest: CliProgramManifest
    readonly conditions: Readonly<Record<string, CliCondition>>

    parse<A extends CliValues = CliValues>(input: CliInput): IAsyncOption<CliParsedInput<A>>
}
