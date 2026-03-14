import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CampaignIcon from "@mui/icons-material/Campaign";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckIcon from "@mui/icons-material/Check";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { getUser, logout } from "../auth";
import api from "../api/axios";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const user = getUser();
  const userImage = user?.image
    ? `http://localhost:5000/uploads/users/${user.image}`
    : null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const pages = [
    { id: 1, name: "Announcements", to: "/announcements" },
    { id: 2, name: "Perdus/Trouvés", to: "/objects" },
    ...(user?.role === "admin" ? [{ id: 3, name: "Dashboard", to: "/dashboard" }] : []),
  ];

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get(`/notifications/${user.id}`);
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.put(`/notifications/read-all/${user.id}`);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop logo */}
          <CampaignIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ISMO
          </Typography>

          {/* Mobile hamburger */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              onClick={(e) => setAnchorElNav(e.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <Link
                  key={page.id}
                  to={page.to}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem onClick={() => setAnchorElNav(null)}>
                    <Typography>{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* Mobile logo */}
          <CampaignIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ISMO
          </Typography>

          {/* Desktop nav links */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                key={page.id}
                to={page.to}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Right side: notifications + avatar */}
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            {/* Notifications */}
            <IconButton onClick={(e) => setAnchorElNotif(e.currentTarget)}>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon style={{ color: "white" }} />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorElNotif}
              open={Boolean(anchorElNotif)}
              onClose={() => setAnchorElNotif(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{ style: { maxHeight: 400, width: 350 } }}
            >
              {notifications.length === 0 ? (
                <MenuItem>Aucune notification</MenuItem>
              ) : (
                <>
                  <MenuItem
                    onClick={handleMarkAllAsRead}
                    style={{ justifyContent: "flex-end", fontSize: "12px", color: "#1769aa" }}
                  >
                    Tout marquer comme lu
                  </MenuItem>
                  {notifications.map((n) => (
                    <MenuItem
                      key={n._id}
                      component={Link}
                      to={n.link || "/announcements"}
                      onClick={() => {
                        handleMarkAsRead(n._id);
                        setAnchorElNotif(null);
                      }}
                      style={{
                        backgroundColor: n.isRead ? "white" : "#e3f2fd",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        borderBottom: "1px solid #eee",
                        whiteSpace: "normal",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {n.message}
                        </Typography>
                        {!n.isRead && (
                          <IconButton
                            size="small"
                            title="Marquer comme lu"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsRead(n._id);
                            }}
                          >
                            <CheckIcon fontSize="small" />
                          </IconButton>
                        )}
                      </div>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(n.createdAt).toLocaleDateString()}
                      </Typography>
                    </MenuItem>
                  ))}
                </>
              )}
            </Menu>

            {/* User avatar */}
            <Tooltip title={user?.fullName || "User"}>
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0, ml: 1 }}>
                <Avatar alt={user?.fullName || "User"} src={userImage} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                <MenuItem onClick={() => setAnchorElUser(null)}>
                  <Typography>Profile</Typography>
                </MenuItem>
              </Link>
              <MenuItem onClick={() => { setAnchorElUser(null); logout(); }}>
                <Typography>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;