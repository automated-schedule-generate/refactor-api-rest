import { promises as fs } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { normalizeSql } from './normalize-sql.util';

/**
 * Use:
 * ```
 * const queries = await loadSqlQueries(join(__dirname, relative_path_to_queries_dir));
 *
 * const myQuery = queries['my_query'];
 * ```
 */
export async function loadSqlQueries(
  dir: string,
): Promise<Record<string, string>> {
  const files = await fs.readdir(dir);

  const queries: Record<string, string> = {};

  for (const file of files) {
    if (extname(file) !== '.sql') continue;

    const filePath = join(dir, file);
    const content = await fs.readFile(filePath, 'utf-8');

    const key = basename(file, '.sql');
    queries[key] = normalizeSql(content);
  }

  return queries;
}
