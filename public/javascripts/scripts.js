if (document.querySelector('#new-pet')) {
  document.querySelector('#new-pet')
    .addEventListener('submit', (e) => {
      e.preventDefault();
      // FormData is a built-in JS class that allows us to easily grab all form data
      var form = document.getElementById('new-pet');
      var pet = new FormData(form);

      // Assign form-data headers
      axios.post('/pets', pet, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(function (response) {
          window.location.replate(`/pets/${response.data.pet._id}`);
        })
        .catch(function (error) {
          const alert = document.getElementById('alert')
          alert.classList.add('alert-warning');
          alert.textContent = 'Ruh roh. Something went wrong. Please try again.';
          alert.style.display = 'block';
          setTimeout(() => {
            alert.style.display = 'none';
            alert.classList.remove('alert-warning');
          }, 2500)
        });
    });
}