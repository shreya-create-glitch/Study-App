const bookModel = require('../models/book');


const addBook = async (req, res) => {
  const { title, author, description, category } = req.body;

  try {
    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required." });
    }

    const addedBook = await bookModel.create({
      title,
      author,
      description,
      category,
      createdBy: req.user._id, 
    });

    res.status(201).json(addedBook);
  } catch (error) {
    console.error("Add Book Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};


const getAllBook = async (req, res) => {
  try {
    const search = req.query.search;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const allbooks = await bookModel.find(query);
    res.json(allbooks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};


const getById = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("GetById error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};


const editBook = async (req, res) => {
  const { title, author, description, category } = req.body;

  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book Not Found" });
    }

    const updatedBook = await bookModel.findByIdAndUpdate(
      req.params.id,
      { title, author, description, category },
      { new: true }
    );

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const deleteBook = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    await bookModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deletion successful" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  addBook,
  getAllBook,
  getById,
  editBook,
  deleteBook,
};
