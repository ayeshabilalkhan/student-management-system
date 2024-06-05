#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
// Define student class
class Student {
    static counter = 10001; // Initialize the static counter
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initialize empty array for courses
        this.balance = 100;
    }
    // Method to enroll a student in a course
    enrollCourse(course) {
        this.courses.push(course);
    }
    // Method to view a student balance
    viewBalance() {
        console.log(chalk.green(`Balance For ${this.name}: $${this.balance}`));
    }
    // Method to pay student fees
    payFees(amount) {
        this.balance -= amount;
        console.log(chalk.green(`$${amount} Fees Paid Successfully For ${this.name}`));
    }
    // Method to display student status
    showStatus() {
        console.log(chalk.green(`ID: ${this.id}`));
        console.log(chalk.green(`Name: ${this.name}`));
        console.log(chalk.green(`Courses: ${this.courses.join(', ')}`));
        console.log(chalk.green(`Balance: $${this.balance}`));
    }
}
// Define a student manager to manage students
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student
    addStudent(name) {
        const student = new Student(name);
        this.students.push(student);
        console.log(chalk.green(`Student: ${name} Added Successfully, Student ID: ${student.id}`));
    }
    // Method to enroll a student in a course
    enrollStudent(name, course) {
        const student = new Student(name);
        student.enrollCourse(course);
        this.students.push(student);
        console.log(chalk.green(`${name} Enrolled In ${course} Successfully With Student ID: ${student.id}`));
    }
    // Method to view a student balance
    viewStudentBalance(studentId) {
        const student = this.findStudent(studentId);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log(chalk.redBright("Student Not Found! Please Enter A Correct Student ID"));
        }
    }
    // Method to pay student fees
    payStudentFees(studentId, amount) {
        const student = this.findStudent(studentId);
        if (student) {
            student.payFees(amount);
        }
        else {
            console.log(chalk.redBright("Student Not Found. Please Enter A Correct Student ID"));
        }
    }
    // Method to display student status
    showStudentStatus(studentId) {
        const student = this.findStudent(studentId);
        if (student) {
            student.showStatus();
        }
    }
    // Method to find a student by ID
    findStudent(studentId) {
        return this.students.find(std => std.id === studentId);
    }
}
// Main function to run the program
async function main() {
    console.log("-".repeat(56));
    console.log(chalk.yellowBright("| - - - Welcome To The Student Management System - - - |"));
    console.log("-".repeat(56));
    const manager = new StudentManager(); // Create an instance of StudentManager
    // While loop to keep running the program
    while (true) {
        const choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.magenta("Select An Option"),
                choices: [
                    "Enroll Student",
                    "Add Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        // Using switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                const nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter A Student Name",
                        validate: function (value) {
                            if (/^[A-Za-z\s]+$/.test(value)) {
                                return true;
                            }
                            else {
                                return chalk.redBright("Please enter a valid name with letters and spaces only.");
                            }
                        }
                    }
                ]);
                manager.addStudent(nameInput.name);
                break;
            case "Enroll Student":
                const enrollInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter The Student's Name",
                        validate: function (value) {
                            if (/^[A-Za-z\s]+$/.test(value)) {
                                return true;
                            }
                            else {
                                return chalk.redBright("Please enter a valid name with letters and spaces only.");
                            }
                        }
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter Course Name",
                        validate: function (value) {
                            if (/^[A-Za-z\s]+$/.test(value)) {
                                return true;
                            }
                            else {
                                return chalk.redBright("Please enter a valid name with letters and spaces only.");
                            }
                        }
                    }
                ]);
                manager.enrollStudent(enrollInput.name, enrollInput.course);
                break;
            case "View Student Balance":
                const balanceInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter A Student ID"
                    }
                ]);
                manager.viewStudentBalance(balanceInput.studentId);
                break;
            case "Pay Fees":
                const feeInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter A Student ID"
                    },
                    {
                        name: "amount",
                        type: "input",
                        message: "Enter An Amount To Pay",
                        validate: function (value) {
                            const parsedValue = parseFloat(value);
                            if (!isNaN(parsedValue) && parsedValue >= 0) {
                                return true;
                            }
                            else {
                                return chalk.redBright("Please enter a valid amount.");
                            }
                        }
                    }
                ]);
                manager.payStudentFees(feeInput.studentId, feeInput.amount);
                break;
            case "Show Status":
                const statusInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter A Student ID"
                    }
                ]);
                manager.showStudentStatus(statusInput.studentId);
                break;
            case "Exit":
                console.log(chalk.redBright("Exiting.. ."));
                process.exit();
        }
    }
}
// Calling the main function
main();
