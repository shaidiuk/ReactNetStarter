import  * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/WeatherForecasts';

type WeatherForecastProps =
  WeatherForecastsStore.WeatherForecastsState 
  & typeof WeatherForecastsStore.actionCreators 
  & RouteComponentProps<{ startDateIndex: string }>; 


function FetchData(props : WeatherForecastProps) {
  React.useEffect(() => {
    const startDateIndexParams = parseInt(props.match.params.startDateIndex, 10) || 0;
    props.requestWeatherForecasts(startDateIndexParams);
  }, [props.match.params.startDateIndex]);

  return (
      <>
        <h1 id="tabelLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
        {renderForecastsTable(props.forecasts)}
        {renderPagination(props.isLoading, props.startDateIndex)}
      </>
    );
}

const renderForecastsTable = (forecasts:WeatherForecastsStore.WeatherForecast[]) => {
  return (
    <table className='table table-striped' aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {forecasts.map((forecast: WeatherForecastsStore.WeatherForecast) =>
          <tr key={forecast.date}>
            <td>{forecast.date}</td>
            <td>{forecast.temperatureC}</td>
            <td>{forecast.temperatureF}</td>
            <td>{forecast.summary}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

const renderPagination = (isLoading: boolean, startDateIndex?: number) => {
  const startIndex = (startDateIndex || 0);
  const prevStartDateIndex = startIndex >= 5 ?  startIndex - 5 : 0;
  const nextStartDateIndex = startIndex + 5;

  return (
    <div className="d-flex justify-content-between">
      <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${prevStartDateIndex}`}>Previous</Link>
      {isLoading && <span>Loading...</span>}
      <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${nextStartDateIndex}`}>Next</Link>
    </div>
  );
}

export default connect(
  (state: ApplicationState) => state.weatherForecasts,
  WeatherForecastsStore.actionCreators
)(FetchData as any); // eslint-disable-line @typescript-eslint/no-explicit-any
