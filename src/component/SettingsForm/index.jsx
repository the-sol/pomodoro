import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { PERIODS } from '../../services/timer';

const SettingsForm = () => {
  const [periods, setPeriods] = useState(PERIODS);

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.assign(PERIODS, periods);
  };
  const changePeriod = (periodName, propertyKey, propertyValue) => {
    setPeriods({
      ...periods,
      [periodName]: {
        ...periods[periodName],
        [propertyKey]: parseInt(propertyValue, 10),
      },
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      {Object.keys(periods).map((period) => (
        <div key={period}>
          <h4 className="text-center">{period}</h4>
          <div className="d-flex flex-row justify-content-sm-around">
            <Form.Label htmlFor={`${periods[period].id}-mins`}>Minutes</Form.Label>
            <Form.Label htmlFor={`${periods[period].id}-secs`}>Seconds</Form.Label>
          </div>
          <div key={period} className="d-flex flex-row justify-content-sm-around">
            <Form.Control
              type="number"
              className="w-25"
              name={`${periods[period].id}-mins`}
              min="0"
              defaultValue={periods[period].mins}
              onChange={(e) => changePeriod(period, 'mins', e.target.value)}
            />
            <Form.Control
              type="number"
              className="w-25"
              name={`${periods[period].id}-secs`}
              min="0"
              defaultValue={periods[period].secs}
              onChange={(e) => changePeriod(period, 'secs', e.target.value)}
            />
          </div>
        </div>
      ))}
      <div className=" d-flex flex-row justify-content-center">
        <Button variant="outline-dark" type="submit" className="w-25 mt-5">Save</Button>
      </div>
    </Form>
  );
};
export default SettingsForm;
