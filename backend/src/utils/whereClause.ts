export interface WhereCondition {
  condition: string
  values: unknown[]
}

export function buildWhereClause(conditions: WhereCondition[]): { sql: string; params: unknown[] } {
  const params = conditions.flatMap(c => c.values)
  let parameterIndex = 0
  const conditionStrings = conditions.map(c =>
    c.condition.replace(/\?/g, () => `$${++parameterIndex}`),
  )
  return {
    sql: conditionStrings.length > 0 ? `WHERE ${conditionStrings.join(' AND ')}` : '',
    params,
  }
}
