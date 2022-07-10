import './Orb.css';
import React from 'react'

const STAGE_STATE = {
    stageOne: 0,
    stageTwo: 1,
    stageThree: 2,
    stageFourth: 3
}

const STAGE_BOTTOM_TEXT = {
    stageOne: "in",
    stageTwo: "hold",
    stageThree: "out",
    stageFourth: "hold"
}

const BreathWork3Stage = ({title, stageTimes, stopFlagSet}) => {

    const [secs, setSec] = React.useState(stageTimes[STAGE_STATE.stageOne]);
	const [stage, setStage] = React.useState(STAGE_STATE.stageOne);
	const [bottomText, setBottomText] = React.useState(STAGE_BOTTOM_TEXT.stageOne);
	// if stop flag is 1 end function
    const [stopFlag, setStopFlag] = React.useState(stopFlagSet); 
    const [stopPrevFlag, setStopPrevFlag] = React.useState(stopFlagSet); 
	
    const reset = () => { 
		setSec(stageTimes[STAGE_STATE.stageOne]);
		setStage(STAGE_STATE.stageOne);
	};
	
    const changeTime = () => { 			

		if (STAGE_STATE.stageOne === stage)
		{
			setSec(secs - 1);
			// Set first CSS style
			if ( secs === 1 )
			{
				setSec(stageTimes[STAGE_STATE.stageTwo]);
				setBottomText(STAGE_BOTTOM_TEXT.stageTwo);
				setStage(STAGE_STATE.stageTwo);
			}
		}
		else if (STAGE_STATE.stageTwo === stage)
		{
			// Set second CSS style
			setSec(secs - 1);
			if ( secs === 1 )
			{
				setSec(stageTimes[STAGE_STATE.stageThree]);
				setBottomText(STAGE_BOTTOM_TEXT.stageThree);
				setStage(STAGE_STATE.stageThree);
			}
		}
		else if (STAGE_STATE.stageThree === stage)
		{
			// Set third CSS style
			setSec(secs - 1);
			if ( secs === 1 )
			{
				// Support 4 stages
				if (stageTimes.length === 4) {
					setSec(stageTimes[STAGE_STATE.stageFourth]);
					setBottomText(STAGE_BOTTOM_TEXT.stageFourth);
					setStage(STAGE_STATE.stageFourth);	
				}
				else {
					setSec(stageTimes[STAGE_STATE.stageOne]);
					setBottomText(STAGE_BOTTOM_TEXT.stageOne);
					setStage(STAGE_STATE.stageOne);			
				}
			}			
		}
		else
		{
			// Set Fourth CSS style
			setSec(secs - 1);
			if ( secs === 1 )
			{
				setSec(stageTimes[STAGE_STATE.stageOne]);
				setBottomText(STAGE_BOTTOM_TEXT.stageOne);
				setStage(STAGE_STATE.stageOne);
			}
		}
  
		return;
	}; 
	
    React.useEffect(() => {
		// TODO: validate no time is below 1
		if (!((stageTimes.length === 3) || (stageTimes.length === 4)))
		{
			return;
		};

		setStopFlag(stopFlagSet);
		if (stopPrevFlag != stopFlagSet)
		{
			reset();
		}
		setStopPrevFlag(stopFlagSet);
		if (!stopFlag){
			// call elapsed timer sleep for one second
			const timerId = setInterval(() => changeTime(), 1000);
			return () => clearInterval(timerId);
		}
		else {
			return;
		}
    });
	
	const topText = 'Breathe';
 
    return (
		<div className="topDiv">
		    <p className={`title_${( !stopFlag ) ? "active" : "stopped"}`}><b>{title}</b></p>
			<div className={`instructions_${( !stopFlag ) ? (( STAGE_STATE.stageOne === stage ) ? "in" :  (( (STAGE_STATE.stageTwo === stage) || (STAGE_STATE.stageFourth === stage)  ) ? "hold" : "out")) : "stopped"}`}>{topText}</div>
			<div className="centeredDiv">
				<div className={`orb_${( !stopFlag ) ? (( STAGE_STATE.stageOne === stage ) ? "in" :  (( (STAGE_STATE.stageTwo === stage) || (STAGE_STATE.stageFourth === stage) ) ? "hold" : "out")) : "stopped"}`}  >
					<div>
						<p>{`${secs.toString()}`}</p> 
					</div>
				</div>	
			</div>	
			<div className="centeredDiv">
				<div className={`left_arrow_${( !stopFlag ) ? (( STAGE_STATE.stageOne === stage ) ? "in" :  (( (STAGE_STATE.stageTwo === stage) || (STAGE_STATE.stageFourth === stage) ) ? "hold" : "out")) : "stopped"}`}></div>
				<div className="paddingBottomText">			
					<div className={`instructions_${( !stopFlag ) ? (( STAGE_STATE.stageOne === stage ) ? "in" :  (( (STAGE_STATE.stageTwo === stage) || (STAGE_STATE.stageFourth === stage) ) ? "hold" : "out")) : "stopped"}`}>{bottomText}</div>	
				</div>
				<div className={`right_arrow_${( !stopFlag ) ? (( STAGE_STATE.stageOne === stage ) ? "in" :  (( (STAGE_STATE.stageTwo === stage) || (STAGE_STATE.stageFourth === stage) ) ? "hold" : "out")) : "stopped"}`}></div>			
			</div>
		</div>
    );
}

export default BreathWork3Stage;