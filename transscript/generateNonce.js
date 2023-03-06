export function generateNonce() {
  // Define the length of the nonce and the possible characters it can contain
  const nonceLength = 12;
  const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Generate a random nonce by picking random characters from the possible characters string
  let nonce = "";
  for (let i = 0; i < nonceLength; i++) {
    nonce += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }

  return nonce;
}