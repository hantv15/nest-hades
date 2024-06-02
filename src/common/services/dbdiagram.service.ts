export class DBdiagram {
  public mongooseToDbml(schemaName: any, schema: any) {
    let dbml = `Table ${schemaName} {\n`;

    for (let path in schema.paths) {
      if (path !== '__v') {
        let field = schema.paths[path];
        let fieldType = '';
        let constraints = [];

        switch (field.instance) {
          case 'String':
            fieldType = 'string';
            break;
          case 'Number':
            fieldType = 'number';
            break;
          case 'ObjectID':
            fieldType = 'number';
            break;
          // Add more type mappings as needed
          default:
            fieldType = 'string';
        }

        if (field.options.required) constraints.push('not null');
        if (field.options.unique) constraints.push('unique');

        dbml += `  ${path} ${fieldType} [${constraints}]\n`;
      }
    }

    dbml += `}\n`;

    return dbml;
  }

  public generateDbml(schemas: any) {
    let dbml = '';
    let relations = '';

    for (let schemaName of schemas) {
      console.log(schemaName);

      dbml += this.mongooseToDbml(schemaName.name, schemaName.schema);

      for (let path in schemaName.schema.paths) {
        let field = schemaName.schema.paths[path];
        if (field.options.ref) {
          relations += `Ref: ${schemaName.schema.obj.parents.ref}.${path} > ${field.options.ref}._id\n`;
        }
      }
    }

    dbml += '\n' + relations;

    return dbml;
  }
}

export const dbdiagram = new DBdiagram();
