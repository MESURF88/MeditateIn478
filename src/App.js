import './App.css';
import BreathWork3Stage from './BreathWork3Stage';
import React, { useState } from 'react';

const MEDITATE_PROFILE = {
    0: { idx: 0, title: "tranquility", stageTimes: [4, 7, 8]},
    1: { idx: 1, title: "relax", stageTimes: [8, 4, 8]},
    2: { idx: 2, title: "endurance", stageTimes: [8, 10, 8, 10]},
    3: { idx: 3, title: "box", stageTimes: [4, 4, 4, 4]},
    4: { idx: 4, title: "short box", stageTimes: [3, 3, 3, 3]},
    5: { idx: 5, title: "focus", stageTimes: [3, 6, 6]},
    6: { idx: 6, title: "superendurance", stageTimes: [10, 30, 10, 4]}
};
const MAX_PROFILES = 7;

const RUN_STOP_STATE = {
    run: 0,
    stop: 1
};

function App() { 
  const [runToggle, setRunToggle] = useState(RUN_STOP_STATE.stop);
  const [profile, setProfile] = useState(MEDITATE_PROFILE[0]);
  
  const setRunStopToggle = () => {
	if (runToggle === RUN_STOP_STATE.run)
	{
		setRunToggle(RUN_STOP_STATE.stop);
	}
	else {
		setRunToggle(RUN_STOP_STATE.run);
	}
	return;
  };
  
  const navLeft = () => {
	if (profile.idx === 0)
	{
		setProfile(MEDITATE_PROFILE[MAX_PROFILES - 1])
	}	
	else {
		var nextIdx = profile.idx - 1;
		setProfile(MEDITATE_PROFILE[nextIdx])
	}	
  };
  
  const navRight = () => {
	if (profile.idx === (MAX_PROFILES - 1))
	{
		setProfile(MEDITATE_PROFILE[0])
	}	
	else {
		var nextIdx = profile.idx + 1;
		setProfile(MEDITATE_PROFILE[nextIdx])
	}	
  };
  
  const arrowLeft = "<"; 
  const arrowRight = ">";
  return (
    <div className="App">
      <header className="App-header">
		<div className="bgBox">
		  <h3>Meditate</h3>
		   { (runToggle) ? 
		    <div>
				<p>Select Meditation Profile</p>
				<div className="centeredDiv">
					<button className="prettyNavButtonLeft" onClick={() => navLeft()} >{arrowLeft}</button> 
					<div className="selectionBox">
						{profile.title}
					</div>
					<button className="prettyNavButtonRight" onClick={() => navRight()}>{arrowRight}</button> 
				</div>
			</div>			
            : null }			
		    { (!runToggle) ? <BreathWork3Stage title={profile.title} stageTimes={profile.stageTimes} stopFlagSet={runToggle}/> : null }
			<button className="prettyButton" onClick={() => setRunStopToggle()} >{`${( !runToggle ) ?  "Stop" : "Start" }`}</button>
		</div>
      </header>
    </div>
  );
}

export default App;
