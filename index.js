import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let items = [{
    title: "Embracing the Digital Nomad Lifestyle: A Journey to Freedom",
    name: "Jane Doe",
    description: "In an era where the 9-to-5 grind dominates, the digital nomad lifestyle offers a refreshing escape. Imagine waking up in Bali, working from a beachside café, and exploring new cultures every weekend. The freedom to choose your workspace and the luxury of endless travel beckon adventurous souls. However, this lifestyle demands discipline and adaptability. With the right mindset and tools, you can transform your career into an endless journey of discovery and fulfillment. Are you ready to embrace the ultimate work-life balance?",
    timestamp: new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })
}]; // Start with an empty array for items
// I think I have to turn it into an array of objects

let currentYear = new Date().getFullYear();

app.use((req, res, next) => {
    res.locals.currentYear = currentYear;
    next();
});

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { items });
});

app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/authorization", (req, res) => {
    res.render("authorization");
});

app.post("/authorize", (req, res) => {
    const { username, password } = req.body;
    if (username === "Blogger" && password === "Blogg33r") {
        res.redirect("/main");
    } else {
        res.redirect("/authorization");
    }
});

app.get("/password", (req, res) => {
    res.send("We humbly apologise for our poor service. If you have forgotten your password, would you be so kind as to log in using the testing account. Thank you")
})

app.get("/main", (req, res) => {
    res.render("main", { items }); // Pass items array to the view
});

app.get("/contact", (req, res) => {
    res.render("contact");
})

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Contact form submitted by ${name}. Email: ${email}. This is the message: ${message}`);
    res.send("Thank you for your message! We'll get back to you soon.");
})

app.post("/submit", (req, res) => {
    const { title, name, description } = req.body;
    if (title.trim() !== "" && name.trim() !== "" && description.trim() !== "") {
        // items.push({ title: title, name: name, description: description });
        // experiment
        const timestamp = new Date().toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        // ends here
        items.push({ title, name, description, timestamp });
        // items.push({ title, name, description });
    }
    res.redirect("/main");
});

app.post("/delete/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (!isNaN(index)) {
        items.splice(index, 1);
    }
    res.redirect("/main");
});

app.get("/update/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (!isNaN(index) && index < items.length) {
        res.render("update", { index, item: items[index] });
    } else {
        res.redirect("/main");
    }
});

app.post("/update/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    const { updateTitle, updateName, updateDescription } = req.body;
    if (!isNaN(index) && index < items.length) {
        // experiment
        const timestamp = new Date().toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })
        items[index].timestamp = timestamp;
        // ends here
        items[index].title = updateTitle;
        items[index].name = updateName;
        items[index].description = updateDescription
    }
    res.redirect("/main");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});
