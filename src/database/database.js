import * as SQLite from 'expo-sqlite';

const dbName = 'quickbuy_v4.db';

export const initDb = async () => {
  try {
    const db = SQLite.openDatabaseSync(dbName);
    
    db.execSync(
      'CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY NOT NULL, title TEXT, price REAL, thumbnail TEXT, rating REAL);'
    );
    
    db.execSync(`
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
    
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
};

export const getFavorites = async () => {
  try {
    const db = SQLite.openDatabaseSync(dbName);
    return db.getAllSync('SELECT * FROM favorites');
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const toggleFavoriteItem = async (product, favorites) => {
  const productId = Number(product.id);
  const isFav = favorites.find(f => Number(f.id) === productId);
  try {
    const db = SQLite.openDatabaseSync(dbName);
    if (isFav) {
      db.runSync('DELETE FROM favorites WHERE id = ?', productId);
    } else {
      db.runSync(
        'INSERT OR REPLACE INTO favorites (id, title, price, thumbnail, rating) VALUES (?, ?, ?, ?, ?)',
        productId, product.title || '', product.price || 0, product.thumbnail || '', product.rating || 0
      );
    }
    return db.getAllSync('SELECT * FROM favorites');
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return favorites;
  }
};

// --- USERS ---

export const registerUser = async (name, email, password, ville, avenue, telephone) => {
  try {
    const db = SQLite.openDatabaseSync(dbName);
    const result = db.runSync(
      'INSERT INTO users (name, email, password, ville, avenue, telephone) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, password, ville, avenue, telephone]
    );
    return { success: true, insertId: result.lastInsertRowId };
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.message && error.message.includes('UNIQUE constraint failed: users.email')) {
      return { success: false, error: 'Cet email est déjà utilisé. Veuillez en choisir un autre.' };
    }
    return { success: false, error: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.' };
  }
};

export const loginUser = async (email, password) => {
  try {
    const db = SQLite.openDatabaseSync(dbName);
    const user = db.getFirstSync(
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
    const db = SQLite.openDatabaseSync(dbName);
    const user = db.getFirstSync('SELECT * FROM users WHERE id = ?', [id]);
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const updateUserAddress = async (id, ville, avenue, telephone) => {
  try {
    const db = SQLite.openDatabaseSync(dbName);
    db.runSync(
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
    const db = SQLite.openDatabaseSync(dbName);
    db.runSync(
      'UPDATE users SET email = ?, password = ? WHERE id = ?',
      [email, password, id]
    );
    return { success: true };
  } catch (error) {
    console.error('Error updating details:', error);
    return { success: false, error: error.message };
  }
};
