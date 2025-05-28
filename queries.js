
 
 /* Find all books: */
     db.books.find()
 
 /* Find books by a specific author:*/
    db.books.find({ author: "George Orwell" })
 
 /* Find books published after 1950:*/
     db.books.find({ published_year: { $gt: 1950 } })
 
 /* 4. Find books in a specific genre:*/
     db.books.find({ genre: "Fiction" })
 
 /* 5. Find in-stock books:*/
     db.books.find({ in_stock: true })

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
    