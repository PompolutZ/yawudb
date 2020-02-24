import React, { PureComponent } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    colorSwitchBase: {
        '&$colorChecked': {
             color: '#3B9979',
            '& + $colorBar': {
                backgroundColor: '#8CCCB4',
            },
        },
    },
    
    colorBar: {},
    
    colorChecked: {},    
})

class WUSwitch extends PureComponent {
    render() {
        const { classes, style, isChecked, onChange, label } = this.props;
        return (
            <FormControlLabel style={style}
                control={
                    <Switch classes={{
                        switchBase: classes.colorSwitchBase,
                        checked: classes.colorChecked,
                    }}
                    checked={isChecked} 
                    onChange={onChange} />
                }
                label={label} />
        );
    }
}

export default withStyles(styles)(WUSwitch);