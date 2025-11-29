# In-Memory Key-Value Database With Transaction Support
This project implements an in-memory key-value database in JavaScript.  
It supports `begin_transaction()`, `put(key, value)`, `get(key)`, `commit()`, and `rollback()`, following the rules laid out in the assignment specification.

## How to Run the Code
1. Make sure you have [Node.js](https://nodejs.org/en/download) installed. To ensure that you have it installed, run:
```
node -v
```
2. Clone the repository or download the `database.js` file.
3. Open a terminal and navigate to the folder where you either cloned the repository or downloaded the `database.js` file.
4. Run the program using:
```
node database.js
```
5. You can edit the testing code in the `database.js` file to test out your own custom implementations.

## Writeup on Assignment Experience
I believe that this assignment is a couple tweaks away from a being a perfect "official" assignment. First, I think there should be an automatic grading script for a select few programming language options in order to ensure fair grading. Currently, a grader is expected to potentially download software and run the code on their own device. This could bring up issues where one grader is able to run someone's code with no problem, while another grader may run into issues trying to run the exact same submission. Second, in the instructions, there should be a breakdown of where the 4 points for "working code" come from. This would allow students to get a better understanding of how their grade is actually determined.