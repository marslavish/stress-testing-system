const formatHashRate = (hashRate: number) => {
  if (hashRate >= 1000000) return `${(hashRate / 1000000).toFixed(2)}TH/s`;
  if (hashRate >= 1000) return `${(hashRate / 1000).toFixed(2)}GH/s`;
  return `${hashRate.toFixed(2)}MH/s`;
};

export default formatHashRate;