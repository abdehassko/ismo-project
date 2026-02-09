const express = require("express");

const router = express.Router();

router.get("/announcements", (req, res) => {
  const announcements = [
    {
      id: 1,
      title: "Annonce 1",
      description: "Description 1",
      date: "2026-02-01",
      filiere: "Développement Digital",
    },
    {
      id: 2,
      title: "Annonce 2",
      description: "Description 2",
      date: "2026-02-02",
      filiere: "Data",
    },
  ];

  res.json(announcements);
});

module.exports = router;
