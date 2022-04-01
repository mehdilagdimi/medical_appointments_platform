<?php
    require_once ('Slot.php');

    Class Appointment extends Model{
        public $slotId;
        public $apptmntDate;
        private $userRef;
        public $createdAt;

        public function __construct(){
            parent::__construct();
            // $this->table = 'reservs';
            $this->table = 'appointments';
            // $this->view = 'Appointments';
        }
        
        public function getApptmnts($id){
            $this->userRef = $id;
            $c = "apptmntDate";
            $this->table = 'appointments';
            $data = $this->getTableOrder($this->userRef, $c, 'ASC');
            if($this->db->rowCount() > 0) {
                return $data;
            } else {
                return false;
            }
        }

        public function getUserReservs($id, $c){
            $this->table = 'Appointments';
            $orderBy = "dateReserv";
            // $this->getTableOrder($id);
            $result = $this->getSpecific($id, $c, $orderBy);
            $this->table = 'reservs';
            return $result;
        }

        // public function deleteReserv($reservID){
        //     // $reservID = $_POST['id_user'];
        //     $this->db->query("DELETE FROM $this->table WHERE reservID='$reservID'");
        //     $this->db->execute();
        // }

        public function addAppointment($passengerID, $goingComing, $seatNum){
            // echo $this->table;
            $this->db->query("INSERT INTO $this->table (passengerID, goingComing, seatNum) VALUES ('$passengerID','$goingComing', '$seatNum') ");
            $this->db->execute();
        }

        public function updateReserv($reservID, $passengerID, $goingComing, $seatNum){     
            $this->db->query("UPDATE $this->table SET passengerID ='$passengerID', goingComing='$goingComing', seatNum='$seatNum' WHERE reservID='$reservID'");
            $this->db->execute();
        } 

    }
    
?>