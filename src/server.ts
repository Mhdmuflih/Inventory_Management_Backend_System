import app from "./app";
import { connectDB } from "./configs/database.connection";
import { PORT } from "./configs/env.config";


const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server Is Running on http://localhost${PORT}`);
    });
}

startServer();