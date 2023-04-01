export const fetchingData = async () => {
  const res = await fetch("../dummy/duplication.json");
  const json = await res.json();
  console.log(json);
  return json;
};
