const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/',verify,(req,res) => {
    res.json({
        posts: {
            title: 'first post', 
            description: 'Random data that you should not be able to access unless you log in'
        }
    });
})

module.exports = router;
