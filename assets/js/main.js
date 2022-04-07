window.addEventListener('DOMContentLoaded', (event) => {
    const tickets = document.querySelectorAll('.ticket');
    tickets.forEach((ticket) => {
	const ref = ticket.dataset.ref;
	const title = ticket.querySelector('h1').textContent;

	console.log(ref);
	console.log(title);
    });
});
