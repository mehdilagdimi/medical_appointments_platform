<?php
    Class Slots extends Controller{
        public function __construct(){
            $this->airportModel = $this->model('Airport');
        }

    //default method
        public function index(){
            // session_start();
            if(isset($_SESSION['loggedIn'])){
                if(!$_SESSION['loggedIn']){
                    header("location:" . URLROOT . "logins");
                }
                if($_SESSION['privilege'] == 'admin'){
                    $this->showSlots();
                }
            } else {
                header("location:" . URLROOT . "logins");
            }
            // else {
            //     $this->view('pages/login');
            // }
          
        }
        
        // public function getSlots(){

        // }

        public function showSlots(){
            //display planes
            $Slots = $this->airportModel->getSlots();
            $data = [
                'title' => "List of Slots",
                'Slots' => $Slots
            ];

            if(isset($_SESSION['loggedIn'])){
                if($_SESSION['privilege'] == 'admin'){
                    $this->view('dashboard/showSlots', $data); 
                } else {
                    $this->view('pages/index', $data);
                    // return $data;
                }
             }
            }
         

        public function deleteAirport(){
            if (isset($_POST['delete'])){
                $id = $_POST['id_airport'];
                $this->airportModel->deleteUser($id);
            }
         }
    }

?>