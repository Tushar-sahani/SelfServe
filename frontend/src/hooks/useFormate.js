// dateString Formate (YYYY-MM-DD)

const useFormate = (dateString) => {
  console.log(dateString);
  
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);
  const currentYear = new Date().getFullYear();
  const [day, month, year] = formattedDate.split(" ");

  if (date.getFullYear() === currentYear) {
    return `${month.slice(0, 3)} ${day}`;
  }
  return `${month.slice(0, 3)} ${day.replace(",", "")}, ${year}`;
};

export default useFormate;
