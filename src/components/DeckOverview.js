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
import { cardSetIcons, cardsDb, cardType } from '../data/index'; 


const styles = theme => ({
  card: {
    maxWidth: 400,
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

const CardNumberNameSet = ({ id, name, set }) => (
    <div style={{display: 'flex'}}>
        <div style={{width: '2rem', textAlign: 'right', marginRight: '.5rem'}}>{`${parseInt(id.slice(-3), 10)}.`}</div>
        <Typography style={{marginRight: '.5rem'}}>{name}</Typography>
        <SetIcon set={set} />
    </div>
);  

const ListOfCardsByType = ({ type, cards }) => (
    <div>
        <div style={{borderBottom: '1px solid gray', marginBottom: '1rem'}}>
            <Typography variant="headline">{`${cardType[type]}s`}</Typography>
        </div>
        {
            cards.sort((c1, c2) => c1.id - c2.id)
                    .map(({ id, name, set }) => <CardNumberNameSet key={id} id={id} name={name} set={set} />)
        }
    </div>
);

class DeckOverview extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, id, name, sets, cards, created } = this.props;
    const cardsInDeck = cards.map(cardPN => ({id: cardPN, ...cardsDb[cardPN]}));
    const objectives = cardsInDeck.filter(c => c.type === 0);
    const ploys = cardsInDeck.filter(c => c.type === 1);
    const upgrades = cardsInDeck.filter(c => c.type === 2);
    return (
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
          {/* <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton> */}
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
              <div>
                  <ListOfCardsByType type={0} cards={objectives} />
                  <ListOfCardsByType type={1} cards={ploys} />
                  <ListOfCardsByType type={2} cards={upgrades} />
              </div>
            {/* <Typography paragraph variant="body2">
              Method:
            </Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
              chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
              salt and pepper, and cook, stirring often until thickened and fragrant, about 10
              minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
              to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography> */}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

DeckOverview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeckOverview);