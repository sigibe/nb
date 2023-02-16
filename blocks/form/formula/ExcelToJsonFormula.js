const numberRegEx = /^\$?[A-Z]+\$?(\d+)$/;

function visit(n, nameMap, fields) {
  if (n.type === 'Field') {
    const name = n?.name;
    const match = numberRegEx.exec(name);
    let field;
    if (match?.[1]) {
      field = nameMap.$[match[1]];
    }
    if (!field) {
      // eslint-disable-next-line no-console
      console.log(`Unknown column used in excel formula ${n.name}`);
    }
    n.name = field;
    fields.add(field);
  } if (n.type === 'Function') {
    n.name = n.name.toLowerCase();
  } else if (n.type === 'Subexpression') {
    const fragmentName = n.children[0].name;
    return visit({
      type: 'Field',
      name: n.children[1].name,
    }, { $: nameMap[fragmentName] }, fields);
  }
  return {
    ...n,
    children: n.children?.map((c) => visit(c, nameMap, fields)),
  };
}

export default function updateCellNames(ast, rowNumberFieldMap) {
  const fields = new Set();
  const newAst = visit(ast, rowNumberFieldMap, fields);
  return [newAst, Array.from(fields)];
}
