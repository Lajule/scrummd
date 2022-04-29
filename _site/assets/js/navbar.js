document.addEventListener('DOMContentLoaded', function (event) {
	const burgers = Array.from(document.querySelectorAll('.navbar-burger'));

	burgers.forEach(burger => {
		burger.addEventListener('click', () => {
			const target = document.getElementById(burger.dataset.target);

			burger.classList.toggle('is-active');
			target.classList.toggle('is-active');
		});
	});
});
