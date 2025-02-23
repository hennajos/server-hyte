import {listAllEntries, findEntryById, insertEntry, selectEntriesByUserId} from "../models/entry-model.js";

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getEntries = async (req, res) => {
  const entries = await selectEntriesByUserId(req.user.user_id);
  res.json(entries);
};

const getEntryById = async (req, res) => {
  // to do add catch error
  try {
    const entry = await findEntryById(req.params.id);
    if (entry) {
      res.json(entry);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({message: "Failed to fetch entry", error: error.message})
  }
};

const postEntry = async (req, res) => {
  const newEntry = req.body;
  newEntry.user_id = req.user.user_id;
  insertEntry(newEntry);
  res.status(201).json({message: "Entry added"});
};

const putEntry = (req, res) => {
  // placeholder for future implementation
  res.sendStatus(200);
};

const deleteEntry = (req, res) => {
  // placeholder for future implementation
  res.sendStatus(200);
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
