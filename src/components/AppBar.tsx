import React, { useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import { navigate } from "@reach/router";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import List from "@material-ui/core/List";

interface MenuType {
	name: string;
	title: string;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	mainContent: {
		flexGrow: 1,
		padding: theme.spacing(3),
		marginTop: theme.spacing(12),
	},
	routerContainer: {
		width: "100%",
	},
}));

export default function CustomAppBar(
	props: InferProps<typeof CustomAppBar.propTypes>,
): JSX.Element {
	const { menu: menuList, onLogout } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	return (
		<>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => setOpen(!open)}
						edge="start"
						className={classes.menuButton}
					>
						{open ? <CloseIcon /> : <MenuIcon />}
					</IconButton>
					<Typography variant="h6" noWrap className={classes.title}>
						Dashboard
					</Typography>
					<Button color="inherit" onClick={onLogout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={() => setOpen(false)}>
						{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					{menuList?.top.map((menu: MenuType, index: number) => {
						const { name, title } = menu;
						return (
							<ListItem
								button
								key={name}
								onClick={() => navigate(`/${name}`)}
								selected={location.pathname === `/${name}`}
							>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={title} />
							</ListItem>
						);
					})}
				</List>
				<Divider />
				<List>
					{menuList.bottom.map((menu: MenuType, index: number) => {
						const { name, title } = menu;
						return (
							<ListItem
								button
								key={name}
								onClick={() => navigate(`/${name}`)}
								selected={location.pathname === `/${name}`}
							>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={title} />
							</ListItem>
						);
					})}
				</List>
			</Drawer>
		</>
	);
}

CustomAppBar.propTypes = {
	menu: PropTypes.shape({
		top: PropTypes.array.isRequired,
		bottom: PropTypes.array.isRequired,
	}).isRequired,
	onLogout: PropTypes.func.isRequired,
};