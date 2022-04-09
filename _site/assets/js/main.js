window.addEventListener('DOMContentLoaded', function (event) {
    const sprint = document.querySelector('.sprint');
    const tickets = Array.from(sprint.querySelectorAll('.sprint-ticket')).map(ticket => ticket.dataset);

    const sprintDays = [];
    const to = new Date(sprint.dataset.to);
    for (const from = new Date(sprint.dataset.from); from <= to; from.setDate(from.getDate() + 1)) {
        sprintDays.push(from.toLocaleDateString());
    }

    const totalComplexity = tickets.reduce((acc, curr) => acc + parseInt(curr.complexity), 0);

    const dataIdeal = [{x: sprintDays[0], y: totalComplexity}, {x: sprintDays[sprintDays.length - 1], y: 0}];

    const completedMap = tickets.reduce((acc, curr) => {
        if (curr.status == 'DONE') {
            const updated = new Date(curr.updated).toLocaleDateString();
            if (!acc[updated]) {
                acc[updated] = 0;
            }
            acc[updated] += parseInt(curr.complexity);
        }
        return acc;
    }, {})

    const dataCompleted = [];
    let currentComplexity = totalComplexity;
    for (let i = 0; i < sprintDays.length; ++i) {
        const day = sprintDays[i];
        if (completedMap[day]) {
            currentComplexity -= completedMap[day];
        }
        dataCompleted.push({
            x: sprintDays[i],
            y: currentComplexity
        });
    }

    const canvas = document.getElementById('sprint-brundown-chart');
    new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: sprintDays,
            datasets: [
                {
                    label: "Ideal",
		            data: dataIdeal,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgb(75, 192, 192)'
                },
                {
                    label: "Completed",
		            data: dataCompleted,
                    stepped: true,
                    borderColor: 'rgb(255, 159, 64)',
                    backgroundColor: 'rgb(255, 159, 64)'
                },
            ]
	    }
    });
});

