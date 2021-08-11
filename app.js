const express = require('express') 
const ExpressError = require('./expressError')
const app = express() 

app.use(express.json())

// CODE 

/** 404 handler */
app.use(function (req, res, next) {
    return new ExpressError("Not Found", 404);
});
  
/** general error handler */
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: err.message,
    });
});

app.listen(3000, function() {
    console.log('Server starting on Port 3000') 
})
