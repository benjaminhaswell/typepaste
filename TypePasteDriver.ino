// Author: Ben Haswell

#include <Keyboard.h>

// Snippet variables
String snippet1 = "";
String snippet2 = "";
String snippet3 = "";
String snippet4 = "";

// Buttons
int button1 = 7;
int button2 = 6;
int button4 = 5;
int button3 = 4;

// RGB Modules
int rPin1 = 2;
int gPin1 = 3;

int rPin2 = 8;
int gPin2 = 9;

int rPin4 = 10;
int gPin4 = 11;

int rPin3 = 12;
int gPin3 = 13;

// Temp String for filtering
String temp = "";


void setup() {
  Serial.begin(9600); // Starts the serial communication

  // Lights should be red when it starts up
  analogWrite(rPin1, 255);
  analogWrite(rPin2, 255);
  analogWrite(rPin3, 255);
  analogWrite(rPin4, 255);

  while (!Serial) { ; }// wait for serial port to connect, then proceed

  // Reserve bytes for snippets to improve performance
  snippet1.reserve(200);
  snippet2.reserve(200);
  snippet3.reserve(200);
  snippet4.reserve(200);

  pinMode(button1, INPUT_PULLUP);
  pinMode(button2, INPUT_PULLUP);
  pinMode(button3, INPUT_PULLUP);
  pinMode(button4, INPUT_PULLUP);

  pinMode(rPin1, OUTPUT);
  pinMode(gPin1, OUTPUT);

  pinMode(rPin2, OUTPUT);
  pinMode(gPin2, OUTPUT);

  pinMode(rPin3, OUTPUT);
  pinMode(gPin3, OUTPUT);

  pinMode(rPin4, OUTPUT);
  pinMode(gPin4, OUTPUT);

  Keyboard.begin();
}

void loop() {

  // ASSIGNING INCOMING DATA TO APPROPRIATE SNIPPET
  while (Serial.available() > 0) { // While there is data available
    char incomingByte = Serial.read(); // Read the incoming data byte by byte
    temp += incomingByte;
  }

  switch (temp.charAt(0)) { // assign to snippet based on id (first character)
    case '1':
      snippet1 = temp.substring(1);
      temp = ""; // clear temp so its ready for next input
      break;
    case '2':
      snippet2 = temp.substring(1);
      temp = ""; // clear temp so its ready for next input
      break;
    case '3':
      snippet3 = temp.substring(1);
      temp = ""; // clear temp so its ready for next input
      break;
    case '4':
      snippet4 = temp.substring(1);
      temp = ""; // clear temp so its ready for next input
      break;
  }

  // BUTTONS
  if (digitalRead(button1) == LOW) {
    Keyboard.print(snippet1);
    delay(250);
  }
  if (digitalRead(button2) == LOW) {
    Keyboard.print(snippet2);
    delay(250);
  }
  if (digitalRead(button3) == LOW) {
    Keyboard.print(snippet3);
    delay(250);
  }
  if (digitalRead(button4) == LOW) {
    Keyboard.print(snippet4);
    delay(250);
  }

  // LIGHTS
  if (!snippet1.equals("")) {
    analogWrite(rPin1, 0);
    analogWrite(gPin1, 255);
  } else {
    analogWrite(rPin1, 255);
    analogWrite(gPin1, 0);
  }

  if (!snippet2.equals("")) {
    analogWrite(rPin2, 0);
    analogWrite(gPin2, 255);
  } else {
    analogWrite(rPin2, 255);
    analogWrite(gPin2, 0);
  }

  if (!snippet3.equals("")) {
    analogWrite(rPin3, 0);
    analogWrite(gPin3, 255);
  } else {
    analogWrite(rPin3, 255);
    analogWrite(gPin3, 0);
  }

  if (!snippet4.equals("")) {
    analogWrite(rPin4, 0);
    analogWrite(gPin4, 255);
  } else {
    analogWrite(rPin4, 255);
    analogWrite(gPin4, 0);
  }
}
