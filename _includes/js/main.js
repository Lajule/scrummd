window.addEventListener('DOMContentLoaded', function(event) {
    const sprint = document.querySelector('.sprint');
    const tickets = sprint.querySelectorAll('.sprint-ticket');
    const canvas = document.getElementById('sprint-brundown-chart');

    let complexity = parseInt(sprint.dataset.complexity, 10);

    const doneTicketsMap = Array.from(tickets).reduce((acc, curr) => {
        if (curr.dataset.status == 'DONE') {
            const updated = new Date(curr.dataset.updated).toLocaleDateString();
            if (!acc[updated]) {
                acc[updated] = 0;
            }
            acc[updated] += parseInt(curr.dataset.complexity, 10);
        }
        return acc;
    }, {})

    const chartData = {
        labels: [],
        datasets: [{
                label: "Ideal",
                data: [],
                borderColor: '#1E2224',
                backgroundColor: '#1E2224'
            },
            {
                label: "Completed",
                data: [],
                stepped: true,
                borderColor: '#6ac174',
                backgroundColor: '#6ac174'
            }
        ]
    };

    const to = new Date(sprint.dataset.to);
    for (const from = new Date(sprint.dataset.from); from <= to; from.setDate(from.getDate() + 1)) {
        chartData.labels.push(from.toLocaleDateString());
    }

    chartData.datasets[0].data = [{
        x: chartData.labels[0],
        y: complexity
    }, {
        x: chartData.labels[chartData.labels.length - 1],
        y: 0
    }];

    for (let i = 0; i < chartData.labels.length; ++i) {
        const day = chartData.labels[i];
        if (doneTicketsMap[day]) {
            complexity -= doneTicketsMap[day];
        }
        chartData.datasets[1].data.push({
            x: chartData.labels[i],
            y: complexity
        });
    }

    new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: chartData,
        options: {
            responsive: true
        }
    });

    tickets.forEach(ticket => {
	const details = ticket.querySelector('button');
	const dialog = ticket.querySelector('dialog');

	details.addEventListener('click', function () {
	    dialog.showModal();
	});
    });
});
