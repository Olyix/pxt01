const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/royalties', require('./routes/royaltyRoutes'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    });
});
