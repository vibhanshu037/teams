const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Assuming you have a swagger.json file

const userManagementRoutes = require('./routes/userManagement');
const meetingManagementRoutes = require('./routes/meetingManagement');
const mediaStreamingRoutes = require('./routes/mediaStreaming');
const chatServiceRoutes = require('./routes/chatService');
const recordingServiceRoutes = require('./routes/recordingService');
const notificationServiceRoutes = require('./routes/notificationService');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(morgan('combined'));
app.use(express.json());

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/user-management', userManagementRoutes);
app.use('/api/meeting-management', meetingManagementRoutes);
app.use('/api/media-streaming', mediaStreamingRoutes);
app.use('/api/chat-service', chatServiceRoutes);
app.use('/api/recording-service', recordingServiceRoutes);
app.use('/api/notification-service', notificationServiceRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});