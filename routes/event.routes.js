import express from "express";
import Event from "../models/event.models.js";
import authMiddleware from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { name, date, location, description } = req.body;

  try {
    const event = new Event({
      name,
      date,
      location,
      description,
      organizerId: req.user.id,
    });

    await event.save();
    res.status(201).json(event);
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("organizerId", "name email");
    res.json(events);
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:id/rsvp", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event){
      return res.status(404).json({ message: "Event not found" });
    }

    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
      await event.save();
    }

    res.json({ message: "RSVP successful" });
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
