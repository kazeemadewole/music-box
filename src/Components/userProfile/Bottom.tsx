import React from 'react';
import { Radio, RadioGroup } from 'react-radio-group';
import '../listeningHistory/style.css';

const BottomComp = () => {
  return (
    <div>
      <div className='social-wrapper'>
        <div className='social-wrapper-child1'>
          <span>Facebook</span>
          <span style={{ opacity: '0.4', fontSize: '14px' }}>Not Connected</span>
        </div>
        <div className='social-wrapper-child1'>
          <span>Google</span>
          <span style={{ opacity: '0.4', fontSize: '14px' }}>Not Connected</span>
        </div>
      </div>
      <div className='streamingParent'>
        <h3 className='streaming'>Streaming</h3>
        <p className='premium-feature'>Audio Quality(Premium feature)</p>
        <hr className='horizon' />
        <RadioGroup name='fruits' className='radio-paren'>
          <div className='radio-button-background'>
            <Radio value='normal' className='radio-button' />
            <p className='buttonText'>Normal (128 kb/s)</p>
          </div>
          <div className='radio-button-background'>
            <Radio value='high' className='radio-button' />
            <p className='buttonText'>High (192 kb/s)</p>
          </div>
          <div className='radio-button-background'>
            <Radio value='highest' className='radio-button' />
            <p className='buttonText'>Highest (320 kb/s)</p>
          </div>
        </RadioGroup>
        <hr className='horizon horizon2' />
      </div>
    </div>
  );
};

export default BottomComp;
