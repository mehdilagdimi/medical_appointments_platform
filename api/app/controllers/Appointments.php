<?php
     header("Access-Control-Allow-Origin: *");
     header("Content-Type: application/json");
     header("Access-Control-Allow-Methods: GET, POST");
     header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

    require_once "Slots.php";
    class Appointments extends Controller{
        private $userRef;

        public function __construct (){
            $this->apptmntModel = $this->model('Appointment');
            $this->userModel = $this->model('User');
        }

        public  $userAppointments = [];

        //default
        public function index($id){
            $this->display($id);
        }
           

        public function display($id){
            // $data = json_decode(file_get_contents("php://input"));
            $this->userRef = $id;
            if($apptmnts = $this->apptmntModel->getApptmnts($this->userRef)){
                echo json_encode($apptmnts);
            }
            else {
                echo json_encode("User has not made any appoinment");
            }
            
            // if($data) {
            //     $this->fName = strtoupper($data->fName);
            //     $this->lName = strtoupper($data->lName);
            //     $this->bDate = $data->birthDate;
            //     $this->passw = $data->passw;

            //     // $this->passw = hashFunction('sha256', $_POST['passw']);
            //     $this->passw = hashFunction('sha256', $this->passw);

            //     // echo(json_encode($this->fName));
            //     // echo($this->lName);
            //     // echo($this->bDate);
            // }
        }

        public function addReservation(){
     
            if(isset($_SESSION["privilege"]) && isset($_POST['addReservation']) ){
                if($_SESSION["privilege"] == 'user'){

                    if($_POST['type'] == 'roundTrip'){
                        // if($_SESSION['roundTrip'] == 'going'){
                            // $roundT = $_SESSION['roundTrip'] = true;
                            $roundT = true;
                        // }
                    } else {
                        // $_SESSION['roundTrip'] = false;
                        $roundT = false;
                    }  
                   
                    //verify availabel seats
                    $volID = $_POST['volID'];
                    $flight = $this->flightModel->getSpecific('volID', $volID, "volID");
                    $availableSeats[0] = $flight[0]->availableSeats;
                   

                    if($roundT){
                        $volIDReturn = $_POST['volIDReturn'];
                        $flightReturn = $this->flightModel->getSpecific('volID', $volIDReturn, "volID");
                        $availableSeats[1] = $flightReturn[0]->availableSeats;
                    }


                    // $numOfReserv = 1; //default is one, otherwise it is dependant on how many reservation the user wants to book
                    $numOfReserv = count($_POST['fName']);  //get number of passengers to be added

                    // echo $flight[0]->availableSeats;
                    foreach($availableSeats as $s){
                        if($s < $numOfReserv){
                            if($s == 0){
                                echo "No seat is available on this flight. Choose another one";
                                $_POST = [];
                                return;
                            }
                            else {
                                // echo "Only $s seats are available on this flight. $s Appointments will be created";
                                return; 
                            }
                        }
                    }
                    
                    // echo "hello";
                    // echo $volID;
                    for($i = 0; $i <  $numOfReserv; $i++){
                            $userID = $_SESSION['userID']; // set this when logging in => change logins controller
                            // $volID = $_POST['volID'];
                            $fName = $_POST['fName'][$i];
                            $lName =  $_POST['lName'][$i];
                            $birthDate = $_POST['birthDate'][$i];
                            $seatNum = $_POST['seatNumG'][$i];
                            // $goingComing =  $_POST['goingComing'] = 'going'; //default value change it dynamically according to form
                            $goingComing = 'going';
                            // echo "testing going coming POST" . $_POST['goingComing'];

                            // if($_POST['type'] == 'roundTrip'){
                            //     // if($_SESSION['roundTrip'] == 'going'){
                            //         $_SESSION['roundTrip'] = true;
                            //     // }
                            // } else {
                            //     $_SESSION['roundTrip'] = false;
                            // }                
                            
                            $this->flightModel->updateSeatNum($volID, $availableSeats[0] - 1);
                            $passengerID = $this->userModel->addPassenger($userID, $volID, $fName, $lName, $birthDate);
                            $this->reservModel->addReservation($passengerID, $goingComing, $seatNum); 

                            if($roundT){
                                $seatNum = $_POST['seatNumC'][$i];
                                $goingComing = 'coming'; 
                                $this->flightModel->updateSeatNum($volIDReturn, $availableSeats[1] - 1);
                                $passengerIDRet = $this->userModel->addPassenger($userID, $volIDReturn, $fName, $lName, $birthDate);
                                $this->reservModel->addReservation($passengerIDRet, $goingComing, $seatNum);
                            }
                                      
                    }
                        // $airportID = $this->airportModel->getAirportID($airportTO);
                        // $this->flightModel->addDestination($volID, $airportID);
            }
            $_POST = [];
            
            header("location:" . URLROOT ."Appointments/showAppointments");
            // $this->setReadableData();
          
            }
        }
    }
?>