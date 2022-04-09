window.addEventListener('DOMContentLoaded', function (event) {
    const sprint = document.querySelector('.sprint');
    const tickets = Array.from(sprint.querySelectorAll('.sprint-ticket')).map(ticket => ticket.dataset);
    const canvas = document.getElementById('sprint-brundown-chart');

    const daysInSprint = [];
    const to = new Date(sprint.dataset.to);
    for (const from = new Date(sprint.dataset.from); from <= to; from.setDate(from.getDate() + 1)) {
        daysInSprint.push(from.toLocaleDateString());
    }

    const sprintComplexity = parseInt(sprint.dataset.complexity);

    const dataIdeal = [{x: daysInSprint[0], y: sprintComplexity}, {x: daysInSprint[daysInSprint.length - 1], y: 0}];

    const doneTicketsMap = tickets.reduce((acc, curr) => {
        if (curr.status == 'DONE') {
            const updated = new Date(curr.updated).toLocaleDateString();
            if (!acc[updated]) { acc[updated] = 0; }
            acc[updated] += parseInt(curr.complexity);
        }
        return acc;
    }, {})

    const doneTicketsData = [];
    let currentComplexity = sprintComplexity;
    for (let i = 0; i < daysInSprint.length; ++i) {
        const day = daysInSprint[i];
        if (doneTicketsMap[day]) { currentComplexity -= doneTicketsMap[day]; }
        doneTicketsData.push({x: daysInSprint[i], y: currentComplexity});
    }

    new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: daysInSprint,
            datasets: [
                {label: "Ideal", data: dataIdeal, borderColor: 'rgb(75, 192, 192)', backgroundColor: 'rgb(75, 192, 192)'},
                {label: "Completed", data: doneTicketsData, stepped: true, borderColor: 'rgb(255, 159, 64)', backgroundColor: 'rgb(255, 159, 64)'},
            ]
	    }
    });
});
