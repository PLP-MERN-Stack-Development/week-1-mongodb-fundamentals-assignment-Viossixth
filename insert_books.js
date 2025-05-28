// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb+srv://chrismaluleke6:ZVI11ZEe2utzN0T5@cluster-veossixth.ew7ir89.mongodb.net/';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Sample book data
const books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
insertBooks().catch(console.error);


 /* Example MongoDB queries you can try after running this script:*/

 /*1. Find all books:*/
     db.books.find()
 
 /* 2. Find books by a specific author:*/
    db.books.find({ author: "George Orwell" })
 
 /* 3. Find books published after 1950:*/
     db.books.find({ published_year: { $gt: 1950 } })
 *
 /* 4. Find books in a specific genre:*/
    db.books.find({ genre: "Fiction" })
 
 /* 5. Find in-stock books:*/
 *    db.books.find({ in_stock: true })
 
 /*  6. Update the price of a book:*/
     db.books.update({title:"To Kill A Mockingbird", price:14.99})

/*  7. Delete a book by its price:*/
     db.books.deleteOne({title:"To Kill A Mockingbird"})

  /*Task 3*/
     /*Write a query to find books that are both in stock and published after 2010*/
     db.books.find({in_stock:true , published_year:{$gt:2010}})

     /*Use projection to return only the title, author, and price fields in your queries*/
     db.books.find({$title,$author, $price})

     /*Implement sorting to display books by price (both ascending and descending)*/
     db.books.find().sort({price:-1})

     /*Use the limit and skip methods to implement pagination (5 books per page)*/
     db.books.find().limit(5).skip(0)
     db.books.find().limit(5).skip(5)

      /*Task 4: Aggregation Pipeline*/
     /*Create an aggregation pipeline to calculate the average price of books by genre*/
     db.books.aggregate([{$group:{ _id: "$genre", averagePrice: { $avg: "$price" }}}])

     /*Create an aggregation pipeline to find the author with the most books in the collection*/
     db.books.aggregate([{$group:{_id:author,totalbooks:{$sum:1}}}])

     /*Implement a pipeline that groups books by publication decade and counts them*/
     db.books.aggregate([{$project:{decade: {$concat:[{ $toString: { $multiply: [ { $floor: { $divide: ["$year", 10] } }, 10 ] } },"s"]}}},{$group: {_id: "$decade",totalBooks: { $sum: 1 }}}])

     /*Task 5: Indexing*/
     /*Create an index on the title field for faster searches*/
    db.books.createIndex({title:1})

     /*Create a compound index on author and published_year*/
     db.books.createIndex({author:1,published_year:1})

     /*Use the explain() method to demonstrate the performance improvement with your indexes*/
    