class InMemoryDB {
  constructor() {
    // Stores committed key-value pairs
    this.committedPairs = {};

    // Stores uncommitted key-value pairs during an active transaction
    this.transactionPairs = null;

    // Indicates if a transaction is currently active
    this.transactionActive = false;
  }

  begin_transaction() {
    // Throw error if a transaction is already active
    if (this.transactionActive) {
      throw new Error("A transaction is already active. Two transactions cannot exist at the same time.");
    }

    // Start a new transaction if one is not already active
    this.transactionPairs = {};
    this.transactionActive = true;
  }

  put(key, value) {
    // Make sure passed-in key is a string and passed-in value is an integer
    if (typeof key !== "string") {
      throw new Error(`Key must be of type string. Received: ${typeof key}`);
    }
    if (typeof value !== "number" || !Number.isInteger(value)) {
      throw new Error(`Value must be of type integer. Received: ${typeof value}`);
    }

    // Throw error if no transaction is currently active
    if (!this.transactionActive) {
      throw new Error("No transaction is currently active. You must start a transaction in order to use put().");
    }

    // Add passed-in key-value pair to the uncommitted transaction pairs
    this.transactionPairs[key] = value;
  }

  get(key) {
    // Make sure passed-in key is a string
    if (typeof key !== "string") {
      throw new Error(`Key must be of type string. Received: ${typeof key}`);
    }

    // Return the committed value for the passed-in key, or null if the key doesn't exist
    if (key in this.committedPairs) {
      return this.committedPairs[key];
    }
    return null;
  }

  commit() {
    // Throw error if no transaction is currently active
    if (!this.transactionActive) {
      throw new Error("No transaction is currently active. You must start a transaction in order to use commit().");
    }

    // Add uncommitted transaction pairs to the list of committed pairs (this essentially commits the transaction)
    for (const key in this.transactionPairs) {
      this.committedPairs[key] = this.transactionPairs[key];
    }

    // Get rid of the now-committed transaction pairs and end the current transaction
    this.transactionPairs = null;
    this.transactionActive = false;
  }

  rollback() {
    // Throw error if no transaction is currently active
    if (!this.transactionActive) {
      throw new Error("No transaction is currently active. You must start a transaction in order to use rollback().");
    }

    // Get rid of uncommitted transaction pairs and end the current transaction
    this.transactionPairs = null;
    this.transactionActive = false;
  }
}


// Running the code (change these lines to test out InMemoryDB, current implementation is from Fig 2):
const db = new InMemoryDB();

// Should return null, because A doesn’t exist in the DB yet
console.log(db.get("A"));

// Should throw an error because a transaction is not in progress
try {
  db.put("A", 5);
}
catch (e) {
  console.log("Error:", e.message);
}

// Starts a new transaction
db.begin_transaction();

// Sets value of A to 5, but its not committed yet
db.put("A", 5);

// Should return null, because updates to A are not committed yet
console.log(db.get("A"));

// Update A’s value to 6 within the transaction
db.put("A", 6);

// Commits the open transaction
db.commit();

// Should return 6, that was the last value of A to be committed
console.log(db.get("A"));

// Throws an error, because there is no open transaction
try {
  db.commit();
}
catch (e) {
  console.log("Error:", e.message);
}

// Throws an error because there is no ongoing transaction
try {
  db.rollback();
}
catch (e) {
  console.log("Error:", e.message);
}

// Should return null because B does not exist in the database
console.log(db.get("B"));

// Starts a new transaction
db.begin_transaction();

// Set key B’s value to 10 within the transaction
db.put("B", 10);

// Rollback the transaction - revert any changes made to B
db.rollback();

// Should return null because changes to B were rolled back
console.log(db.get("B"));
