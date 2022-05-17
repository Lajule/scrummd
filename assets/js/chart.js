(function() {
	const sprint = document.querySelector('.sprint');
	const tickets = sprint.querySelectorAll('.ticket');
	const chart = document.getElementById('chart');

	let complexity = parseInt(sprint.dataset.complexity, 10);

	const doneTicketsMap = Array.from(tickets).reduce((acc, curr) => {
		if (curr.dataset.status === 'DONE') {
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
				borderColor: 'hsl(171, 100%, 41%)',
				backgroundColor: 'hsl(171, 100%, 41%)'
		}, {
				label: "Completed",
				data: [],
				stepped: true,
				borderColor: 'hsl(204, 86%, 53%)',
				backgroundColor: 'hsl(204, 86%, 53%)'
		}]
	};

	const end = new Date(sprint.dataset.end);
	for (const start = new Date(sprint.dataset.start); start <= end; start.setDate(start.getDate() + 1)) {
		chartData.labels.push(start.toLocaleDateString());
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

	new Chart(chart.getContext('2d'), {
		type: 'line',
		data: chartData,
		options: {
			responsive: true
		}
	});
})();
