const promiseMerge = async (...promises) => {
  try {
    const result = await Promise.all(promises);
    if (result.length == 0) throw new Error('No promises provided');
    const firstType = Array.isArray(result[0]) ? 'array' : typeof result[0];
    if(firstType == 'object' && Object.getPrototypeOf(result[0]) != Object.prototype) {
      throw new TypeError('Invalid type');
    }
    const isAllSameType = result.every(it => (Array.isArray(it) ? 'array' : typeof it) == firstType);
    if (!isAllSameType) {
      throw new TypeError('Types do not match')
    }
    if (firstType == 'number' || firstType == 'string') {
      return result.reduce((a, b) => a + b);
    }
    if (firstType == 'boolean') {
      return result.reduce((a, b) => a && b)
    }
    if (firstType == 'array') {
      return result.reduce((a, b) => a.concat(b));
    }
    if (firstType == 'object') {
      return result.reduce((a, b) => ({ ...a, ...b }))
    }
  } catch (error) {
    throw error;
  }
};

async function promiseMergeResult() {
  const result = await promiseMerge()
  console.log(result);
}

promiseMergeResult();