import express from "express" ;
import fetchNumbers from "./fetchNumbers.js";

const app = express();
const PORT = 9876;

let numberWindow = [];
const WINDOW_SIZE = 10;

app.get("/numbers/:numberId", async (req, res) => {
    const numberId = req.params.numberId;
    if (!["p", "f", "e", "r"].includes(numberId)) {
        return res.status(400).json({ error: "Invalid number ID" });
    }

    const prevState = [...numberWindow]; 
    const newNumbers = await fetchNumbers(numberId);

    newNumbers.forEach(num => {
        if (!numberWindow.includes(num)) {
            numberWindow.push(num);
        }
    });

    while (numberWindow.length > WINDOW_SIZE) {
        numberWindow.shift(); 
    }

    const avg = numberWindow.length ? (numberWindow.reduce((a, b) => a + b, 0) / numberWindow.length).toFixed(2) : 0;

    res.json({
        windowPrevState: prevState,
        windowCurrState: numberWindow,
        numbers: newNumbers,
        avg: parseFloat(avg)
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
