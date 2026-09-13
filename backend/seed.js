require('dotenv').config(); const bcrypt = require('bcryptjs'); const connectDB = require('./config/db');
const User = require('./models/User'); const Subject = require('./models/Subject'); const Quiz = require('./models/Quiz'); const Question = require('./models/Question');
const quizData = [
  {
    subject: 'Java',
    questions: [
      ['Which keyword declares a class in Java?', 'class', 'struct', 'define', 'type', 'A'],
      ['Which method is the entry point of a Java application?', 'start()', 'main()', 'run()', 'init()', 'B'],
      ['Which type stores a whole number such as 42?', 'double', 'boolean', 'int', 'char', 'C'],
      ['What does inheritance allow a class to do?', 'Use members of a parent class', 'Run without compiling', 'Store only text', 'Prevent all method calls', 'A'],
      ['Which collection does not allow duplicate elements?', 'List', 'Queue', 'Set', 'Array', 'C'],
      ['What is the default value of an instance boolean field?', 'true', 'false', 'null', '0', 'B'],
      ['Which access modifier makes a member available from any class?', 'private', 'protected', 'package', 'public', 'D'],
      ['What does the final keyword prevent when applied to a variable?', 'Reading the variable', 'Changing its value', 'Using its type', 'Printing its value', 'B'],
      ['Which exception is checked at compile time?', 'IOException', 'ArithmeticException', 'NullPointerException', 'ArrayIndexOutOfBoundsException', 'A'],
      ['Which interface is commonly implemented to define custom sorting?', 'Runnable', 'Serializable', 'Comparable', 'Cloneable', 'C']
    ]
  },
  {
    subject: 'Python',
    questions: [
      ['Which symbol starts a comment in Python?', '#', '//', '<!--', '/*', 'A'],
      ['Which Python type stores an ordered, changeable collection?', 'tuple', 'list', 'set', 'frozenset', 'B'],
      ['What does len("hello") return?', '4', '5', '6', 'An error', 'B'],
      ['Which keyword defines a function?', 'func', 'function', 'def', 'method', 'C'],
      ['What is the result of 3 ** 2?', '6', '8', '9', '12', 'C'],
      ['Which value represents the absence of a value?', 'empty', 'None', 'undefined', 'void', 'B'],
      ['What does a dictionary store?', 'Only indexed values', 'Key-value pairs', 'Only unique numbers', 'Sorted characters', 'B'],
      ['Which statement handles an exception?', 'try', 'catch', 'rescue', 'handle', 'A'],
      ['What does range(3) produce when iterated?', '1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '3 only', 'B'],
      ['Which operator checks whether two values are equal?', '=', '==', '===', '!=', 'B']
    ]
  },
  {
    subject: 'JavaScript',
    questions: [
      ['Which keyword declares a block-scoped variable that can be reassigned?', 'var', 'let', 'const', 'static', 'B'],
      ['What does typeof null return in JavaScript?', 'null', 'undefined', 'object', 'boolean', 'C'],
      ['Which array method creates a new array by transforming each item?', 'filter()', 'reduce()', 'map()', 'find()', 'C'],
      ['What does JSON.parse() do?', 'Converts JSON text into a JavaScript value', 'Converts an object into JSON text', 'Runs a promise', 'Creates a DOM node', 'A'],
      ['Which value is falsy in JavaScript?', '[]', '{}', '"0"', '0', 'D'],
      ['What does === compare?', 'Only types', 'Only values after conversion', 'Value and type without coercion', 'Object keys only', 'C'],
      ['Which function schedules work after a delay?', 'setTimeout()', 'setDelay()', 'wait()', 'delayTask()', 'A'],
      ['What does Array.isArray([]) return?', 'true', 'false', '[]', 'undefined', 'A'],
      ['Which syntax creates an arrow function?', 'function => ()', '() => {}', 'arrow() {}', 'fn -> {}', 'B'],
      ['What does Promise.all() do?', 'Rejects every promise', 'Waits for multiple promises and returns their results', 'Turns a promise into a callback', 'Runs only the first promise', 'B']
    ]
  }
];
async function seed() {
  await connectDB(); await Promise.all([User.deleteMany(), Subject.deleteMany(), Quiz.deleteMany(), Question.deleteMany()]);
  const admin = await User.create({ name: 'Prashant', email: 'prashant@gmail.com', password: await bcrypt.hash('Prashant@123', 12), role: 'admin' });
  await User.create([{ name: 'Aarav Student', email: 'student1@gmail.com', password: await bcrypt.hash('Student@123', 12) }, { name: 'Maya Student', email: 'student2@gmail.com', password: await bcrypt.hash('Student@123', 12) }]);
  const subjectDocs = await Subject.insertMany(quizData.map(({ subject }) => ({ name: subject, description: `Practice ${subject} fundamentals and problem solving.` })));
  for (let index = 0; index < quizData.length; index += 1) { const quiz = await Quiz.create({ title: `${subjectDocs[index].name} Foundations`, description: `A focused ${subjectDocs[index].name} assessment.`, subject: subjectDocs[index]._id, duration: 10, totalQuestions: quizData[index].questions.length, createdBy: admin._id }); await Question.insertMany(quizData[index].questions.map(([questionText, optionA, optionB, optionC, optionD, correctAnswer]) => ({ quiz: quiz._id, questionText, optionA, optionB, optionC, optionD, correctAnswer }))); }
  console.log('Seed complete. Admin Prashant: prashant@gmail.com / Prashant@123'); process.exit(0);
}
seed().catch((error) => { console.error(error); process.exit(1); });