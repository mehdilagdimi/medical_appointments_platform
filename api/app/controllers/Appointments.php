<?php
     header("Access-Control-Allow-Origin: *");
     header("Content-Type: application/json");
     header("Access-Control-Allow-Methods: GET, POST");
     header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

    require_once "Slots.php";
    class Appointments extends Controller{
        private $userRef;
        public $slot;
        public $slotid;
        public $startTime;
        public $apptmntDate;

        public function __construct (){
            $this->apptmntModel = $this->model('Appointment');
            $this->slotModel = $this->model('Slot');
        }

        public  $userAppointments = [];

        //default
        public function index($id){
            $this->display($id);
        }
           

        public function display($id = null){
            // $data = json_decode(file_get_contents("php://input"));

            // echo json_encode($id);
            // return; 
            $this->userRef = $id;
            $apptmnts = $this->apptmntModel->getApptmnts($this->userRef);

            if($apptmnts){
                foreach($apptmnts as $apptmnt){
                    $apptmnt->starttime = $this->slotModel->getSlot($apptmnt->slotid);
                    // echo json_encode($apptmnt->starttime);
                }
                echo json_encode($apptmnts);
            }
            else {
                // echo json_encode($id);
                // echo json_encode($apptmnts);
                echo json_encode(array("msg" => "User has not made any appoinment"));
            }

        }

        public function getReserved($date){
            

        }

        public function makeAppointment(){

        $data = json_decode(file_get_contents("php://input"));

        if($data) {
            $this->userRef = $data->userRef;
            $this->slot = $data->slot;
            $this->apptmntDate = $data->apptmntDate;

            $result = $this->apptmntModel->addAppointment($this->userRef,  $this->slot, $this->apptmntDate);
            if($result === 1){
                echo json_encode(array("msg" => "Appointment added successfully", "userRef" => $this->userRef));
            } else if(!$result) {
                echo json_encode(array("msg" => "Appointment already exists", "userRef" => $this->userRef));
            } else if($result === -1) {
                echo json_encode(array("msg"=>"Error creating appointment", "userRef" => $this->userRef));
            }

        } else {
            echo json_encode("No data has been received from frontend");
        };            
            
        }
    }
?>