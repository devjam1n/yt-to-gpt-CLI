import inquirer from "inquirer";

async function askUser(message) {
  const answers = await inquirer.prompt({
    name: "answer",
    type: "input",
    message: message,
  });
  return answers.answer;
}

export default askUser;