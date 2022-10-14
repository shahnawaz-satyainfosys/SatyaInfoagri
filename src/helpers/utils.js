export const setItemToStore = (key, payload, store = localStorage) =>
  store.setItem(key, payload);

export const getItemFromStore = (key, defaultValue, store = localStorage) => {
  try {
    return store.getItem(key) === null
      ? defaultValue
      : JSON.parse(store.getItem(key));
  } catch {
    return store.getItem(key) || defaultValue;
  }
};

export const getColor = (name, dom = document.documentElement) => {
  return getComputedStyle(dom).getPropertyValue(`--falcon-${name}`).trim();
};

export const reactBootstrapDocsUrl = 'https://react-bootstrap.github.io';

export const camelize = str => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};