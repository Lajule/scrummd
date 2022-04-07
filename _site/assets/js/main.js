window.addEventListener('DOMContentLoaded', function (event) {

    function getValue(list, re, defaultValue) {
	    for (const e of list) {
            const groups = re.exec(e.textContent);
            if (groups) {
                return groups[1];
            }
	    }
	    return defaultValue;
    }

    const sprint = document.querySelector('.sprint');
    const from = new Date(sprint.dataset.from);
    const to = new Date(sprint.dataset.to);

    const tickets = Array.from(document.querySelectorAll('.ticket')).map((ticket) => {
	    const ref = ticket.dataset.ref;
        const status = ticket.dataset.status;

	    const h1 = ticket.querySelector('h1');
    	const title = h1 ? h1.textContent : "";

        const pList = ticket.querySelectorAll('p');
    	const storyPoints = getValue(pList, /Story points: (\d+)/i, 0);
    	const assignee = getValue(pList, /Assignee: ([A-Za-z0-9_]+)/i, "");

    	return {ref, status, title, storyPoints, assignee};
    });

    const canvas = document.getElementById('brundown-chart');
    const ctx = canvas.getContext('2d');
    const brundownChart = new Chart(ctx, {
	type: 'bar',
	data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
		label: '# of Votes',
		data: [12, 19, 3, 5, 2, 3],
		backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
		borderWidth: 1
            }]
	},
	options: {
            scales: {
		y: {
                    beginAtZero: true
		}
            }
	}
    });

});
