import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import AccountBox from "@material-ui/icons/AccountBox";
import Link from 'next/link';
import withStyles from "@material-ui/core/styles/withStyles";
import {getUserFeed, followUser} from "../../lib/api";

class UserFeed extends React.Component {
    state = {
        users: [],
        openSuccess: false,
        followingMessage: ""
    };

    componentDidMount() {
        const {auth} = this.props;

        getUserFeed(auth.user._id).then(users => this.setState({users}));
    }

    handleClose = () => this.setState({openSuccess: false});

    handleFollow = (user, userIndex) => {
        followUser(user._id).then(user => {
            const updatedUsers = [
                ...this.state.users.slice(0, userIndex),
                ...this.state.users.slice(userIndex + 1)
            ];

            this.setState({
                users: updatedUsers,
                openSuccess: true,
                followingMessage: `Following ${user.name}`,
            });
        })
    };

    render() {
        const {classes} = this.props;
        const {users, openSuccess, followingMessage} = this.state;

        return (
            <div>
                <Typography
                    type="title"
                    variant="h6"
                    component="h2"
                    align="center"
                >
                    Browse Users
                </Typography>
                <Divider/>

                <List>
                    {users.map((user, i) => (
                        <span key={user._id}>
                            <ListItem>
                                <ListItemAvatar className={classes.avatar}>
                                    <Avatar src={user.avatar}>

                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.name}/>
                                <ListItemSecondaryAction className={classes.follow}>
                                    <Link href={`/profile?userId=${user._id}`} as={`/profile/${user._id}`}>
                                        <IconButton
                                            variant="contained"
                                            color="secondary"
                                            className={classes.viewButton}
                                        >
                                            <AccountBox/>
                                        </IconButton>
                                    </Link>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.handleFollow(user, i)}
                                    >
                                        Follow
                                    </Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </span>
                    ))}
                </List>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    open={openSuccess}
                    onClose={this.handleClose}
                    autoHideDuration={3000}
                    message={<span className={classes.snack}>{followingMessage}</span>}
                />
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        padding: theme.spacing.unit
    },
    avatar: {
        marginRight: theme.spacing.unit
    },
    follow: {
        right: theme.spacing.unit * 2
    },
    snack: {
        color: theme.palette.primary.light
    },
    viewButton: {
        verticalAlign: "middle"
    }
});

export default withStyles(styles)(UserFeed);
