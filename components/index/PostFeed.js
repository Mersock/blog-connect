import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Post from './Post';
import NewPost from "./NewPost";
import {addPost} from "../../lib/api";

class PostFeed extends React.Component {
    state = {
        posts: [],
        text: "",
        image: "",
        isAddingPost: false
    };

    componentDidMount() {
        this.postData = new FormData();
    }

    handleChange = event => {
        let inputValue;

        if (event.target.name == "image") {
            inputValue = event.target.files[0];
        } else {
            inputValue = event.target.value;
        }
        this.postData.set(event.target.name, inputValue);
        this.setState({[event.target.name]: inputValue});
    };

    handleAddPost = () => {
        const {auth} = this.props;

        this.setState({isAddingPost: true});
        addPost(auth.user._id, this.postData)
            .then(postData => {
                const updatedPosts = [postData, ...this.state.posts];
                this.setState({
                    posts: updatedPosts,
                    isAddingPost: false,
                    text: "",
                    image: ""
                });
                this.postData.delete('image')
            })
            .catch(err => {
                console.log(err);
                this.setState({isAddingPost: false});
            });
    };

    render() {
        const {classes, auth} = this.props;
        const {text, image, isAddingPost} = this.state;

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
                        isAddingPost={isAddingPost}
                        handleChange={this.handleChange}
                        handleAddPost={this.handleAddPost}
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
