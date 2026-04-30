import { removeConnectivesUtil } from './remove-connectives.util';

export function generateWhereValueToSearchByColumn(
  column_name: string,
  search: string,
) {
  const search_without_connectives = removeConnectivesUtil(search);
  const search_formated = search_without_connectives
    .split(' ')
    .map((word) => `immutable_unaccent('%${word}%')`)
    .join(',');
  return `immutable_unaccent(${column_name}) ILIKE ANY (ARRAY[${search_formated}])`;
}
