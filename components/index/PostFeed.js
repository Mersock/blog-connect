import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Post from './Post';
import NewPost from "./NewPost";

class PostFeed extends React.Component {
    state = {
        posts: [],
        text: "",
        image: ""
    };

    componentDidMount() {
       this.userData = new FormData();
    }

    handleChange = event => {
        let inputValue;

        if (event.target.name == "image") {
            inputValue = event.target.files[0]
        } else {
            inputValue = event.target.value;
        }
        this.userData.set(event.target.name, inputValue);
        this.setState({[event.target.name]: inputValue});
    };

    render() {
        const {classes, auth} = this.props;
        const {text, image} = this.state;

        return (
            <div className={classes.root}>
                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    color="primary"
                    className={classes.title}
                >
                    Post Feed

                    <NewPost
                        auth={auth}
                        text={text}
                        image={image}
                        handleChange={this.handleChange}
                    />
                </Typography>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        paddingBottom: theme.spacing.unit * 2
    },
    title: {
        padding: theme.spacing.unit * 2
    }
});

export default withStyles(styles)(PostFeed);
