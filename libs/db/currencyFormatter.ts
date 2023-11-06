const CurrencyFormatter = (price: number) => {
  const formattedPrice = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "php",
  }).format(price);

  return formattedPrice
};

export default CurrencyFormatter;
