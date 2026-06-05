const bookModel = require('../models/book');
const redisClient = require('../config/redis');

// Helper Function
const clearBooksCache = async () => {
  try {
    if (redisClient.isOpen) {
      const keys = await redisClient.keys("books:*");

      if (keys.length > 0) {
        await redisClient.del(keys);
        console.log("Books cache cleared");
      }
    }
  } catch (error) {
    console.error("Cache clear error:", error);
  }
};

// ADD BOOK
const addBook = async (req, res) => {
  const { title, author, description, category } = req.body;

  try {
    if (!title || !author) {
      return res.status(400).json({
        error: "Title and author are required."
      });
    }

    const addedBook = await bookModel.create({
      title,
      author,
      description,
      category,
      createdBy: req.user._id,
    });

    // Clear Cache
    await clearBooksCache();

    res.status(201).json(addedBook);

  } catch (error) {
    console.error("Add Book Error:", error);
    res.status(500).json({
      error: "Server Error"
    });
  }
};

// GET ALL BOOKS

  // GET ALL BOOKS
const getAllBook = async (req, res) => {
  try {
    const search = req.query.search || "";

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const cacheKey = `books:${search.toLowerCase().trim()}:${page}:${limit}`;

    // Cache Check
    if (redisClient.isOpen) {
      const cachedBooks = await redisClient.get(cacheKey);

      if (cachedBooks) {
        console.log("Books Cache HIT");
        return res.json(JSON.parse(cachedBooks));
      }
    }

    console.log("Books Cache MISS");

    let query = {};

    if (search) {
      query = {
        $or: [
          {
            title: {
              $regex: search,
              $options: "i",
            },
          },
          {
            author: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      };
    }

    const totalBooks = await bookModel.countDocuments(query);

    const books = await bookModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const response = {
      books,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
      hasNextPage: page < Math.ceil(totalBooks / limit),
      hasPrevPage: page > 1,
    };

    // Save Cache
    if (redisClient.isOpen) {
      await redisClient.set(
        cacheKey,
        JSON.stringify(response),
        {
          EX: 60 * 10,
        }
      );
    }

    res.json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch books",
    });
  }
};    
    

// GET BOOK BY ID
const getById = async (req, res) => {
  try {
    const cacheKey = `book:${req.params.id}`;

    // Cache Check
    if (redisClient.isOpen) {
      const cachedBook = await redisClient.get(cacheKey);

      if (cachedBook) {
        console.log("Book By Id Cache HIT");
        return res.json(JSON.parse(cachedBook));
      }
    }

    const book = await bookModel.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        error: "Book not found"
      });
    }

    // Save Cache
    if (redisClient.isOpen) {
      await redisClient.set(
        cacheKey,
        JSON.stringify(book),
        {
          EX: 60 * 10,
        }
      );
    }

    res.json(book);

  } catch (error) {
    console.error("GetById error:", error);
    res.status(500).json({
      error: "Server Error"
    });
  }
};

// EDIT BOOK
const editBook = async (req, res) => {
  const { title, author, description, category } = req.body;

  try {
    const book = await bookModel.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        error: "Book Not Found"
      });
    }

    const updatedBook = await bookModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        description,
        category
      },
      {
        new: true
      }
    );

    // Clear List Cache
    await clearBooksCache();

    // Remove Single Book Cache
    if (redisClient.isOpen) {
      await redisClient.del(`book:${req.params.id}`);
    }

    res.status(200).json(updatedBook);

  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

// DELETE BOOK
const deleteBook = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        error: "Book not found"
      });
    }

    await bookModel.findByIdAndDelete(req.params.id);

    // Clear List Cache
    await clearBooksCache();

    // Remove Single Book Cache
    if (redisClient.isOpen) {
      await redisClient.del(`book:${req.params.id}`);
    }

    res.status(200).json({
      message: "Deletion successful"
    });

  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      error: "Server Error"
    });
  }
};

module.exports = {
  addBook,
  getAllBook,
  getById,
  editBook,
  deleteBook,
};