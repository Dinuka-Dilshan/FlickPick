export function findMostFrequent(arr: string[]) {
  const frequencyMap: { [key: string]: number } = {};

  for (const item of arr) {
    frequencyMap[item] = (frequencyMap[item] || 0) + 1;
  }

  let mostFrequent = null;
  let maxCount = 0;
  for (const [key, value] of Object.entries(frequencyMap)) {
    if (value > maxCount) {
      mostFrequent = key;
      maxCount = value;
    }
  }

  return { mostFrequent, maxCount };
}
