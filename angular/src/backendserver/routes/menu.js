const express = require('express');
const router = express.Router();

const Menus = require('../models/menu');

//GET Request for Menu
router.get('/menu', (req, res, next) => {
    console.log(Date.now())
    
    Menus.find().then((mymenus) => {
        res.status(200).json({
            message: 'Menus Fetched',
            menus: mymenus
        })

    });
});

///POST request for Menu
router.post('/menu', function (req, res, next) {
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
        message: "Menu added Successfully",
        newsId : createdNews._id
        })
    })
})

router.delete('/menu/:menuId',(req,res,next)=>{
    Menus.deleteOne({ _id: req.params.menuId }).then(
        result => {
            if(result.n > 0 ) {
             res.status(200).json({ message: 'menus Deleted' });
            } else {
             res.status(500).json({ message: 'Delete Error' });
            }
        }
    );
})

module.exports = router;