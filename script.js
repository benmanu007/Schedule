function generateTeamInputs() {
    const numTeams = parseInt(document.getElementById('numTeams').value);
    const teamInputs = document.getElementById('teamInputs');
    teamInputs.innerHTML = ''; // Clear existing inputs

    if (numTeams > 1) {
        for (let i = 1; i <= numTeams; i++) {
            const inputHTML = `<label for="team${i}">Team ${i}:</label><input type="text" id="team${i}" placeholder="Enter Team ${i} Name"><br>`;
            teamInputs.innerHTML += inputHTML;
        }
    } else {
        teamInputs.innerHTML = "Please enter at least two teams.";
    }
}

function generateSchedule() {
    const numTeams = parseInt(document.getElementById('numTeams').value);
    let teams = [];

    for (let i = 1; i <= numTeams; i++) {
        const teamName = document.getElementById(`team${i}`).value;
        if (teamName.trim() === '') {
            document.getElementById('scheduleOutput').innerHTML = "All team names must be filled out.";
            return;
        }
        teams.push(teamName.trim());
    }

    teams = shuffle(teams); // Randomly shuffle teams to mix up the match pairings
    const schedule = [];
    let byeMessage = "";

    if (numTeams % 2 !== 0) {
        byeMessage = `${teams.pop()} gets a bye.`; // Remove one team for a bye if odd number of teams
    }

    for (let i = 0; i < teams.length; i += 2) {
        schedule.push(`${teams[i]} vs ${teams[i + 1]}`);
    }

    if (byeMessage) {
        schedule.push(byeMessage);
    }

    document.getElementById('scheduleOutput').innerHTML = schedule.join("<br>");
}

// Helper function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}
