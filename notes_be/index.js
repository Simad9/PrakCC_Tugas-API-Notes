import express from "express";
import cors from "cors";
import route from "./routes/route.js";
import "./model/index.js"; // <- PENTING: memicu sinkronisasi DB
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;

// Konfigurasi CORS agar hanya mengizinkan port 3000
const corsOptions = {
  origin: "http://localhost:3000", // Mengizinkan akses hanya dari port 3000
  credentials: true, // Jika kamu menggunakan cookies atau session
};

app.use(cors(corsOptions)); // Menggunakan opsi CORS
app.use(express.json());
app.use(cookieParser());
app.use(route);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
