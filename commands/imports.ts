import * as fs from 'node:fs';
import * as path from 'node:path';

generateImportsWithExports('controllers.ts', '.controller.ts');
generateImportsWithExports('dtos.ts', '.dto.ts');
generateImportsWithExports('entities.ts', '.entity.ts');
generateImportsWithExports('factories.ts', '.factory.ts');
generateImportsWithExports('builders.ts', '.query-builder.ts');
generateImportsWithExports('interfaces.ts', '.interface.ts', true);
generateImportsWithExports('mappers.ts', '.mapper.ts');
generateImportsWithExports('models.ts', '.model.ts', false, true); // <-- topological sort
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
  topological: boolean = false,
) {
  const baseDir = path.resolve(process.cwd(), 'src/modules');
  const indexFile = path.join(baseDir, `../imports/${output}`);

  const foundFiles: string[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(end_file)) {
        foundFiles.push(fullPath);
      }
    }
  }

  walk(baseDir);

  const orderedFiles = topological
    ? topologicalSortByDecorators(foundFiles)
    : [...foundFiles].sort();

  const exports = orderedFiles.map((fullPath) => {
    const relativePath =
      '../modules/' +
      path.relative(baseDir, fullPath).replace(/\\/g, '/').replace(/\.ts$/, '');
    let result = 'export ';
    if (is_export_type) result += 'type ';
    result += `* from '${relativePath}';`;
    return result;
  });

  fs.writeFileSync(indexFile, exports.join('\n') + '\n', 'utf8');
  console.log(`✅ Gerado: ${indexFile} (${exports.length} exports)`);
}

/**
 * Extrai o nome da classe exportada do arquivo.
 * Ex: "export class CourseModel" → "CourseModel"
 */
function extractClassName(file: string): string | null {
  const content = fs.readFileSync(file, 'utf8');
  const match = content.match(/export\s+class\s+(\w+)/);
  return match ? match[1] : null;
}

/**
 * Extrai os nomes dos models referenciados em @ForeignKey(() => XModel).
 *
 * Apenas @ForeignKey gera dependência real de inicialização no barrel.
 * @BelongsTo, @BelongsToMany, @HasMany, @HasOne usam lazy thunks e são
 * resolvidos pelo Sequelize depois que todos os models já foram carregados,
 * portanto não devem influenciar a ordem do barrel.
 */
function extractForeignKeyRefs(file: string): string[] {
  const content = fs.readFileSync(file, 'utf8');
  const refs: string[] = [];
  const regex = /@ForeignKey\(\s*\(\s*\)\s*=>\s*(\w+)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(content)) !== null) {
    refs.push(match[1]);
  }
  return [...new Set(refs)];
}

/**
 * Ordena os models em ordem topológica analisando os decorators @ForeignKey.
 * Models sem FKs vêm primeiro. Dentro do mesmo nível, ordem alfabética.
 *
 * A lógica de inversão é: se ClassModel tem @ForeignKey(() => CourseModel),
 * então CourseModel deve ser exportado ANTES de ClassModel no barrel.
 */
function topologicalSortByDecorators(files: string[]): string[] {
  const normalize = (p: string) => path.resolve(p);
  const normalizedFiles = files.map(normalize);

  // Mapa: nome da classe → path do arquivo
  const classToFile = new Map<string, string>();
  for (const file of normalizedFiles) {
    const className = extractClassName(file);
    if (className) {
      classToFile.set(className, file);
    }
  }

  // Mapa: arquivo → set de arquivos que ele referencia via @ForeignKey
  // (ou seja, arquivos que precisam vir ANTES dele no barrel)
  const deps = new Map<string, Set<string>>();
  for (const file of normalizedFiles) {
    deps.set(file, new Set());
  }

  for (const file of normalizedFiles) {
    const refs = extractForeignKeyRefs(file);
    for (const ref of refs) {
      const depFile = classToFile.get(ref);
      if (depFile && depFile !== file) {
        // `file` depende de `depFile` → depFile deve vir antes
        deps.get(file)!.add(depFile);
      }
    }
  }

  // Kahn's algorithm:
  // deps[file] = set de arquivos que `file` precisa que venham ANTES dele
  // in-degree de `file` = quantos arquivos ele ainda espera (tamanho do seu depSet)
  const inDegree = new Map<string, number>();
  for (const [file, depSet] of deps) {
    inDegree.set(file, depSet.size);
  }

  // Começa pelos que não dependem de ninguém (in-degree 0)
  const queue: string[] = [...inDegree.entries()]
    .filter(([, degree]) => degree === 0)
    .map(([file]) => file)
    .sort();

  const sorted: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    sorted.push(current);

    // Reduz o in-degree de todos que dependiam do `current`
    const newlyFree: string[] = [];
    for (const [file, depSet] of deps) {
      if (depSet.has(current)) {
        depSet.delete(current);
        const newDegree = depSet.size;
        inDegree.set(file, newDegree);
        if (newDegree === 0) {
          newlyFree.push(file);
        }
      }
    }

    newlyFree.sort();
    queue.push(...newlyFree);
    queue.sort();
  }

  // Detecta ciclos
  if (sorted.length !== normalizedFiles.length) {
    const unsorted = normalizedFiles.filter((f) => !sorted.includes(f));
    console.warn(
      '⚠️  Dependência circular detectada entre os seguintes models. ' +
        'Eles serão adicionados ao final em ordem alfabética:',
    );
    unsorted.sort().forEach((f) => console.warn(`   - ${f}`));
    sorted.push(...unsorted.sort());
  }

  // Log da ordem gerada para facilitar debug
  console.log('\n📦 Ordem dos models gerada:');
  sorted.forEach((f, i) => console.log(`   ${i + 1}. ${path.basename(f)}`));
  console.log('');

  return sorted;
}
