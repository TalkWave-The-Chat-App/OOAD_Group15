const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  getAllGroups,
  addGroup
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/allgroups/:id",getAllGroups);
router.post("/addgrp",addGroup);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

module.exports = router;
