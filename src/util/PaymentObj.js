export const convertFormToObj = (form) => {
    const obj = {};
    Object.keys(form).map((k) => {
      if (!parseInt(k)) return;
      const { name, value } = form[k];
      obj[name] = value;
    });
    return obj;
  };