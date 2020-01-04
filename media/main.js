(function(){
  const vscode = acquireVsCodeApi();
  const counter = document.getElementById('lines-of-code-counter');

  // Check if we have an old state to restore from
const previousState = vscode.getState();
let count = previousState ? previousState.count : 0;
counter.textContent = count;

  setInterval(() => {
      counter.textContent = count++;
      vscode.setState({ count });
  }, 100);
  // Handle the message inside the webview
  window.addEventListener('message', event => {

      const message = event.data; // The JSON data our extension sent
      console.log(message)
      switch (message.command) {
          case 'refactor':
              count = Math.ceil(count * 0.5);
              counter.textContent = count;
              break;
      }
  });
})()