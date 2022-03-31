<?php
    class User extends Model{

        private $userRef;
        private $fName;
        private $lName;
        private $bDate;
        private $passw;


        public function __construct(){
            parent::__construct();
            $this->table = 'users';
        }

        public function getUsers(){
            return $this->getTable();
        }
        // public function getPassengers(){
        //     $this->table = 'passengers';
        //     $results = $this->getTable();
        //     $this->table = 'users';
        //     return $results;
        // }

        // public function addPassenger($userID, $volID, $fName, $lName, $birthDate){
        //     $this->table = 'passengers';
        //     $this->db->query("INSERT INTO $this->table (userID, volID, fName, lName, birthDate) VALUES ('$userID', '$volID', '$fName', '$lName', '$birthDate') ");      
        //     $this->db->execute();
        //     $this->id = 'passengerID';
        //     $this->passengerID = $this->getRecordHighestID($this->id);
        //     $this->table = 'users';
        //     return $this->passengerID;
        // }
     
        public function addUser($userRef, $fName, $lName, $birthDate, $passw){    

            $this->db->query("INSERT INTO $this->table (userRef, fName, lName, birthDate, passw) VALUES (:userRef, :fName, :lName, :birthDate, :passw)");
            
            $this->userRef = htmlspecialchars(strip_tags($userRef));
            $this->fName = htmlspecialchars(strip_tags($fName));
            $this->lName = htmlspecialchars(strip_tags($lName));
            $this->bDate = htmlspecialchars(strip_tags($birthDate));
            $this->passw = htmlspecialchars(strip_tags($passw));

            $this->db->bind(':userRef', $userRef);
            $this->db->bind(':fName', $fName);
            $this->db->bind(':lName', $lName);
            $this->db->bind(':birthDate', $birthDate);
            $this->db->bind(':passw', $passw);
            if($this->db->execute()){
                echo json_encode("User added successfully");
                return true;
            } else {
                // printf("Statement Error:", $this->db->error);
                // echo json_encode($this->db->error);
                echo json_encode("Error creating user");
                // return false;
            }
        }

        public function getUser($email, $passw){

                $this->db->query("SELECT * FROM $this->table WHERE email = '$email' AND passw = '$passw' ");
                $result = $this->db->resultSet();
                return $result;
        }

        public function deleteUser($userID){
            $this->db->query("DELETE FROM $this->table WHERE userID='$userID'");
            $this->db->execute();
        }
        public function deletePassenger($id){
            $this->table = 'passengers';
            $this->db->query("DELETE FROM $this->table WHERE passengerID='$id'");
            $this->db->execute();
            $this->table = 'users';

        }
    }
?> 
