// Author: Ben Haswell

// FOR ANYTHING ARDUINO RELATED

let port;

// Testing
async function sendTextToArduino(id) {

    // If port is not already open, open it
    if (!port) {
        port = await navigator.serial.requestPort();
        if (!port.readable) {
            await port.open({ // open before function - trying to open when already open (repeated inputs will cause error)
                baudRate: 9600,
                dataBits: 8,
                stopBits: 1,
                parity: "none",
                flowControl: "none",
            });
        }
    }
    
    // Get snippet from text box
    const textInput = document.getElementById("test").value;

    // Encode the data
    const encoder = new TextEncoder();
    const data = encoder.encode(textInput); // worked with "Hello, Arduino!", not textInput

    // Write to port
    const writer = port.writable.getWriter();
    await writer.write(data);
    writer.releaseLock();

    // Read from the port
    let decodedString = "";
    const reader = port.readable.getReader();
    const timeout = setTimeout(() => {
        console.log("Timeout reached, exiting loop");
        reader.cancel();
    }, 1000); // 1 second timeout

    while (true) {
        try {
            const { value, done } = await reader.read();
            if (done) {
                break;
            }
            if (value) {
                const decoder = new TextDecoder(); // Decode array
                const decodedValue = decoder.decode(value);
                decodedString += decodedValue;
            }
        } catch (error) {
            console.error(error);
        }
    }
    clearTimeout(timeout);

    decodedString = cleanDecodedString(decodedString);
    console.log(decodedString);
    reader.releaseLock();
}

// Sending user text (prepended with id) to arduino via serial
async function sendSnippetToArduino(id) {

    // If port is not already open, open it
    if (!port) {
        port = await navigator.serial.requestPort();
        if (!port.readable) {
            await port.open({ // open before function - trying to open when already open (repeated inputs will cause error)
                baudRate: 9600,
                dataBits: 8,
                stopBits: 1,
                parity: "none",
                flowControl: "none",
            });
        }
    }
    
    // Get snippet from text box and prepend with id
    let textInput = String(id) + document.getElementById("textBox").value;
    console.log(textInput);

    // Encode the data
    const encoder = new TextEncoder();
    const data = encoder.encode(textInput);

    // Write to port
    const writer = port.writable.getWriter();
    await writer.write(data);
    writer.releaseLock();

    // Inform user that it was saved
    var hiddenText = document.getElementById("sentMsg");
    hiddenText.style.display = "inline"; // display the text
    setTimeout(function() {
      hiddenText.style.display = "none"; // hide the text after 3 seconds
    }, 3000);
}

// Cleans decodedString so there is no "Recieved: " or extra spaces
function cleanDecodedString(decodedString) {
    // Remove "Received: " prefix from each character
    decodedString = decodedString.replace(/Received: /g, "");
    
    // Remove any newlines
    decodedString = decodedString.replace(/\r?\n|\r/g, "");
    
    return decodedString;
}