import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShareIcon from '@material-ui/icons/Share';
import { cardSetIcons, cardsDb, cardType } from '../data/index';
import { withRouter } from 'react-router-dom'; 
import SimpleSnackbar from './SimpleSnackbar';
import { Set } from 'immutable';
import './DeckOverview.css';
import ObjectiveScoreTypeIcon from './ObjectiveScoreTypeIcon';

const styles = theme => ({
  card: {
    // maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

const CardTypeCounter = ({type, count}) => (
    <div style={{display: 'flex', alignItems: 'center', marginRight: '.5rem'}}>
        <img src={`/assets/icons/${type}-icon.png`} alt="objective" width="24" height="24" style={{margin: '0 .1rem 0 0'}} />        
        <div style={{margin: '0 0 0 .1rem', fontSize: '1.2rem'}}>{count}</div>
    </div>
);

const SetIcon = ({ set }) => (
    <img style={{margin: 'auto .1rem'}} src={`/assets/icons/${cardSetIcons[set]}-icon.png`} width="24" height="24" alt="icon" />
)

const CardNumberNameSet = ({ id, name, set, scoreType }) => (
    <div style={{display: 'flex'}}>
        <div style={{width: '2rem', textAlign: 'right', marginRight: '.5rem'}}>{`${parseInt(id.slice(-3), 10)}.`}</div>
        <Typography style={{marginRight: '.5rem'}}>{name}</Typography>
        <SetIcon set={set} />
        {
            scoreType >= 0 && (<ObjectiveScoreTypeIcon type={scoreType} style={{width: '24', height: '24', margin: '0 .2rem 0 0'}} />)
        }
    </div>
);  

const ListOfCardsByType = ({ type, cards, className }) => (
    <div className={className}>
        <div style={{borderBottom: '1px solid gray', marginBottom: '1rem'}}>
            <Typography variant="headline">{`${cardType[type]}s`}</Typography>
        </div>
        {
            cards.sort((c1, c2) => c1.id - c2.id)
                    .map(({ id, name, set, scoreType }) => <CardNumberNameSet key={id} id={id} name={name} set={set} scoreType={scoreType} />)
        }
    </div>
);

const ObjectiveScoringOverview = ({ objectives }) => {
    return (
      <div style={{display: 'flex', flexFlow: 'row wrap', margin: 'auto 1rem .5rem 1rem'}}>
        <div style={{ order: 0}}>
          { objectives[0] && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center'}}>
              <ObjectiveScoreTypeIcon type={0} style={{width: '1rem', height: '1rem', margin: '0 .2rem 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[0].count()}</Typography>
            </div>
          )}
        </div>
        <div style={{ order: 1}}>
          { objectives[3] && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .5rem'}}>
              <ObjectiveScoreTypeIcon type={3} style={{width: '1rem', height: '1rem', margin: '0 .2rem 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[3].count()}</Typography>
            </div>
          )}
        </div>
        <div style={{ order: 2}}>
          { objectives[1] && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .5rem'}}>
              <ObjectiveScoreTypeIcon type={1} style={{width: '1rem', height: '1rem', margin: '0 .2rem 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[1].count()}</Typography>
            </div>
          )}
        </div>
        <div style={{ order: 3}}>
          { objectives[2] && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .5rem'}}>
              <ObjectiveScoreTypeIcon type={2} style={{width: '1rem', height: '1rem', margin: '0 .2rem 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[2].count()}</Typography>
            </div>
          )}
        </div>
      </div>
    );
}

class DeckOverview extends React.Component {
  state = { 
    expanded: false,
    showNotification: false 
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleCopyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);    this.setState({showNotification: true});
  };

  render() {
    const { classes, id, name, sets, cards, created, history } = this.props;
    const cardsInDeck = cards.map(cardPN => ({id: cardPN, ...cardsDb[cardPN]}));
    const objectives = cardsInDeck.filter(c => c.type === 0);
    const objectiveSummary = new Set(objectives).groupBy(c => c.scoreType).toArray();
    const ploys = cardsInDeck.filter(c => c.type === 1);
    const upgrades = cardsInDeck.filter(c => c.type === 2);
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar} src={`/assets/icons/${id.substring(0, id.length - 13)}-icon.png`} />
            }
          //   action={
          //     <IconButton>
          //       <MoreVertIcon />
          //     </IconButton>
          //   }
            title={name}
            subheader={created ? created.toDate().toLocaleDateString() : 'Unknown'}
          />
          {/* <CardMedia
            className={classes.media}
            image="/static/images/cards/paella.jpg"
            title="Contemplative Reptile"
          /> */}
              <div style={{display: 'flex', alignItems: 'center', margin: 'auto 1rem .5rem 1rem'}}>
                  <div>Sets:</div>
                  {
                      sets.sort((a, b) => a - b).map(s => <SetIcon key={s * 31}  set={s} />)
                  }
              </div>

              <ObjectiveScoringOverview objectives={objectiveSummary} />

              <div style={{display: 'flex', alignItems: 'center', margin: 'auto 1rem .5rem 1rem'}}>
                  <CardTypeCounter type="objective" count={objectives.length} />    
                  <CardTypeCounter type="ploy" count={ploys.length} />    
                  <CardTypeCounter type="upgrade" count={upgrades.length} />    
              </div>
          <CardContent>

            {/* <Typography component="p">
              This impressive paella is a perfect party dish and a fun meal to cook together with your
              guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography> */}
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="View the deck" onClick={() => history.push(`/deck/${id}`)}>
              <VisibilityIcon />
            </IconButton>
            <IconButton aria-label="View the deck" onClick={() => this.handleCopyToClipboard(`yawudb.com/deck/${id}`)}>
              <ShareIcon />
            </IconButton>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <div className="cardListWrapper">
                    <ListOfCardsByType className="listItem objectivesList" type={0} cards={objectives} />
                    <ListOfCardsByType className="listItem ploysList" type={1} cards={ploys} />
                    <ListOfCardsByType className="upgradesList" type={2} cards={upgrades} />
                </div>
            </CardContent>
          </Collapse>
        </Card>
        { this.state.showNotification && <SimpleSnackbar position="center" message="Deck URL copied to clipboard!" /> }
      </div>
    );
  }
}

DeckOverview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(DeckOverview));