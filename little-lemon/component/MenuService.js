import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('little_lemon.db');

const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS menu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, price REAL, image TEXT, category TEXT);',
      [],
      () => console.log('Table created successfully'),
      error => console.log('Error creating table: ' + error.message)
    );
  });
};

const fetchMenuFromAPI = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
    const json = await response.json();
    const items = json.menu;
    items.forEach(item => {
      console.log(item);
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO menu (name, description, price, image, category) VALUES (?, ?, ?, ?, ?);',
          [item.name, item.description, item.price, item.image, item.category],
          () => console.log('Data inserted successfully'),
          error => console.log('Error inserting data: ' + error.message)
        );
      });
    });
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

const getMenuFromDB = async (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM menu;',
      [],
      (_, { rows: { _array } }) => callback(_array),
      error => console.log('Error retrieving data from DB: ' + error.message)
    );
  });
};


const filterMenuByCategories = (categories, searchQuery, callback) => {
    const lowerCaseCategories = categories.map(category => category.toLowerCase());
    let query = 'SELECT * FROM menu WHERE 1=1';

    if (categories.length > 0) {
        query += ` AND category IN (${lowerCaseCategories.map(() => '?').join(', ')})`;
    }

    if (searchQuery) {
        query += ` AND LOWER(name) LIKE ?`;
    }

    const params = [...lowerCaseCategories, `%${searchQuery.toLowerCase()}%`];

    db.transaction(tx => {
        tx.executeSql(
            query,
            params,
            (_, { rows: { _array } }) => callback(_array),
            error => console.log('Error filtering data: ' + error.message)
        );
    });
};

const clearTable = (tableName, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM ${tableName};`,
            [],
            () => {
                console.log(`Table ${tableName} cleared successfully`);
                if (callback) {
                    callback();
                }
            },
            (error) => {
                console.log('Error clearing table: ' + error.message);
            }
        );
    });
};

export { initDB, fetchMenuFromAPI, getMenuFromDB, filterMenuByCategories, clearTable};
