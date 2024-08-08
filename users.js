import express from "express";
const app = express();
const port = 3000;

const users = [
    { id: "123", name: "Alice" },
    { id: "456", name: "Bob" },
];

app.get("/:id", (req, res) => {
    const { id } = req.params;
    const foundUser = users.find(user => user.id === id);
    if (foundUser) {
        res.send(foundUser);
    } else {
        res.status(404).send("User not found");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})

export default users;