const jsonServer = require("json-server");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);

const SECRET_KEY = "mysecretkey"; // Change this in production

// Function to generate JWT token
const createToken = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

// Login API
server.post("/auth/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Login Attempt:", email, password); // ✅ Debug log

    const users = JSON.parse(fs.readFileSync("db.json", "utf8")).users;
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        res.json({ token: createToken({ email: user.email, name: user.name }) });
    } else {
        console.log("❌ Invalid login attempt");
        res.status(401).json({ message: "Invalid email or password" });
    }
});

// Register API
server.post("/auth/register", (req, res) => {
    const { name, email, password } = req.body;
    const db = JSON.parse(fs.readFileSync("db.json", "utf8"));

    if (db.users.find((user) => user.email === email)) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = { id: db.users.length + 1, name, email, password };
    db.users.push(newUser);
    fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

    res.json({ token: createToken({ email, name }) });
});

// Start JSON Server
server.use(middlewares);
server.use(router);

server.listen(5001, () => {
    console.log("🚀 JSON Server with Auth is running on port 5001");
});