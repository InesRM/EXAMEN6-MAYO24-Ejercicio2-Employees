<?php

header("Content-type: text/plain");

class Employee {
    
    public $firstname;
    public $lastname;
    public $age;
    public $jobtitle;
    public $location;

    public function __construct($firstname, $lastname, $age, $jobtitle, $location) {
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->age = $age;
        $this->jobtitle = $jobtitle;
        $this->location = $location;
    }

    public function __destruct() {
    }
}

$emp = null;
$random = rand(1, 5);
switch ($random) {
    case 1:
        $emp = new Employee("Sean", "Guzman", 25, "Web Designer", "San Francisco");
        break;
    case 2:
        $emp = new Employee("Keith", "Carter", 20, "Graphic Designer", "New York, NY");
        break;
    case 3:
        $emp = new Employee("Austin", "Medina",	32,	"Photographer",	"New York");
        break;
    case 4:
        $emp = new Employee("Vincent", "Williamson", 31, "iOS Developer", "Washington");
        break;
    case 5:
        $emp = new Employee("Joseph", "Smith", 27, "Project Manager", "Somerville, MA");
        break;
    default:
        $emp = new Employee("Joseph", "Smith", 27, "Project Manager", "Somerville, MA");
}

$myJSON = json_encode($emp);
echo $myJSON;
?>