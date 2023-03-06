const cellNameRegex = /^\$?[A-Z]+\$?(\d+)$/;

function visitor(nameMap, fields) {
  return function visit(n, fragmentName) {
    if (n.type === 'Field') {
      const name = n?.name;
      const match = cellNameRegex.exec(name);
      const field = match?.[1] ? nameMap[fragmentName][match[1]] : undefined;
      if (!field) {
        console.error(`Unknown column used in excel formula ${n.name}`); // eslint-disable-line no-console
      }
      n.name = field;
      fields.add(field);
    } else if (n.type === 'Function') {
      n.name = n.name.toLowerCase();
    } else if (n.type === 'Subexpression') {
      return visit({
        type: 'Field',
        name: n.children[1].name,
      }, n.children[0].name);
    }
    return {
      ...n,
      children: n.children?.map((c) => visit(c, fragmentName)),
    };
  };
}

function updateCellNames(ast, rowNumberFieldMap, fragmentName) {
  const fields = new Set();
  const newAst = visitor(rowNumberFieldMap, fields)(ast, fragmentName);
  return [newAst, Array.from(fields)];
}

export default function transformRule({ prop, expression }, fieldToCellMap, fragmentName, formula) {
  const ast = formula.compile(expression.slice(1));
  const [newAst, deps] = updateCellNames(ast, fieldToCellMap, fragmentName);
  return {
    prop,
    deps,
    ast: newAst,
  };
}
