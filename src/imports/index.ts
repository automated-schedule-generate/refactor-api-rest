import * as fs from 'node:fs';
import * as path from 'node:path';

generateImportsWithExports('controllers.ts', '.controller.ts');
generateImportsWithExports('dtos.ts', '.dto.ts');
generateImportsWithExports('entities.ts', '.entity.ts');
generateImportsWithExports('factories.ts', '.factory.ts');
generateImportsWithExports('builders.ts', '.query-builder.ts');
generateImportsWithExports('interfaces.ts', '.interface.ts', true);
generateImportsWithExports('mappers.ts', '.mapper.ts');
generateImportsWithExports('models.ts', '.model.ts');
generateImportsWithExports('modules.ts', '.module.ts');
generateImportsWithExports('repositories.ts', '.repository.ts');
generateImportsWithExports('repositories.impl.ts', '.repository.impl.ts');
generateImportsWithExports('services.ts', '.service.ts');
generateImportsWithExports('use-cases.ts', '.use-case.ts');
generateImportsWithExports('guards.ts', '.guard.ts');
generateImportsWithExports('enums.ts', '.enum.ts');
generateImportsWithExports('contracts.ts', '.service-contract.ts');

function generateImportsWithExports(
  output: string,
  end_file: string,
  is_export_type: boolean = false,
) {
  const baseDir = path.resolve(__dirname, '../modules');
  const indexFile = path.join(baseDir, `../imports/${output}`);
  const exports: string[] = [];

  // Função recursiva para varrer a pasta e as subpastas
  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath); // entra na subpasta
      } else if (entry.isFile() && entry.name.endsWith(`${end_file}`)) {
        const relativePath =
          '../modules/' + path.relative(baseDir, fullPath).replace(/\\/g, '/').replace(/\.ts$/, '');
        let result = 'export ';
        if (is_export_type) {
          result += 'type ';
        }
        result += `* from '${relativePath}';`;
        exports.push(result);
      }
    }
  }

  walk(baseDir);

  // Deixar em ordem alfabetica (apenas para facilitar a leitura)
  exports.sort();

  // Escreve o arquivo final
  fs.writeFileSync(indexFile, exports.join('\n') + '\n', 'utf8');
  console.log(`✅ Gerado: ${indexFile} (${exports.length} exports)`);
}
