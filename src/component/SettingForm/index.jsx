import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { PERIODS } from '../../services/timer';

const SettingForm = () => {
  const [mintWork, setMintWork] = useState(PERIODS.work.mins);
  const [secWork, setSecWork] = useState(PERIODS.work.secs);

  const [mintShortBrk, setMintShortBrk] = useState(PERIODS.shortBrk.mins);
  const [secShortBrk, setSecShortBrk] = useState(PERIODS.shortBrk.secs);

  const [mintLongBrk, setMintLongBrk] = useState(PERIODS.longBrk.mins);
  const [secLongBrk, setSecLongBrk] = useState(PERIODS.longBrk.secs);

  const handelSubmit = (e) => {
    e.preventDefault();
    PERIODS.work.mins = mintWork;
    PERIODS.work.secs = secWork;

    PERIODS.shortBrk.mins = mintShortBrk;
    PERIODS.shortBrk.secs = secShortBrk;

    PERIODS.longBrk.mins = mintLongBrk;
    PERIODS.longBrk.secs = secLongBrk;
  };

  return (
    <>
      <Form onSubmit={handelSubmit}>
        <Form.Label className="text-center" style={{ width: '100%' }}><h4>Work</h4></Form.Label>
        <div className="d-flex flex-row justify-content-sm-around">
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
        <div className="d-flex flex-row justify-content-sm-around">
          <Form.Control type="number" className="w-25" name="workmint" min="0" defaultValue={mintWork} onChange={(e) => setMintWork(e.target.value)} />
          <Form.Control type="number" className="w-25" min="0" defaultValue={secWork} onChange={(e) => setSecWork(e.target.value)} />
        </div>

        <Form.Label className="text-center mt-2" style={{ width: '100%' }}><h4>Short Break</h4></Form.Label>
        <div className="d-flex flex-row justify-content-sm-around">
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
        <div className="d-flex flex-row justify-content-sm-around">
          <Form.Control type="number" className="w-25" min="0" defaultValue={mintShortBrk} onChange={(e) => setMintShortBrk(e.target.value)} />
          <Form.Control type="number" className="w-25" min="0" defaultValue={secShortBrk} onChange={(e) => setSecShortBrk(e.target.value)} />
        </div>

        <Form.Label className="text-center mt-2" style={{ width: '100%' }}><h4>Long Break</h4></Form.Label>
        <div className="d-flex flex-row justify-content-sm-around">
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
        <div className="d-flex flex-row justify-content-sm-around">
          <Form.Control type="number" className="w-25" min="0" defaultValue={mintLongBrk} onChange={(e) => setMintLongBrk(e.target.value)} />
          <Form.Control type="number" className="w-25" min="0" defaultValue={secLongBrk} onChange={(e) => setSecLongBrk(e.target.value)} />
        </div>
        <div className=" d-flex flex-row justify-content-center">
          <Button variant="outline-dark" type="submit" className="w-25 mt-5">Save</Button>
        </div>
      </Form>
    </>
  );
};

export default SettingForm;
