import React from 'react';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'; 

import * as packageInfo from '../../package.json';
import * as changelog from '../changelog.json';
import * as _ from 'lodash';

const uuid4 = require('uuid/v4');

const styles = {
    root: {
        display: 'flex',
        flexFlow: 'column wrap'
    },

    item: {
        marginLeft: '1rem'
    },

    changeLogItem: {
        display: 'flex',
        flexFlow: 'column wrap',
        marginLeft: '1rem'
    },

    entry: {
        fontFamily: 'roboto'
    }
}

const About = ({ classes }) => {
    const lastUpdateKey = _.head(_.keys(changelog))
    const lastUpdate = _.chain(changelog[lastUpdateKey])
                        .keys()
                        .reduce((acc, v) => [...acc, {name: v, description: changelog[lastUpdateKey][v]}], [])
                        .value();

    return (
        <div className={classes.root}>
            <Typography variant="headline" className={classes.item}>
                <ReactMarkdown source={`Current version: **${packageInfo.version}**`} />
            </Typography>

            <Typography variant="headline" className={classes.item}>
                { `What's new?` }
            </Typography>

            <div>
                {
                    lastUpdate.map(entry => (
                        <div key={uuid4()} className={classes.changeLogItem}>
                            <ReactMarkdown className={classes.entry} source={`**${entry.name}:**`} />
                            {
                                entry.description.split('/n').map(line => (
                                    <ReactMarkdown key={uuid4()} className={classes.entry} source={`${line}`} />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default withStyles(styles)(About);