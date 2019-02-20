/* exported queryObjectToString */
const queryObjectToString = (obj) => {
  if (Array.isArray(obj)) {
    const arr = [];

    for (let i = 0, l = obj.length; i < l; i++) {
      arr.push(encodeURIComponent(queryObjectToString(obj[i])));
    }

    return arr.join(',');
  }

  if (typeof obj === 'object' && obj !== null) {
    const arr = [];

    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        arr.push(`${k}=${encodeURIComponent(queryObjectToString(obj[k]))}`);
      }
    }

    return arr.join('&');
  }

  let p = '';
  switch (typeof obj) {
    case 'undefined':
      p = 'u';
      break;

    case 'boolean':
      p = 'b';
      break;

    case 'number':
      p = 'n';
      break;

    case 'function':
      p = 'f';
      break;

    case 'object':
      p = 'o';
      break;

    default:
      p = 's';
  }

  return p + String(obj);
};

/* exported queryStringToObject */
const queryStringToObject = (str) => {
  if (typeof str !== 'string') {
    return str;
  }

  if (str.indexOf(',') !== -1) {
    const arr = str.split(',');

    for (let i = 0, l = arr.length; i < l; i++) {
      arr[i] = queryStringToObject(decodeURIComponent(arr[i]));
    }

    return arr;
  }

  if (str.indexOf('=') !== -1) {
    const obj = {};

    const arr = str.split('&');
    for (let i = 0, l = arr.length; i < l; i++) {
      const pair = arr[i].split('=');
      obj[pair[0]] = queryStringToObject(decodeURIComponent(pair[1]));
    }

    return obj;
  }

  const p = str.charAt(0);
  const v = str.slice(1);
  switch (p) {
    case 'u':
      return undefined;

    case 'b':
      return Boolean(v);

    case 'n':
      return Number(v);

    case 'f':
      return (new Function(`return ${v}`))();

    case 'o':
      return null;

    default:
      return v;
  }
};
