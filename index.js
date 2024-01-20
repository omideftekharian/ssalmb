const { exec } = require('child_process');

// Function to execute shell commands
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

// Install Mozilla Firefox in the user's home directory
const installFirefox = async () => {
  try {
    console.log('Installing Mozilla Firefox...');
    await runCommand('mkdir -p ~/firefox-install');
    await runCommand('wget -O ~/firefox-install/firefox.tar.bz2 "https://download.mozilla.org/?product=firefox-latest&os=linux64"');
    await runCommand('tar xjf ~/firefox-install/firefox.tar.bz2 -C ~/firefox-install');
    console.log('Mozilla Firefox installed successfully.');
  } catch (error) {
    console.error('Error installing Mozilla Firefox:', error);
    process.exit(1);
  }
};

// Run Mozilla Firefox
const runFirefox = async () => {
  try {
    console.log('Running Mozilla Firefox...');
    await runCommand('~/firefox-install/firefox/firefox');
  } catch (error) {
    console.error('Error running Mozilla Firefox:', error);
    process.exit(1);
  }
};

// Main function
const main = async () => {
  await installFirefox();
  await runFirefox();
};

// Execute the main function
main();
