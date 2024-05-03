function generateAthleteInputs() {
    const numAthletes = parseInt(document.getElementById('numAthletes').value);
    const athleteInputs = document.getElementById('athleteInputs');
    athleteInputs.innerHTML = ''; // Clear existing inputs

    if (numAthletes > 1) {
        for (let i = 1; i <= numAthletes; i++) {
            const inputHTML = `<label for="fighter${i}">Fighter ${i}:</label><input type="text" id="fighter${i}" placeholder="Enter Fighter ${i} Name"><br>`;
            athleteInputs.innerHTML += inputHTML;
        }
    } else {
        athleteInputs.innerHTML = "Please enter at least two fighters.";
    }
}

function generateSchedule() {
    const numAthletes = parseInt(document.getElementById('numAthletes').value);
    let athletes = [];

    for (let i = 1; i <= numAthletes; i++) {
        const athleteName = document.getElementById(`fighter${i}`).value;
        if (athleteName.trim() === '') {
            document.getElementById('scheduleOutput').innerHTML = "All fighter names must be filled out.";
            return;
        }
        athletes.push(athleteName.trim());
    }

    athletes = shuffle(athletes);
    const schedule = [];
    let byeMessage = "";

    if (numAthletes % 2 !== 0) {
        byeMessage = `${athletes.pop()} gets a bye.`;
    }

    for (let i = 0; i < athletes.length; i += 2) {
        schedule.push(`${athletes[i]} vs ${athletes[i + 1]}`);
    }

    if (byeMessage) {
        schedule.push(byeMessage);
    }

    document.getElementById('scheduleOutput').innerHTML = schedule.join("<br>");
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
