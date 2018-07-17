const express = require('express');
const router = express.Router();

const Menus = require('../models/menu');

//GET Request for Menu
router.get('/menu', (req, res, next) => {
    Menus.find().then((mymenus) => {
        res.status(200).json({
            message: 'News Fetched',
            menus: mymenus
        })

    });
});

///POST request for Menu
router.post('/menu', function (req, res, next) {
console.log("from post in backend");
    var menuItem = new Menus({
       // date: Date.now(),
        menuDayName: req.body.menuDayName,
      //  created_by_id: "1122",
       // created_by_userName: "peshal",
       // created_on: Date.now(),
       // updated_on: null,
        items: req.body.items
    });
    console.log(menuItem)
    menuItem.save().then(createdNews => {
        res.status(201).json({
        message: "News added Successfully",
        newsId : createdNews._id
        })
    })
})

router.delete('/menu/:menuId',(req,res,next)=>{
    Menus.deleteOne({ _id: req.params.menuId }).then(result => console.log(result));
    res.status(200).json({ message: 'menus Deleted' });
})

module.exports = router;