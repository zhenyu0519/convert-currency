import React, { Component } from "react";
import { Input } from "./components/input/Input";
import { Title } from "./components/title/Title";
import "./App.css";

// interface for App
interface Props {
  countries: Array<{ country: string; currencycode: string }>;
  selectFrom: string;
  selectTo: string;
  fromInput: string;
  toInput: string;
  from: boolean;
}

class App extends Component<{}, Props> {
  constructor(props: any) {
    super(props);
    this.state = {
      countries: [],
      selectFrom: "",
      selectTo: "",
      fromInput: "1",
      toInput: "1",
      from: true,
    };
  }

  // fetch all names of all countries
  getCountries = async () => {
    const response = await fetch("/getCountry");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  // fetch the amount of converted money
  getAmount = async (from: string, to: string, amount: string) => {
    const response = await fetch(
      `/getAmount?from=${from}&to=${to}&amount=${amount}`
    );
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  componentDidMount() {
    this.getCountries().then((res) => {
      this.setState({ countries: res });
    });
  }

  // select source contry
  handleSelectFrom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    this.setState({ selectFrom: e.target.value });
  };

  // input the source country amount
  handleFromInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.value !== "") {
      this.setState({ fromInput: parseFloat(e.target.value).toString() });
    } else {
      this.setState({ fromInput: "" });
    }
  };

  // convert the money
  handleSubmitInput = (e: React.MouseEvent) => {
    const { selectFrom, selectTo, fromInput } = this.state;
    this.getAmount(selectFrom, selectTo, fromInput)
      .then((res) => {
        this.setState({ toInput: res });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // select destination country
  handleSelectTo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    this.setState({ selectTo: e.target.value });
  };

  render() {
    const {
      countries,
      fromInput,
      from,
      toInput,
    } = this.state;

    return (
      <div className="App">
        <div className="converter" id="converter">
          <Title title={"Convert Currency"} />
          <div className="operation" id="operation">
            <Input
              countries={countries}
              select={this.handleSelectFrom}
              input={this.handleFromInput}
              from={from}
              value={fromInput}
              label={"From"}
            />
            <button
              className="convert"
              id="convert"
              onClick={this.handleSubmitInput}
            >
              Convert
            </button>
            <Input
              countries={countries}
              select={this.handleSelectTo}
              from={!from}
              value={parseFloat(toInput).toFixed(2).toString()}
              label={"To"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
