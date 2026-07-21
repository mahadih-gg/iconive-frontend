const currencyConverter = (currency: string, amount: number): number | string => {
  const rate = parseFloat(
    process.env.NEXT_PUBLIC_FX_RATE ?? process.env.REACT_APP_FX_RATE ?? "106",
    10,
  );
  if (currency === "USD") return (amount / rate).toFixed(2);
  return amount;
};

export default currencyConverter;
