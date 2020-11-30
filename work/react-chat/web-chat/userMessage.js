const messages = [
    {
        sender: "Amit",
        timestamp: new Date("2020-11-28 19:20:00").toUTCString(),
        text: "You up?",
    },
    {
        sender: "Bao",
        timestamp: new Date("2020-11-28 19:21:00").toUTCString(),
        text:
            "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
    },
];

function addMessage({ sender, timestamp, text }) {
    let obj = { sender: sender, timestamp: timestamp, text: text };
    messages.push(obj);
}

const userMessage = {
    messages,
    addMessage,
};

module.exports = userMessage;
