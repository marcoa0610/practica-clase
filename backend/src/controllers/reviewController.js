

import reviewModel from "../models/Reviews.js";
   
const reviewController = {};
//SELECT 
reviewController.getReview = async (req, res) => {
    const reviews = await reviewModel.find().populate('idClient')
    res.json(reviews);
};


//INSERT
reviewController.createReview = async (req, res) => {
    const {comment, rating, idClient} = req.body;
    const newRating = new reviewModel({comment, rating, idClient})
    await newRating.save();
    res.json({message: "Review Added"})
}

//DELETE
reviewController.deleteReview = async(req, res) => {
    const deleteReview = await reviewModel.findByIdAndDelete (req.params.id);
    res.json({message: "Review Deleted"})
}

//UPDATE
reviewController.updateReview = async(req, res) => {
    const {comment, rating, idClient} = req.body;
    const updateReview = await reviewModel.findByIDAndUpdate(req.params.id,
        {comment, rating, idClient}, {new: true}
    );

    res.json ({message: "Review Updated"})

}

export default reviewController;
