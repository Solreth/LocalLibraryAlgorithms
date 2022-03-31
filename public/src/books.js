const findAuthorById = (authors, id) =>
  authors.find((current) => current.id === id);

const findBookById = (books, id) => books.find((current) => current.id === id);

const partitionBooksByBorrowedStatus = (books) => {
  return books.reduce(
    (sum, book) => {
      const { borrows } = book;
      if (borrows[0].returned) {
        sum[1].push(book);
        return sum;
      } else {
        sum[0].push(book);
        return sum;
      }
    },
    [[], []]
  );
};

const getBorrowersForBook = (book, accounts) => {
  const { borrows } = book;

  const array = [];
  accounts.forEach((currentAccount) => {
    borrows.forEach((currentBorrows) => {
      if (currentAccount.id === currentBorrows.id) {
        array.push(currentAccount);
      }
    });
  });
  array.forEach((currentArray) => {
    borrows.forEach((currentBorrows) => {
      if (currentArray.id === currentBorrows.id) {
        currentArray.returned = currentBorrows.returned;
      }
    });
  });
  return array.slice(0, 10);
};

/* 
Alternative more concise execution of the above concept for future reference: ^

function getBorrowersForBook(book, accounts) {
  let borrowersBook = book.borrows.map((borrow) => {
    let account = accounts.find((account) => account.id === borrow.id);
    return { ...borrow, ...account };
  });
  return borrowersBook.slice(0, 10);
} 
*/

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
