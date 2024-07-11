/* eslint-disable no-shadow */
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'UserDatabase',
    location: 'default',
  },
  () => {},
  error => {
    console.error(error);
  },
);

// Create User Table
const createTable = () => {
  db.transaction(txn => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS Users (uid TEXT, name TEXT, email TEXT,status BOOLEAN DEFAULT FALSE,islogin BOOLEAN DEFAULT FALSE)',
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.error('Error creating table: ', error);
      },
    );
  });
};

// Insert User
const insertUser = (name, email, uid) => {
  db.transaction(txn => {
    txn.executeSql(
      'INSERT INTO Users (name, email,uid) VALUES (?, ?,?)',
      [name, email, uid],
      () => {
        console.log('User inserted successfully');
      },
      error => {
        console.error('Error inserting user: ', error);
      },
    );
  });
};

// Fetch Users
const fetchUsers = callback => {
  db.transaction(txn => {
    txn.executeSql(
      'SELECT * FROM Users',
      [],
      (txn, res) => {
        let users = [];
        for (let i = 0; i < res.rows.length; i++) {
          users.push(res.rows.item(i));
        }
        callback(users);
      },
      error => {
        console.error('Error fetching users: ', error);
      },
    );
  });
};

// Update User Status
const updateUserStatus = (uid, newStatus, callback) => {
  console.log(uid, newStatus);
  db.transaction(txn => {
    txn.executeSql(
      'UPDATE Users SET status = ? WHERE uid = ?',
      [newStatus, uid],
      () => {
        callback(); // Call the provided callback function on success
      },
      error => {
        console.error('Error updating user status: ', error);
      },
    );
  });
};

//update loginstatus
const updateloginStatus = (uid, newStatus, callback) => {
  console.log(uid, newStatus);
  db.transaction(txn => {
    txn.executeSql(
      'UPDATE Users SET islogin = ? WHERE uid = ?',
      [newStatus, uid],
      () => {
        callback(); // Call the provided callback function on success
      },
      error => {
        console.error('Error updating user status: ', error);
      },
    );
  });
};
// Fetch User by UID
const findUserByUid = (uid, callback) => {
  db.transaction(txn => {
    txn.executeSql(
      'SELECT * FROM Users WHERE uid = ?',
      [uid],
      (txn, res) => {
        let user = null;
        if (res.rows.length > 0) {
          user = res.rows.item(0); // Get the first user if any
        }
        callback(user);
      },
      error => {
        console.error('Error fetching user by uid: ', error);
      },
    );
  });
};

const setLoginUserDetails = (uid, name, email, callback) => {
  db.transaction(txn => {
    txn.executeSql(
      'UPDATE Users SET name = ?, email = ? WHERE uid = ? ',
      [name, email, uid],
      () => {
        console.log('User details updated successfully');
        callback();
      },
      error => {
        console.error('Error updating user details: ', error);
      },
    );
  });
};

const deleteUserByUid = (uid, callback) => {
  db.transaction(txn => {
    txn.executeSql(
      'DELETE FROM Users WHERE uid = ?',
      [uid],
      () => {
        console.log('User deleted successfully');
        callback();
      },
      error => {
        console.error('Error deleting user: ', error);
      },
    );
  });
};

const fetchLoggedInUser = callback => {
  db.transaction(txn => {
    txn.executeSql(
      'SELECT * FROM Users WHERE islogin = ?',
      [true],
      (txn, res) => {
        let user = null;
        if (res.rows.length > 0) {
          user = res.rows.item(0); // Get the first user if any
        }
        callback(user);
      },
      error => {
        console.error('Error fetching logged-in user: ', error);
      },
    );
  });
};

export {
  fetchUsers,
  insertUser,
  createTable,
  updateUserStatus,
  findUserByUid,
  setLoginUserDetails,
  deleteUserByUid,
  updateloginStatus,
  fetchLoggedInUser,
};
