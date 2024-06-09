document.getElementById('add-option').addEventListener('click', function() {
    const optionsContainer = document.getElementById('options-container');
    const inputCount = optionsContainer.getElementsByClassName('poll-option').length;
    const newOption = document.createElement('input');
    newOption.type = 'text';
    newOption.classList.add('poll-option');
    newOption.placeholder = `Option ${inputCount + 1}`;
    newOption.required = true;
    optionsContainer.appendChild(newOption);
});

document.getElementById('poll-form').addEventListener('submit', function(e) {
    e.preventDefault();
    generatePollFrame();
});

function generatePollFrame() {
    const question = document.getElementById('poll-question').value;
    const options = Array.from(document.getElementsByClassName('poll-option')).map(input => input.value);

    document.getElementById('poll-frame-question').textContent = question;
    const optionsList = document.getElementById('poll-frame-options');
    optionsList.innerHTML = '';
    options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        optionsList.appendChild(li);
    });

    document.getElementById('poll-container').classList.remove('hidden');

    // Here you can add the logic to post the generated poll frame to Warpcast using their API
    // For example:
    // postToWarpcast(question, options);
}

// Example function to post to Warpcast (dummy implementation)
function postToWarpcast(question, options) {
    const postData = {
        question: question,
        options: options
    };

    fetch('https://warpcast-api-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
