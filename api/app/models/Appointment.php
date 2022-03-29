<?php
    require_once ('Slot.php');

    Class Appointment extends Model{

        public function __construct(){
            parent::__construct();
            // $this->table = 'reservs';
            $this->table = 'appointments';
            // $this->view = 'Appointments';
        }
        
        public function getReservs(){
            // return $this->getTable();
            // $id = 'reservID';
            $c = "dateReserv";
            // echo $this->table;
            $this->table = 'Appointments';
            return $this->getTableOrder($c);
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