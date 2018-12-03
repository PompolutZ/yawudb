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
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import { setsIndex, cardsDb, cardType, idPrefixToFaction, PREFIX_LENGTH, warbandsWithDefaultSet, restrictedCards, bannedCards } from '../data/index';
import { withRouter } from 'react-router-dom'; 
import SimpleSnackbar from './SimpleSnackbar';
import { Set } from 'immutable';
import './DeckOverview.css';
import ObjectiveScoreTypeIcon from './ObjectiveScoreTypeIcon';
import CardTypeCounter from './CardTypeCounter';
import { ADD_CARD, SET_FACTION, CHANGE_NAME, CHANGE_DESCRIPTION } from '../reducers/deckUnderBuild';
import { SET_SETS } from '../reducers/cardLibraryFilters';
import { connect } from 'react-redux';
import { pickCardColor } from '../utils/functions';
import RestrictedBannedCardsCount from '../atoms/RestrictedBannedCardsCount';
import ExpansionIcon from '../atoms/ExpansionIcon';

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

const SetIcon = ({ set }) => (
    <img style={{margin: 'auto .1rem'}} src={`/assets/icons/${setsIndex[set]}-icon.png`} width="24" height="24" alt="icon" />
)

const CardNumberNameSet = ({ id, name, set, scoreType }) => (
    <div style={{display: 'flex'}}>
        <div style={{width: '2rem', textAlign: 'right', marginRight: '.5rem'}}>{`${parseInt(id.slice(-3), 10)}.`}</div>
        <Typography style={{marginRight: '.5rem', color: pickCardColor(id)}}>{name}</Typography>
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
          { objectives[0] > 0 && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center'}}>
              <ObjectiveScoreTypeIcon type={0} style={{width: '1rem', height: '1rem', margin: '0 .2rem 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[0]}</Typography>
            </div>
          )}
        </div>
        <div style={{ order: 1}}>
          { objectives[3] > 0 && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .5rem'}}>
              <ObjectiveScoreTypeIcon type={3} style={{width: '1rem', height: '1rem', margin: '0 .2rem 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[3]}</Typography>
            </div>
          )}
        </div>
        <div style={{ order: 2}}>
          { objectives[1] > 0 && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .5rem'}}>
              <ObjectiveScoreTypeIcon type={1} style={{width: '1rem', height: '1rem', margin: '0 .2rem 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[1]}</Typography>
            </div>
          )}
        </div>
        <div style={{ order: 3}}>
          { objectives[2] > 0 && (
            <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', margin: '0 0 0 .5rem'}}>
              <ObjectiveScoreTypeIcon type={2} style={{width: '1rem', height: '1rem', margin: '0 .2rem 0 0'}} />
              <Typography style={{fontSize: '1rem'}}>{objectives[2]}</Typography>
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

  editDeck = () => {
      const strippedId = this.props.id.substring(0, this.props.id.length - 13);
      const faction = strippedId.length > PREFIX_LENGTH ? strippedId : idPrefixToFaction[strippedId];
      const defaultSet = warbandsWithDefaultSet.filter(a => a.includes(faction));
      this.props.setFaction(faction, defaultSet[0][1]);
      this.props.setSets(this.props.sets);
      for(let c of this.props.cards) {
          this.props.addCard(c);
      }
      
      this.props.setName(this.props.name);
      this.props.setDescription(this.props.desc);
      this.props.history.push(`/deck/edit/${this.props.id}`);
  }

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
    const { classes, id, name, sets, cards, created, author, history, isEditable } = this.props;
    const cardsInDeck = cards.map(cardPN => ({id: cardPN, ...cardsDb[cardPN]}));
    const bannedCardsCount = cards.filter(id => Boolean(bannedCards[id])).length;
    const restrictedCardsCount = cards.filter(id => Boolean(restrictedCards[id])).length;
    const objectives = cardsInDeck.filter(c => c.type === 0);
    const objectiveSummary = new Set(objectives).groupBy(c => c.scoreType).reduce((r, v, k) => {
        r[k] = v.count();
        return r;
    }, [0, 0, 0, 0]);
    const gambits = cardsInDeck.filter(c => c.type === 1 || c.type === 3);
    const upgrades = cardsInDeck.filter(c => c.type === 2);
    const strippedId = id.substring(0, id.length - 13);
    const faction = strippedId.length > PREFIX_LENGTH ? strippedId : idPrefixToFaction[strippedId]; 
    const createdDate = created ? ` | ${new Date(created).toLocaleDateString()}` : '';
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar} src={`/assets/icons/${faction}-icon.png`} />
            }
            title={name}
            subheader={`${author}${createdDate}`}
          />
              <div style={{display: 'flex', alignItems: 'center', margin: 'auto 1rem .5rem 1rem'}}>
                  <div>Sets:</div>
                  {
                      sets.sort((a, b) => a - b).map(s => <ExpansionIcon key={s * 31}  set={s} />)
                  }
              </div>

              <ObjectiveScoringOverview objectives={objectiveSummary} />
              
              <CardTypeCounter objectivesCount={objectives.length}
                              gambitsCount={gambits.length}
                              upgradesCount={upgrades.length}
                              isAnySpells={gambits.filter(c => c.type === 3).length > 0} />
              
              <RestrictedBannedCardsCount style={{ marginLeft: '1rem'}} banned={bannedCardsCount} restricted={restrictedCardsCount} />
          <CardContent>

          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="View the deck" onClick={() => history.push(`/view/deck/${id}`)}>
              <VisibilityIcon />
            </IconButton>
            <IconButton aria-label="Share deck" onClick={() => this.handleCopyToClipboard(`yawudb.com/view/deck/${id}`)}>
              <ShareIcon />
            </IconButton>
            {
              isEditable && (
                <IconButton aria-label="Edit deck" onClick={this.editDeck}>
                  <EditIcon />
                </IconButton>
              )
            }
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
                    <ListOfCardsByType className="listItem gambitsList" type={1} cards={gambits} />
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

const mapDispatchToProps = dispatch => {
    return {
        addCard: card => dispatch({ type: ADD_CARD, card: card}),
        setName: name => dispatch({ type: CHANGE_NAME, name: name}),
        setDescription: desc => dispatch({ type: CHANGE_DESCRIPTION, desc: desc }),
        setFaction: (faction, defaultSet) => dispatch({ type: SET_FACTION, faction: faction, defaultSet: defaultSet }),
        setSets: sets => dispatch({ type: SET_SETS, payload: sets })
    }
}

export default connect(null, mapDispatchToProps)(withRouter(withStyles(styles)(DeckOverview)));