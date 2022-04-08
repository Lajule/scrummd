window.addEventListener('DOMContentLoaded', function (event) {
    const sprint = document.querySelector('.sprint');

    const days = [];
    const to = new Date(sprint.dataset.to);
    for (const from = new Date(sprint.dataset.from); from <= to; from.setDate(from.getDate() + 1)) {
	days.push(new Date(from.getTime()));
    }

    const tickets = Array.from(sprint.querySelectorAll('.sprint-ticket')).map(ticket => ticket.dataset);

    const canvas = document.getElementById('sprint-brundown-chart');
    new Chart(canvas.getContext('2d'), {
	type: 'line',
	data: {
            labels: days,
            datasets: [{
		data: [12, 19, 3, 5, 2, 3],
            }]
	},
	options: {
            scales: {
		xAxes: [{
		    type: 'time'
		}]
            }
	}
    });
});
