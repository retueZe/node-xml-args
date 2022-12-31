import { IOption } from 'async-option'
import { ICliLogger } from './ICliLogger'

export type CliAliasable = {
    name: string
    letter: string
    aliases: ReadonlySet<string>
}
export type CliDocumentable = {
    summary: IOption<string>
}
export type CliExecutableManifest = CliDocumentable & {
    description: CliDescription
    args: readonly Readonly<CliArgManifest>[]
    minArgCount: number
    maxArgCount: IOption<number>
    options: Readonly<Record<string, Readonly<CliOptionManifest>>>
    commands: Readonly<Record<string, Readonly<CliCommandManifest>>>
}
export type CliDescription = readonly CliDescriptionParagraph[]
export type CliDescriptionParagraph = readonly CliDescriptionParagraphBlock[]
export type CliDescriptionParagraphBlock =
    | string
    | Readonly<CliDescriptionParagraphFormattedBlock>
export type CliDescriptionParagraphFormattedBlock = {
    type: CliDescriptionParagraphFormattedBlockType
    content: string
}
export type CliDescriptionParagraphFormattedBlockType = 'highlighted' | 'link'

export type CliProgramManifest = CliExecutableManifest & {
    version: IOption<string>
}

export type CliArgManifest = CliAliasable & {
    isOptional: boolean
    isSpreading: boolean
}

export type CliOptionManifest = CliAliasable & CliDocumentable & {
    restriction: IOption<Readonly<CliRestriction>>
    isRequired: boolean
    type: CliOptionType
    attributes: CliOptionAttributes
}
export type CliOptionAttributesTypeMap = {
    'common': CliCommonOptionAttributes
    'switch': CliSwitchOptionAttributes
    'array-builder': CliArrayBuilderOptionAttributes
}
export type CliCommonOptionAttributes = {
    defaultValue: string
    isRequired: boolean
}
export type CliSwitchOptionAttributes = {
    initialValue: boolean
}
export type CliArrayBuilderOptionAttributes = Record<string, never>
export type CliOptionType = keyof CliOptionAttributesTypeMap
export type CliOptionAttributes = CliOptionAttributesTypeMap[CliOptionType]
export type CliRestrictionTypeMap = {
    'string': CliStringRestriction
    'integer': CliIntegerRestriction
    'float': CliFloatRestriction
}
export type CliStringRestriction = {
    minLength: IOption<number>
    maxLength: IOption<number>
    pattern: IOption<RegExp>
}
export type CliIntegerRestriction = {
    minInteger: IOption<number>
    maxInteger: IOption<number>
    assertions: readonly string[]
}
export type CliFloatRestriction = {
    minFloat: IOption<number>
    maxFloat: IOption<number>
    assertions: readonly string[]
}
export type CliOptionValueType = keyof CliRestrictionTypeMap
export type CliRestriction = CliRestrictionTypeMap[CliOptionValueType]

export type CliCommandManifest = CliAliasable & CliExecutableManifest

export type CliInput = string | readonly string[]
export type CliParsedInput<A extends CliValues = CliValues> = {
    path: readonly string[]
    values: A
    argCount: number
}
export type CliValues = Record<string | number, CliOptionValue>
export type CliOptionValue =
    | string | bigint | number | boolean
    | readonly (string | bigint | number)[]
    | IOption<string | bigint | number>

export type CliCondition = (value: number) => boolean
export type CliExecutable<A extends CliValues = CliValues> =
    (context: CliExecutionContext<A>) => CliExecutionResult
export type CliExecutionContext<A extends CliValues = CliValues> = {
    input: CliParsedInput<A>
    logger: ICliLogger
}
export type CliExecutionResult = Promise<boolean>
