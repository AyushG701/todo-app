export function hasKeyword(query, keywords) {
  return keywords.some((keyword) => query.toLowerCase().includes(keyword))
}
