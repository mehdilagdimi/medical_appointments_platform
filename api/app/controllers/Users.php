<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

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
        public function index($params = []){
           $this->signup($params);
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

        public function deletePassenger(){
            if (isset($_POST['cancel']) || isset($_POST['delete'])){
                $id = $_POST['id_passenger'];
                $this->userModel->deletePassenger($id);
            }
            header("location:" . URLROOT . "reservations");
        }
        public function signup($params = []){
     
                $data = json_decode(file_get_contents("php://input"));
                // echo $data;
                // die();
                if($data) {
                    $this->fName = strtoupper($data->fName);
                    $this->lName = strtoupper($data->lName);
                    $this->bDate = $data->birthDate;
                    $this->passw = $data->passw;
    
                    // $this->passw = hashFunction('sha256', $_POST['passw']);
                    $this->passw = hashFunction('sha256', $this->passw);

                    // echo(json_encode($this->fName));
                    // echo($this->lName);
                    // echo($this->bDate);
                }
              
                // echo "hello";
                // return;
              
                //create user reference
                $strToHash = "$this->fName" . "$this->lName" . "$this->bDate";       
                $this->userRef = hashFunction('md5', $strToHash);
                // echo $this->userRef; 

                $this->userModel->addUser($this->userRef, $this->fName, $this->lName, $this->bDate,  $this->passw);
            // }

            // $this->view('pages/login');
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