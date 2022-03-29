<?php

    function hashFunction  ($algo, $data) {
        return hash($algo, $data);
    }

    class Users extends Controller{
        private $userRef;
        private $fName;
        private $lName;
        private $bDate;
        private $passw;


        public function __construct(){
            $this->userModel = $this->model('User');
        }

        //call showUsers because index is set up as default method so to make showUsers as default when requesting from Users class
        public function index(){
            // echo 'test new';
            // session_start();
            if(isset($_SESSION['loggedIn'])){
                if(!$_SESSION['loggedIn']){
                    header("location:" . URLROOT . "logins");
                }
                if($_SESSION['privilege'] == 'admin'){
                    $this->showUsers();
                }
            } else {
                header("location:" . URLROOT . "logins");
            }
        }


        public function showUsers(){
            $users = $this->userModel->getUsers();
            $data = [
                'title' => 'List of registered users',
                'users' => $users
            ];
            
            // $this->view('users/showUsers', $data);
            $this->view('dashboard/showUsers', $data);
        }

        protected function setPassword(){
            //
        }

        public function deletePassenger(){
            if (isset($_POST['cancel']) || isset($_POST['delete'])){
                $id = $_POST['id_passenger'];
                $this->userModel->deletePassenger($id);
            }
            header("location:" . URLROOT . "reservations");
        }
        public function signup(){
            // session_start();
            // // session_unset();
            // session_destroy();
            // session_start();

            if(isset($_POST['fName']) & isset($_POST['lName']) & isset($_POST['birthdate'])){
                // echo $_POST['fName'];
                $this->fName = strtoupper($_POST['fName']);
                $this->lName = strtoupper($_POST['lName']);
                $this->bDate = strtoupper($_POST['birthdate']);
                
                if(isset($_POST['passw'])){
                    $this->passw = hashFunction('sha256', $_POST['passw']);
            
                }

                //create user reference
                $strToHash = "$this->fName" . "$this->lName" . "$this->bDate";       
                $this->userRef = hashFunction('md5', $strToHash);
                // echo $this->userRef; 

                $this->userModel->addUser($this->userRef, $this->fName, $this->lName, $this->bDate,  $this->passw);
            }

            $this->view('pages/login');
         }

         public function deleteUser(){
            if (isset($_POST['delete'])){
                $id = $_POST['id_user'];
                $this->userModel->deleteUser($id);
            }
         }
        // public function showGuests()
        // public function showGuests(){
        //     //??
        // }
        // public function tste($id)
        // {
        //     echo $id[0];
        //     echo "<br>";
        //     echo $id[1];
        //     // echo $id;
          
        //     return;
        // }
    }
?>