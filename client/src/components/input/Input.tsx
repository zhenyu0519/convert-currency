import React from "react";
import "./input.css";

// interface for Input
interface Props {
  countries: Array<{ country: string; currencycode: string }>;
  select(e: React.ChangeEvent<HTMLSelectElement>): void;
  input?(e: React.ChangeEvent<HTMLInputElement>): void;
  from: boolean;
  value: string;
  label: string;
  defaultCountry: string;
}

export const Input: React.FC<Props> = ({
  countries,
  select,
  input,
  from,
  value,
  label,
  defaultCountry,
}) => {
  return (
    <form className="form" id="form">
      <label htmlFor="countryList">{label}</label>
      <select name="countryList" id="contryList" onChange={select}>
        {countries.map((country) => (
          <option
            key={country.country}
            value={country.currencycode.toLowerCase()}
          >
            {country.country + " (" + country.currencycode.toUpperCase() + ")"}
          </option>
        ))}
      </select>
      <label htmlFor="amount">Amount</label>
      <input type="number" onChange={input} readOnly={!from} value={value} />
    </form>
  );
};
