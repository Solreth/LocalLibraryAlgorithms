const findAccountById = (accounts, id) =>
  accounts.find((account) => account.id === id);

const sortAccountsByLastName = (accounts) =>
  accounts.sort((a, b) =>
    a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1
  );

const getTotalNumberOfBorrows = (account, books) => {
  let total = 0;
  books.forEach((book) => {
    const { borrows } = book;
    borrows.forEach((borrow) => {
      if (borrow.id === account.id) {
        total++;
      }
    });
  });
  return total;
};
// future note - I could approach this differently:
// - filter account and books ids (with some destructuring) and return them to an array and count the array.length.

function getBooksPossessedByAccount(account, books, authors) {
  let array = [];
  books.forEach((book) => {
    const { borrows } = book;
    if (borrows[0].returned === false && account.id === borrows[0].id) {
      book.author = authors.find((author) => author.id === book.authorId);
      // Good practice for making keys with specific demands ^
      array.push(book);
    }
  });
  return array;
}

/*return an array of all book objects currently checked out by this account in this shape with this information

  [
    {
      id: "5f447132320b4bc16f950076",
      title: "est voluptate nisi",
      genre: "Classics",
      authorId: 12,
      author: {
        id: 12,
        name: {
          first: "Chrystal",
          last: "Lester",
        },
      },
      borrows: [
        {
          id: "5f446f2e6059326d9feb9a68",
          returned: false,
        },
        ...
      ],
    },
  ]

*/

/* Three parameters, in the following order:

- An account object.
- An array of all book objects.
- An array of all author objects.

It returns an array of book objects, including author information, -that represents all books _currently checked out_ by the given account.-
 _Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it.
} */

// return flag = false

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
