// halts app until time is up
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default sleep;