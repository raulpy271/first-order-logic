import {
    char,
    sepBy,
    between,
    optionalWhitespace,
    parse
} from 'arcsecond';

const surroundedBy = parser => between (parser) (parser);
const commaSeparated = sepBy (surroundedBy (optionalWhitespace) (char (',')));

export const surroundedByParentheses = between (surroundedBy (optionalWhitespace) (char('('))) (surroundedBy (optionalWhitespace) (char(')')));

export const listSurroundedByParentheses = parser => surroundedByParentheses (commaSeparated (parser) ) ;

export function parsedEntireText(parser, string) {
    let result = parser.run(string);
    return result.isError === false && result.index === string.length;
}
