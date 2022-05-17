(function() {
	const sprint = document.querySelector('.sprint');
	const tickets = sprint.querySelectorAll('.ticket');
	const search = document.getElementById('search');

	const idx = lunr(function () {
		this.field('title')
	    	this.field('content')

		tickets.forEach(ticket => {
			this.add({
				"id": ticket.dataset.ref,
				"title": ticket.querySelector('.title').textContent,
				"content": ticket.querySelector('.content').textContent,
			});
		});
	});

	search.addEventListener('change', function() {
		const results = idx.search(search.value);
		console.log(results);
	}, false);
})();
