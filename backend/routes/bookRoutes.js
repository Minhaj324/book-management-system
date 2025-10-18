import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

router.post("/add" , async(req,res)=>{
try{ 
const {title,author,genre,year} = req.body;
const newBook = new Book ({title,author,genre,year});
await newBook.save();
res.status(201).json({message:"book added sucessfully" , book:newBook});
}
catch(error){
    console.error("error adding book" , error);
    res.status(500).json({message:"server error"});

}
});

router.get("/" ,async(req,res)=>{
    try{
        const books  = await Book.find();
        res.status(200).json(books);


    }
    catch(error){
        res.status(500).json({message:"server error"});

    }

});



router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Update book by id
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, year, category } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, year, category },
      { new: true, runValidators: true }
    );

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ book: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
