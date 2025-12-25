export const getScoreColor = (score) => {
  if (score >= 71) return 'text-green-600';
  if (score >= 41) return 'text-yellow-600';
  return 'text-red-600';
};

export const getScoreBgColor = (score) => {
  if (score >= 71) return 'bg-green-100';
  if (score >= 41) return 'bg-yellow-100';
  return 'bg-red-100';
};
