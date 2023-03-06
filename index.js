import { getTranscript } from "./transscript/index.js";
import { askOpenAI } from "./askOpenAI.js";
import chalk from "chalk"
import figlet from "figlet"
import sleep from "./components/sleep.js";
import askUser from "./components/askUser.js";
import { createSpinner } from 'nanospinner'

console.clear()
figlet("YT-GPT", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data)
});
await sleep(250)
console.log(chalk.blue.bold("Af Benjamin Nielsen\n"))
const url = await askUser("Hvad er url-addressen på youtube videoen?")

const spinner = createSpinner('Indsamler video information...').start()

try {
  const transcript = await getTranscript({ url: url });
  spinner.success()

  // make transscript chatGPT readable
  function convertTranscript(transcripts) {
    let output = "";
    for (let i = 0; i < transcripts.length; i++) {
      const { text, offset } = transcripts[i];
      output += text
      //output += `${offset}:ms ${text}\n\n`;
    }
    return output;
  }

  const spinner2 = createSpinner('Genererer resumé').start()
  const readyTransscript = convertTranscript(transcript)

  askOpenAI({ prompt: readyTransscript, spinner: spinner2 })

} catch (error) {

}