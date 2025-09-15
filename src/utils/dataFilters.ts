import { BarChartData, PieChartData } from './sampleData';

/**
 * Filter data by specific labels
 */
export const filterByLabels = (
  data: BarChartData | PieChartData,
  selectedLabels: string[]
): BarChartData | PieChartData => {
  const indices = selectedLabels.map(label => data.labels.indexOf(label))
    .filter(index => index !== -1);

  return {
    labels: indices.map(i => data.labels[i]),
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      data: indices.map(i => dataset.data[i]),
      backgroundColor: Array.isArray(dataset.backgroundColor)
        ? indices.map(i => dataset.backgroundColor[i])
        : dataset.backgroundColor,
      borderColor: Array.isArray(dataset.borderColor)
        ? indices.map(i => dataset.borderColor[i])
        : dataset.borderColor,
    })),
  };
};

/**
 * Sort data by values
 */
export const sortByValue = (
  data: BarChartData | PieChartData,
  order: 'asc' | 'desc' = 'desc'
): BarChartData | PieChartData => {
  const indices = data.datasets[0].data
    .map((value, index) => ({ value, index }))
    .sort((a, b) => order === 'desc' ? b.value - a.value : a.value - b.value)
    .map(item => item.index);

  return {
    labels: indices.map(i => data.labels[i]),
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      data: indices.map(i => dataset.data[i]),
      backgroundColor: Array.isArray(dataset.backgroundColor)
        ? indices.map(i => dataset.backgroundColor[i])
        : dataset.backgroundColor,
      borderColor: Array.isArray(dataset.borderColor)
        ? indices.map(i => dataset.borderColor[i])
        : dataset.borderColor,
    })),
  };
};

/**
 * Take top N items
 */
export const takeTop = (
  data: BarChartData | PieChartData,
  count: number
): BarChartData | PieChartData => {
  const sorted = sortByValue(data, 'desc');
  return {
    labels: sorted.labels.slice(0, count),
    datasets: sorted.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.slice(0, count),
      backgroundColor: Array.isArray(dataset.backgroundColor)
        ? dataset.backgroundColor.slice(0, count)
        : dataset.backgroundColor,
      borderColor: Array.isArray(dataset.borderColor)
        ? dataset.borderColor.slice(0, count)
        : dataset.borderColor,
    })),
  };
};

/**
 * Search labels by text
 */
export const searchByLabel = (
  data: BarChartData | PieChartData,
  searchText: string
): BarChartData | PieChartData => {
  const indices = data.labels
    .map((label, index) => ({ label, index }))
    .filter(item => item.label.toLowerCase().includes(searchText.toLowerCase()))
    .map(item => item.index);

  return {
    labels: indices.map(i => data.labels[i]),
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      data: indices.map(i => dataset.data[i]),
      backgroundColor: Array.isArray(dataset.backgroundColor)
        ? indices.map(i => dataset.backgroundColor[i])
        : dataset.backgroundColor,
      borderColor: Array.isArray(dataset.borderColor)
        ? indices.map(i => dataset.borderColor[i])
        : dataset.borderColor,
    })),
  };
};