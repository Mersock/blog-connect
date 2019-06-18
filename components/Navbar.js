import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShareOutlined from "@material-ui/icons/ShareOutlined";
import withStyles from "@material-ui/core/styles/withStyles";

const Navbar = ({classes,router}) => {
    return (
        <AppBar className={classes.appBar} position={router.pathname === "/" ? "fixed" : "static"}>
            <Toolbar>
                {/*Main title / Home Button*/}
                <ShareOutlined className={classes.icon}/>
                <Typography variant="h3" component="h1" className={classes.toolbarTitle}>
                    Nextconnect
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

const styles = theme => ({
    appBar: {
        // z-index 1 higher than the fixed drawer in home page to clip it under the navigation
        zIndex: theme.zIndex.drawer + 1
    },
    toolbarTitle: {
        flex: 1
    },
    icon: {
        marginRight: theme.spacing.unit
    }
});

export default withStyles(styles)(Navbar);
