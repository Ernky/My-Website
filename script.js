document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const output = document.querySelector('.output');
    const terminalBody = document.querySelector('.terminal-body');

    // Function to focus on userInput field
    function focusUserInput() {
        userInput.focus();
    }

    // Initial focus on page load
    focusUserInput();

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = userInput.value.trim();
            const response = processCommand(command);
            if (command) {
                // Create a new div element for the command entered
                const commandOutput = document.createElement('div');
                commandOutput.classList.add('command-line');
                output.appendChild(commandOutput); // Append command to output
            }
            userInput.value = '';
            focusUserInput(); // Keep focus on input field after enter
            if (response) {
                // Create a new div element for the response
                const responseOutput = document.createElement('div');
                responseOutput.classList.add('response-line');
                output.appendChild(responseOutput); // Append response to output
                animateTypeOut(responseOutput, response); // Trigger typing animation for response
            }
        }
    });

    var d = new Date();
    var n = d.getUTCHours();
    var m = d.getUTCMinutes();
    var s = d.getUTCSeconds();


    function processCommand(command) {
        const cmd = command.toLowerCase();

        // Handle different commands
        switch (cmd) {
            case 'start':
                return '<div class="help-text-container"><pre class="help-text">\n>SYSTEM INFO\n>ABOUT\n>PROJECT\n>HISTORY\n>CONTACT\n>CLEAR</pre></div>';
            case 'system info':
                return 'OS: VEILCHEN_OS_v1.0.4\nHOST: arbeitsstation-system\nKERNEL: 2.4.32-KR\nARCHITECTURE: x86\nPROCESSOR: 2600 RL Z3 Prozessor\nCORE: 1\nMEMORY: 64 words 22 bits\nNETWORK: Verbunden (ETH0)\nLAST_RESTART: 28 Jan 1949\nSYSTEM_TIME: ' + n + ':'+ m +':' + s + ' UTC';
                
            case 'ABOUT':
                return '';
            case 'PROJECT':
                return '<div class="help-text-container"></div>';
            case 'HISTORY':
                return '<div class="help-text-container"></div>';
            case 'CONTACT':
                return 'You can reach me via email at "info@gmail.com".';
            case 'clear':
                clearTerminal();
                return ''; // Return empty string after clearing terminal
            case '':
                return ''; // Handle empty input gracefully
            default:
                if (cmd.startsWith('echo ')) {
                    return cmd.substring(5); // Echo back the text after 'echo '
                }
                return `Command not found: ${command}`;
        }
    }

    function clearTerminal() {
        output.innerHTML = ''; // Clear the output content
        // Scroll to the top after clearing
        terminalBody.scrollTop = 0;
    }

    // Ensure userInput remains focused when clicking away
    document.addEventListener('click', function(event) {
        if (!userInput.contains(event.target)) {
            focusUserInput();
        }
    });

    function animateTypeOut(element, text) {
        element.innerHTML = ''; // Clear existing text
        let i = 0;

        function type() {
            if (i < text.length) {
                let currentChar = text.charAt(i);
                if (currentChar === '<') {
                    const endTagIndex = text.indexOf('>', i);
                    if (endTagIndex !== -1) {
                        element.innerHTML += text.substring(i, endTagIndex + 1);
                        i = endTagIndex + 1;
                    }
                } else {
                    element.innerHTML += currentChar;
                    i++;
                }
                setTimeout(type, 50); // Adjust typing speed here
            }
        }

        type();
    }
});
