// Return transaction information organized by category:
// - Number of transactions in category
// - Total amount for whole category
function getCategoryInfo(transactions) {
  // `map` out the data by type
  const typeArr = transactions.map((object) => {
    return {
      category: object.categories[0],
      amount: object.amount
    }
  });

  // Iterate over the categories. We pass in an initial object to capture the counts, so we need to use
  // `Object.values` to grab the object values at the end of the iteration
  return Object.values(
    typeArr.reduce((acc, element) => {
      // If the key doesn't exist in the accumulator object create it and create a new array at its value
      acc[element.category] = acc[element.category] || [element.category, 0, 0];

      // Increment the count
      acc[element.category][1]++;

      // Add transaction amount
      acc[element.category][2] += element.amount;

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

export { getCategoryInfo, getFrequent, filterForExpenses, filterForRevenue };
