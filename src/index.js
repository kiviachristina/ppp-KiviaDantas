import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import routes from './api/routes/index.js';

const app = express();
app.use(express.json());

// Load swagger document
const swaggerPath = new URL('../resources/swagger.json', import.meta.url);
const swaggerDoc = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/api', routes);

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;
