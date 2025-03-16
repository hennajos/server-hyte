import promisePool from '../utils/database.js';

/**
 * User registration
 * @param {*} user
 * @returns
 */
const insertEntry = async (entry) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, meal, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [entry.user_id, entry.entry_date, entry.mood, entry.weight, entry.sleep_hours, entry.meal, entry.notes],
    );
    console.log('insertEntry', result);
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('Database error.');
  }
};

const selectEntriesByUserId = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('Database error.');
  }
};

export {insertEntry, selectEntriesByUserId};
