import React from 'react';
import ObjectiveScoreTypeIcon from '../components/ObjectiveScoreTypeIcon';
import { Typography } from '@material-ui/core';

const ObjectiveScoringOverview = ({ objectives }) => {
    return (
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        <div style={{ order: 0}}>
          { objectives[0] > 0 && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center'}}>
              <ObjectiveScoreTypeIcon type={0} style={{width: '.8rem', height: '.8rem', margin: '0 0 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[0]}</Typography>
            </div>
          )}
        </div>
        <div style={{ order: 1}}>
          { objectives[3] > 0 && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .5rem'}}>
              <ObjectiveScoreTypeIcon type={3} style={{width: '.8rem', height: '.8rem', margin: '0 0 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[3]}</Typography>
            </div>
          )}
        </div>
        <div style={{ order: 2}}>
          { objectives[1] > 0 && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .5rem'}}>
              <ObjectiveScoreTypeIcon type={1} style={{width: '.8rem', height: '.8rem', margin: '0 0 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[1]}</Typography>
            </div>
          )}
        </div>
        <div style={{ order: 3}}>
          { objectives[2] > 0 && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .5rem'}}>
              <ObjectiveScoreTypeIcon type={2} style={{width: '.8rem', height: '.8rem', margin: '0 0 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[2]}</Typography>
            </div>
          )}
        </div>
      </div>
    );
}


export default ObjectiveScoringOverview;