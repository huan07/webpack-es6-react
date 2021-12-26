import React, { PureComponent } from 'react';

// 将多个组件中需要共享的 state 向上移动到它们最近的共同父组件中
// 父组件的 state 作为子组件的 props, 父组件的重新渲染会触发子组件的重新渲染
function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil</p>;
  }
  return <p>The water would not boil</p>;
}

class TemperatureInput extends PureComponent {
  scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit',
  };

  handleChange = (evt) => {
    console.log('1.子evt =>', evt, evt.target.value);

    this.props.onTemperatureChange(evt.target.value);
  };

  render() {
    const { temperature, scale } = this.props;

    console.log('4.子render() =>', scale, temperature);

    return (
      <fieldset>
        <legend>Enter temperature in {this.scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends PureComponent {
  state = { temperature: '', scale: 'c' }; // 两个输入的 “单一数据来源”

  handleCelsiusChange = (temperature) => {
    console.log('2. temperature =>', temperature);

    this.setState({ scale: 'c', temperature });
  };

  handleFahrenheitChange = (temperature) => {
    this.setState({ scale: 'f', temperature });
  };

  render() {
    const { temperature, scale } = this.state;
    const celsius =
      scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    console.log('3. render() =>', scale, temperature);

    return (
      <>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <br />
        <br />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </>
    );
  }
}

export default Calculator;
