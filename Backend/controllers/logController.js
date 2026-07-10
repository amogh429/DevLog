import LogEntry from "../models/LogEntry.js";
import User from  "../models/User.js";
import getStartOfDay, { gerStartDay } from "../utils/dateUtils.js";

export default createLog = async(req,res) => {
    try {
        const { content,tags = [],date } = req.body;

        if (!content) {
            return res.status(400).json({
                message: "Content is required",
            });
        }

        const normalizeTags = tags.map((tag) => tag.trim().toLowerCase()).filter((tag) => tag.length > 0);

        const logDate = getStartOfDay(date ? new Date(date) : new Date());

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({ message: "User not found"});
        }

        const today = getStartOfDay(new Date());

        if(!user.lastLogDate){
            user.streak = 1;
        }else{
            const lastLogDay = getStartOfDay(user.lastLogDate);

            const diffInDays =
                (today.getTime() - lastLogDay.getTime()) /
                (1000 * 60 * 24);

            if(lastLogDay.getTime() === today.getTime()){
                // Already logged today -> streak unchanged
            }else if(diffInDays === 1){
                //Consecutive streak
                user.streak += 1;
            }else{
                user.streak = 1;
            }
        }
        user.lastLogDate = today;

    // Create log
    const log = await LogEntry.create({
      user: req.user.id,
      content,
      tags: normalizedTags,
      date: logDate,
    });

    await user.save();

    res.status(201).json(log);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

export default getLogs = async(req,res) => {
    try {
        const query = { user: req.user.id };

        if(req.query.tag){
            query.tags = req.query.tag;
        }

        if(req.query.date){
            query.date = getStartOfDay(new Date(req.query.date));
        }

        const logs = (await LogEntry.find(query)).toSorted({date:-1});

        res.json(logs);
    }catch(error){
        res.status(500).json({ message: error.message });
    }

};

export const getLogById = async (req, res) => {
  try {
    const log = await LogEntry.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!log) {
      return res.status(404).json({
        message: "Log not found",
      });
    }

    res.json(log);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const updateLog = async (req, res) => {
  try {
    const updateData = {};

    if (req.body.content !== undefined) {
      updateData.content = req.body.content;
    }

    if (req.body.tags !== undefined) {
      updateData.tags = req.body.tags
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0);
    }

    const updatedLog = await LogEntry.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      updateData,
      {
        new: true,
      }
    );

    if (!updatedLog) {
      return res.status(404).json({
        message: "Log not found",
      });
    }

    res.json(updatedLog);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteLog = async (req, res) => {
  try {
    const log = await LogEntry.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!log) {
      return res.status(404).json({
        message: "Log not found",
      });
    }

    await log.deleteOne();

    res.json({
      message: "Log deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
