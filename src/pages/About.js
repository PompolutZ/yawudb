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

const getChangeLogItemsByKey = key => {
    return _.chain(changelog[key])
    .keys()
    .reduce((acc, v) => [...acc, {name: v, description: changelog[key][v]}], [])
    .value()
}

const About = ({ classes }) => {
    const lastUpdateKey = _.head(_.keys(changelog))
    const lastUpdate = getChangeLogItemsByKey(lastUpdateKey);
    const previousReleases = _.chain(changelog)
                             .keys()
                             .drop(1)
                             .map(k => ({release: k, log: getChangeLogItemsByKey(k)}))
                             .value();
    console.log(lastUpdate);                                                    
    console.log(previousReleases);
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

            <Typography variant="headline" className={classes.item}>
                { `Previous releases:` }
            </Typography>

            <div>
                {
                    previousReleases.map(entry => (
                        <div key={uuid4()}>
                            <Typography variant="subheading" className={classes.item}>
                                <ReactMarkdown source={ `**${entry.release}**` } />
                            </Typography>
                            {
                                entry.log.map(historyEntry => (
                                    <div key={uuid4()} className={classes.changeLogItem}>
                                        <ReactMarkdown className={classes.entry} source={`**${historyEntry.name}:**`} />
                                        {
                                            historyEntry.description.split('/n').map(line => (
                                                <ReactMarkdown key={uuid4()} className={classes.entry} source={`${line}`} />
                                            ))
                                        }
                                    </div>
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