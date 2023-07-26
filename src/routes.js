const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
} = require('./handler');

const routes = [
  {
    // Kriteria 3 : API dapat menyimpan buku
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    // Kriteria 4 : API dapat menampilkan seluruh buku
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    // Kriteria 5 : API dapat menampilkan
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },
  {
    // Kriteria 6 : API dapat mengubah data buku
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookHandler,
  },
  {
    // Kriteria 7 : API dapat menghapus buku
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
  },
];

module.exports = routes;
