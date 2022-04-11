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
				borderColor: 'rgb(51, 51, 51)',
				backgroundColor: 'rgb(51, 51, 51)'
			},
			{
				label: "Completed",
				data: [],
				stepped: true,
				borderColor: 'rgb(255, 159, 64)',
				backgroundColor: 'rgb(255, 159, 64)'
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
});
