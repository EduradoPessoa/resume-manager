export const formatDate = (dateString: string, locale: 'en-US' | 'pt-BR' = 'en-US'): string => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
  })
}

export const getCurrentText = (locale: 'en-US' | 'pt-BR' = 'en-US'): string => {
  return locale === 'pt-BR' ? 'Presente' : 'Present'
}
