import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import * as ROUTES from "../../constants/routes";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import packageJson from "../../../package.json";

function ListItemLink(props) {
    const { icon, primary, to, onItemClick } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to]
    );

    return (
        <li>
            <ListItem button component={renderLink} onClick={onItemClick}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    onItemClick: PropTypes.func,
};

function SideList({ onLinkClicked }) {
    return (
        <div>
            <List component="nav">
                <ListItemLink
                    primary="Deck Builder"
                    to="/deck/create"
                    onItemClick={onLinkClicked}
                />
                <ListItemLink
                    primary="Public Decks"
                    to={ROUTES.BROWSE_ALL_DECKS}
                    onItemClick={onLinkClicked}
                />
                <ListItemLink
                    primary="Card Library"
                    to={ROUTES.CARDS_LIBRARY}
                    onItemClick={onLinkClicked}
                />
                <ListItemLink
                    primary="Statistics"
                    to={ROUTES.STATISTICS}
                    onItemClick={onLinkClicked}
                />

                <Divider />

                <ListItemLink
                    primary="My Decks"
                    to={ROUTES.MY_DECKS}
                    onItemClick={onLinkClicked}
                />

                <Divider />

                <ListItemLink
                    primary="Feedback"
                    to={ROUTES.FEEDBACK}
                    onItemClick={onLinkClicked}
                />
                <ListItemLink
                    primary={`About (ver. ${packageJson.version})`}
                    to={ROUTES.ABOUT}
                    onItemClick={onLinkClicked}
                />
            </List>
        </div>
    );
}

SideList.propTypes = {
    onLinkClicked: PropTypes.func,
};

export default SideList;
