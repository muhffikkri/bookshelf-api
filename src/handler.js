const {
  nanoid,
} = require('nanoid');
const books = require('./books');

// Kriteria 3 : API dapat menyimpan buku
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Validasi jika client tidak melampirkan properti "name"
  if (!name) {
    return h
        .response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        })
        .code(400);
  }

  // Validasi jika nilai "readPage" lebih besar dari nilai "pageCount"
  if (readPage > pageCount) {
    return h
        .response({
          status: 'fail',
          // eslint-disable-next-line max-len
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
  }

  // eslint-disable-next-line max-len
  // Jika seluruh syarat dipenuhi maka tambahkan buku dengan struktur json yang ditentukan
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      })
      .code(201);
};

// Kriteria 4 : API dapat menampilkan seluruh buku
const getAllBooksHandler = (request, h) => {
  // Mendapatkan nilai query parameters dari request URL
  const {name, reading, finished} = request.query;

  // Filter buku berdasarkan query parameters
  let filteredBooks = books;

  if (name) {
    const keyword = name.toLowerCase();
    filteredBooks = filteredBooks
        .filter((book) =>
          book.name.toLowerCase().includes(keyword));
  }

  if (reading !== undefined) {
    const isReading = reading === '1';
    filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
  }

  if (finished !== undefined) {
    const isFinished = finished === '1';
    filteredBooks = filteredBooks
        .filter((book) =>
          book.finished === isFinished);
  }

  const allBooks = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return h
      .response({
        status: 'success',
        data: {
          books: allBooks,
        },
      })
      .code(200);
};

// Kriteria 5 : API dapat menampilkan
const getBookByIdHandler = (request, h) => {
  // Mengambil id buku dari request parameter
  const {
    bookId,
  } = request.params;

  // Mencari buku dengan id buku
  const book = books.find((book) => book.id === bookId);

  if (!book) {
    return h
        .response({
          status: 'fail',
          message: 'Buku tidak ditemukan',
        })
        .code(404);
  }

  return h
      .response({
        status: 'success',
        data: {
          book,
        },
      })
      .code(200);
};

// Kriteria 6 : API dapat mengubah data buku
const updateBookHandler = (request, h) => {
  const {
    bookId,
  } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Cari index buku berdasarkan bookId
  const bookIndex = books.findIndex((book) => book.id === bookId);

  // Validasi jika buku dengan bookId tidak ditemukan
  if (bookIndex === -1) {
    return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan',
        })
        .code(404);
  }

  // Validasi jika client tidak melampirkan properti "name"
  if (!name) {
    return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        .code(400);
  }

  // Validasi jika nilai "readPage" lebih besar dari nilai "pageCount"
  if (readPage > pageCount) {
    return h
        .response({
          status: 'fail',
          // eslint-disable-next-line max-len
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
  }

  const updatedAt = new Date().toISOString();

  // Update data buku dengan data baru
  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };

  return h
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      .code(200);
};

// Kriteria 7 : API dapat menghapus buku
const deleteBookHandler = (request, h) => {
  const {
    bookId,
  } = request.params;

  // Cari index buku berdasarkan bookId
  const bookIndex = books
      .findIndex((book) =>
        book.id === bookId);

  // Validasi jika buku dengan bookId tidak ditemukan
  if (bookIndex === -1) {
    return h
        .response({
          status: 'fail',
          message: 'Buku gagal dihapus. Id tidak ditemukan',
        })
        .code(404);
  }

  // Hapus buku dari array books berdasarkan indeks yang ditemukan
  books.splice(bookIndex, 1);

  return h
      .response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      })
      .code(200);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
};
