const getTotalBooksCount = (books) => books.length;

const getTotalAccountsCount = (accounts) => accounts.length;

const getBooksBorrowedCount = (books) => {
  let total = 0;
  for (let current in books) {
    const { borrows } = books[current];
    if (!borrows[0].returned) {
      total++;
    }
  }
  return total;
};

const getMostCommonGenres = (books) => {
  let holderArray = [];
  // [{ name: romance, count: 4}
  // { name: sci-fi, count: 1}]
  books.filter((book) => holderArray.push(book.genre));

  const _NameAndCount = holderArray.reduce((object, current) => {
    if (object[current]) {
      object[current] += 1;
    } else {
      object[current] = 1;
    }
    return object;
  }, {});

  let resultArray = [];

  for (const [genre, sum] of Object.entries(_NameAndCount)) {
    resultArray.push({ name: genre, count: sum });
  }

  return resultArray.sort((a, b) => b.count - a.count).slice(0, 5);
};

const getMostPopularBooks = (books) => {
  return books
    .map((book) => {
      return { name: book.title, count: book.borrows.length };
    })
    .sort((a, b) => b.count - a.count)
    .splice(0, 5);
};

function _totalBorrowsPerAuthor(books, authors) {
  let total = 0;
  for (let currentBook of books) {
    if (currentBook.authorId === authors.id) {
      total += currentBook.borrows.length;
    }
  }
  return total;
}

function getMostPopularAuthors(books, authors) {
  return authors
    .map((current) => {
      return {
        name: `${current.name.first} ${current.name.last}`,
        count: _totalBorrowsPerAuthor(books, current),
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
