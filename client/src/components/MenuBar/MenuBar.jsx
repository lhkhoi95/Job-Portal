import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";

function MenuBar(props) {
	const { window } = props;

	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const linkItems = [
		{ title: "Find Candidates", url: "#candidates" },
		{ title: "Browse Jobs", url: "#jobs" },
		{ title: "Post Job", url: "#post" },
	];

	const container =
		window !== undefined ? () => window().document.body : undefined;

	const drawer = (
		<Box onClick={handleDrawerToggle}>
			<Typography variant="h6" sx={{ my: 2, paddingLeft: 2 }}>
				Job Portal
			</Typography>
			<Divider />
			<List>
				{linkItems.map((item, idx) => (
					<ListItem key={idx} disablePadding>
						<ListItemButton>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</ListItem>
				))}
				<ListItem disablePadding>
					<ListItemButton>Login</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton>Create Account</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);

	return (
		<>
			<AppBar
				component="nav"
				color="transparent"
				elevation={0}
				position="sticky"
				sx={{
					backdropFilter: "blur(50px)",
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>

					<Typography
						variant="h6"
						component="div"
						sx={{
							flexGrow: 1,
						}}
					>
						Job Portal
					</Typography>
					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						{linkItems.map((item, idx) => (
							<Button key={idx} color="inherit">
								{item.title}
							</Button>
						))}
						<Button
							color="inherit"
							disableElevation
							href="/account/login"
						>
							Login
						</Button>
						<Button
							color="primary"
							variant="contained"
							disableElevation
							href="/account/signup"
						>
							Create Account
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: "100vw",
						},
						backdropFilter: "blur(50px)",
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</>
	);
}

export default MenuBar;
