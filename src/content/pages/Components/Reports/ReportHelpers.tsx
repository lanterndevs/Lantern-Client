function getCount(data) {
  // `map` out the data by type
  const typeArr = data.map((object) => object.categories[0]);

  // Iterate over the type data. We pass in an initial
  // object to capture the counts, so we need to use
  // `Object.values` to grab the object values at the end
  // of the iteration
  return Object.values(
    typeArr.reduce((acc, id) => {
      // If the key doesn't exist in the accumulator object
      // create it and create a new array at its value
      acc[id] = acc[id] || [id, 0];

      // Increment the second index (the count)
      acc[id][1]++;

      // Return the object for the next iteration
      return acc;
    }, {})
  );
}

function getFrequent(transactions) {
  let itemsMap = {};
  let maxValue = 0;
  let maxCount = 0;

  // iterates through the list of transactions
  for (let transaction of transactions) {
    // counts how many time each transaction is recorded
    if (itemsMap[transaction.name] == null) {
      itemsMap[transaction.name] = 1;
    } else {
      itemsMap[transaction.name]++;
    }

    // determines the transactrion with the most occurences
    if (itemsMap[transaction.name] > maxCount) {
      maxValue = transaction.name;
      maxCount = itemsMap[transaction.name];
    }
  }

  // returns an array with the transaction with the most occurences
  return [maxValue, maxCount];
}

function filterForExpenses(transactions) {
  return transactions.filter((object) => object.amount > 0);
}

function filterForRevenue(transactions) {
  return transactions.filter((object) => object.amount < 0);
}

export { getCount, getFrequent, filterForExpenses, filterForRevenue };
