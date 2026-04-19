import * as SQLite from 'expo-sqlite';

const dbName = 'boutique.db';

export const initDB = async () => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);

    // Create users table with all the new address columns
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        ville TEXT,
        avenue TEXT,
        telephone TEXT
      );
    `);
    console.log('Database initialized successfully with new columns');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const registerUser = async (name, email, password, ville, avenue, telephone) => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const result = await db.runAsync(
      'INSERT INTO users (name, email, password, ville, avenue, telephone) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, password, ville, avenue, telephone]
    );
    return { success: true, insertId: result.lastInsertRowId };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const user = await db.getFirstAsync(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
    if (user) {
      return { success: true, user };
    } else {
      return { success: false, error: 'Invalid email or password' };
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error: error.message };
  }
};

export const getUserById = async (id) => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    const user = await db.getFirstAsync('SELECT * FROM users WHERE id = ?', [id]);
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const updateUserAddress = async (id, ville, avenue, telephone) => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    await db.runAsync(
      'UPDATE users SET ville = ?, avenue = ?, telephone = ? WHERE id = ?',
      [ville, avenue, telephone, id]
    );
    return { success: true };
  } catch (error) {
    console.error('Error updating address:', error);
    return { success: false, error: error.message };
  }
};

export const updateUserDetails = async (id, email, password) => {
  try {
    const db = await SQLite.openDatabaseAsync(dbName);
    // Usually one would confirm the old password first, but for now we just update
    await db.runAsync(
      'UPDATE users SET email = ?, password = ? WHERE id = ?',
      [email, password, id]
    );
    return { success: true };
  } catch (error) {
    console.error('Error updating details:', error);
    return { success: false, error: error.message };
  }
};
