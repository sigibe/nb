import updateCellNames from './ExcelToJsonFormula.js';
import Formula from './jsonformula/json-formula.js';

const SHEET_NAME_REGEX = /('.{1,31}'|[\w.]{1,31}?)!([$]?[A-Z]+[$]?[0-9]+)/g;

function updateExpression(expression) {
  const excelExpression = expression?.slice(1)?.replaceAll('"', "'");
  const updatedExpression = excelExpression.replace(SHEET_NAME_REGEX, (match, g1, g2) => `"${g1.replace(/^'|'$/g, '')}".${g2}`);
  return updatedExpression;
}

export default function transformRule({ prop, expression }, fieldToCellMap, fragmentName) {
  const updatedRule = updateExpression(expression);
  const formula = new Formula();
  const ast = formula.compile(updatedRule);
  const [newAst, deps] = updateCellNames(ast, fieldToCellMap, fragmentName);
  return {
    prop,
    deps,
    ast: newAst,
  };
}
