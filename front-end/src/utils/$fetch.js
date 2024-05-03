const $fetch = async (url, opts = {}) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const res = await fetch(BASE_URL + url, opts);

  if (!res.ok) {
    const err = new Error(`failed to fetch ${url}`);
    err.code = res.status;

    throw err;
  }

  return res.json();
};

export default $fetch;
