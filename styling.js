// Author: Ben Haswell

// FOR ANYTHING STYLING/INTERFACE RELATED

let snippet1 = "";
let name1 = "Snippet 1";

let snippet2 = "";
let name2 = "Snippet 2";

let snippet3 = "";
let name3 = "Snippet 3";

let snippet4 = "";
let name4 = "Snippet 4";

let recentlyEdited = 0;

// Opens popup menu for individualized snippets
function togglePopup(snippetId) {

  var sendButton = document.getElementById("sentButton");
  var popup = document.getElementById("myPopup");
  var bindName = document.getElementById("bindName");
  var textBox = document.getElementById("textBox");

  var n1 = document.getElementById("n1");
  var n2 = document.getElementById("n2");
  var n3 = document.getElementById("n3");
  var n4 = document.getElementById("n4");


  popup.style.display = popup.style.display === "none" ? "flex" : "none";

  // Change function and names based on what box was selected
  switch(snippetId) {
    case 1:
      recentlyEdited = 1;
      bindName.innerHTML = name1;
      textarea.value = snippet1;
      sendButton.setAttribute("onclick", "sendSnippetToArduino(1)");
      break;
    case 2:
      recentlyEdited = 2;
      bindName.innerHTML = name2;
      textarea.value = snippet2;
      sendButton.setAttribute("onclick", "sendSnippetToArduino(2)");
      break;
    case 3:
      recentlyEdited = 3;
      bindName.innerHTML = name3;
      textarea.value = snippet3;
      sendButton.setAttribute("onclick", "sendSnippetToArduino(3)");
      break;
    case 4:
      recentlyEdited = 4;
      bindName.innerHTML = name4;
      textarea.value = snippet4;
      sendButton.setAttribute("onclick", "sendSnippetToArduino(4)");
      break;
    case undefined: // close box
      switch(recentlyEdited) { // set names based on what was closed
        case 1:
          name1 = bindName.innerHTML;
          snippet1 = textBox.value;
          n1.innerHTML = name1;
          break;
        case 2:
          name2 = bindName.innerHTML;
          snippet2 = textBox.value;
          n2.innerHTML = name2;
          break;
        case 3:
          name3 = bindName.innerHTML;
          snippet3 = textBox.value;
          n3.innerHTML = name3;
          break;
        case 4:
          name4 = bindName.innerHTML;
          snippet4 = textBox.value;
          n4.innerHTML = name4;
          break;
        case undefined: // nothing edited yet
          break;
      }
      break;
  }
}

// Allow user to tab and untab in textarea
const textarea = document.getElementById("textBox");
textarea.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && e.shiftKey) { // Shift+Tab
      e.preventDefault();
      const start = this.selectionStart;
      const end = this.selectionEnd;
      const value = this.value;
      let newStart = start;
      let newEnd = end;
      // Check if the previous two characters are spaces
      if (value.substring(start - 2, start) === '  ') {
        // Untab by two character spaces
        this.value = value.substring(0, start - 2) + value.substring(end);
        newStart = start - 2;
        newEnd = end - 2;
      }
      this.selectionStart = newStart;
      this.selectionEnd = newEnd;
    } else if (e.key === 'Tab' && !e.shiftKey) { // Tab
      e.preventDefault();
      const start = this.selectionStart;
      const end = this.selectionEnd;
      this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
      this.selectionStart = this.selectionEnd = start + 2;
    }
});

// Blinking animation for TypePaste title
const title = document.getElementById('title');
setInterval(function() {
  title.textContent = title.textContent.endsWith('_') ? 'TypePaste' : 'TypePaste_';
}, 500);

// Info popup
function toggleInfo() {
  var infoPopup = document.getElementById("info");

  infoPopup.style.display = infoPopup.style.display === "none" ? "flex" : "none";
}