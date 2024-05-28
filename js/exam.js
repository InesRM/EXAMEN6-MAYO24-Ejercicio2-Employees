$(function(){

  console.log($);
}); // Fin de la función anónima que sirve como punto de entrada de jQuery


window.addEventListener("load", function(){
  console.log("Inicio");

  // Creamos un objeto URL para la base de la API de Star Wars
  const baseUrl = new URL('http://localhost/exam/php/getEmployee.php');
  // Agregamos el endpoint para obtener la lista de películas
  const filmsEndpoint = 'films/'; // Elegimos elegimos el path de búsqueda para películas.
  // Creamos una nueva URL con el endpoint de películas
  const filmsUrl = new URL(filmsEndpoint, baseUrl);
  filmsUrl.searchParams.set('search', 'Jedi'); // Fijamos parámetros de búsqueda
  console.log(baseUrl.toString()); // https://swapi.dev/api/films/?search=Jedi

  fetch('./php/getEmployee.php') // Hacer una solicitud GET a la API con la ruta de la película "A New Hope"
  .then(response => response.json()) // Analizar la respuesta JSON
  .then(data => {    
    let results = data.results; // Obtenemos el array de búsqueda  
    console.log(data); // 1. Solamente un único resultado obtenido
  })
  .catch(error => console.error(error)); // Manejar errores    
})

/**
 * El DOM está dividido en 2 partes, por un lado un formulario sobre el cual
 * se recoge una serie de datos de un empleado y por otro disponemos de una tabla
 * dónde mostrar los datos recogidos.
 * Los datos que se solicitan son: Nombre, Apellido, Edad, Puesto de trabajo y Localización
 * Por cada empleado deberemos crear una fila en la tabla con dichos datos, el botón create, en lugar
 * de enviar los datos al servidor se limita a recogerlos y mostrarlos en la tabla utilizando
 * el API de DOM O jQuery. pero sin utilizar la propiedad innerHTML. El botón debe capturar
 * el evento submit y cancelar su envio al servidor.  Una vez recogidos los datos se debe resetear
 * el formulario.  Los datos deben ser validados antes de ser mostrados en la tabla.
 */

$(document).ready(function () {

  $('#create').click(function () {
      // Validar campos
      if (!validateForm()) return;
      
      // Recolectar datos del formulario
      const fullName = $('#validationDefault01').val() + ' ' + $('#validationDefault02').val();
      const age = $('#validationDefault03').val();
      const jobTitle = $('#validationDefault04').val();
      const location = $('#validationDefault05').val();

      // Crear fila en la tabla
      const newRow = `
          <tr>
              <td>${fullName}</td>
              <td>${age}</td>
              <td>${jobTitle}</td>
              <td>${location}</td>
          </tr>
      `;

      // Agregar la fila al cuerpo de la tabla
      $('#results tbody').append(newRow);
  });

  function validateForm() {
      let isValid = true;
      $('input[required]').each(function() {
          if ($(this).val() === '') {
              $(this).addClass('is-invalid');
              isValid = false;
          } else {
              $(this).removeClass('is-invalid').addClass('is-valid');
          }
      });
      return isValid;
  }

  $('#results tbody').on('click', 'tr', function() {
    //Resaltar la fila seleccionada
    $(this).addClass('selected').siblings().removeClass('selected');

    // Obtener los datos de la fila seleccionada y convertir a JSON
    const employeeData = {
        fullName: $(this).find('td').eq(0).text(),
        age: $(this).find('td').eq(1).text(),
        jobTitle: $(this).find('td').eq(2).text(),
        location: $(this).find('td').eq(3).text()
    };
    const employeeJson = JSON.stringify(employeeData, null, 2); //2 espacios de indentación

    // Mostrar los datos en un cuadro de textarea
    $('#selected-employee').val(employeeJson);
  });

  $('#random').click(function() {
    fetch('../php/getEmployee.php')//llamada al script PHP
    .then(response => response.json()) // Analizar la respuesta JSON
    .then(employee => {
      //llenar el formulario con los datos del empleado
      $('#validationDefault01').val(employee.firstname);
      $('#validationDefault02').val(employee.lastname);
      $('#validationDefault03').val(employee.age);
      $('#validationDefault04').val(employee.jobtitle);
      $('#validationDefault05').val(employee.location);
    })
    .catch(error => {
      'Error al obtener datos del empleado aleatorio' ,error;
    }); // Manejar errores
    
  })

  $('#delete').click(function() {
    $('#results tbody .selected').remove();
    $('#selected-employee').val('');
  });

  //envio de datos. El botón send debe recoger los datos, generar un JSON y utilizar el script php/saveEmployee.php 
  //el cual guardará un fichero con el nombre y apellido del empleado y el contenido JSON dentro del directorio tmp.

 //manejar el botón SEND
 $('#send').click(function() {

  // Obtener la fila seleccionada
  const selectedRow = $('#results tbody tr.selected');
  if (selectedRow.length === 0) {
      alert('Por favor selecciona un empleado');
      return;
  }
  const fullName= selectedRow.find('td').eq(0).text();
  const [firstname, lastname] = fullName.split(' '); // Separar nombre y apellido
   
  const employeeData = {
      firstname,
      lastname,
      age: selectedRow.find('td').eq(1).text(),
      jobtitle: selectedRow.find('td').eq(2).text(),
      location: selectedRow.find('td').eq(3).text()
  };
  const employeeJson = JSON.stringify(employeeData);

  fetch('../php/saveEmployee.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'data=' + encodeURIComponent(employeeJson)
  })
  .then(response => response.text())
  .then(message => {
      alert(message);
  })
  .catch(error => {
      alert('Error al guardar el empleado', error);
      console.log('Error al guardar el empleado', error);
  });
  
});


}); // Fin de la función anónima que sirve como punto de entrada de jQuery




