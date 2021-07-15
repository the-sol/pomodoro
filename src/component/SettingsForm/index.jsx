import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import firebase from '../../firebase';

const SettingsForm = ({ onShouldAutoStartChange, shouldAutoStart, periods }) => {
  const [settingsPeriods, setSettingsPeriods] = useState(periods);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.firestore().collection('timer').doc('settings').set({
      periods: settingsPeriods,
    }, { merge: true });
  };

  const changePeriod = (periodName, propertyKey, propertyValue) => {
    setSettingsPeriods({
      ...settingsPeriods,
      [periodName]: {
        ...settingsPeriods[periodName],
        [propertyKey]: parseInt(propertyValue, 10),
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {Object.keys(settingsPeriods).map((period) => (
        <div key={period}>
          <h4 className="text-center">{period}</h4>
          <div className="d-flex flex-row justify-content-sm-around">
            <Form.Label htmlFor={`${settingsPeriods[period].id}-mins`}>Minutes</Form.Label>
            <Form.Label htmlFor={`${settingsPeriods[period].id}-secs`}>Seconds</Form.Label>
          </div>
          <div key={period} className="d-flex flex-row justify-content-sm-around">
            <Form.Control
              type="number"
              className="w-25"
              name={`${settingsPeriods[period].id}-mins`}
              min="0"
              defaultValue={settingsPeriods[period].mins}
              onChange={(e) => changePeriod(period, 'mins', e.target.value)}
            />
            <Form.Control
              type="number"
              className="w-25"
              name={`${settingsPeriods[period].id}-secs`}
              min="0"
              defaultValue={settingsPeriods[period].secs}
              onChange={(e) => changePeriod(period, 'secs', e.target.value)}
            />
          </div>
        </div>
      ))}

      <h5 className="mt-4 d-flex flex-row justify-content-center">Start Automatically Next period</h5>
      <div className="mt-2 d-flex flex-row justify-content-center">
        <BootstrapSwitchButton
          onlabel="ON"
          offlabel="OFF"
          onstyle="outline-info"
          offstyle="outline-dark"
          width={100}
          height={30}
          checked={shouldAutoStart}
          onChange={onShouldAutoStartChange}
        />
      </div>
      <div className="d-flex flex-row justify-content-end">
        <Button variant="outline-dark" type="submit" className="w-23 mt-5">Save</Button>
      </div>
    </Form>
  );
};

SettingsForm.propTypes = {
  onShouldAutoStartChange: PropTypes.func.isRequired,
  shouldAutoStart: PropTypes.bool.isRequired,
  periods: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      mins: PropTypes.number.isRequired,
      secs: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default SettingsForm;
