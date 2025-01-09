export const formatDate = (date: string | undefined): string => {
  if (!date) return '';
  
  const d = new Date(date);
  const month = d.toLocaleString('pt-BR', { month: 'long' });
  const year = d.getFullYear();
  return `${month} de ${year}`;
};
