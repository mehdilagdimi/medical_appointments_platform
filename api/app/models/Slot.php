<?php
    class Slot extends Model{
        public function __construct(){
            parent::__construct();
            $this->table = 'Slots';
        }

        

        public function getSlots(){
            return $this->getTable();
        }

        public function getSlotID($Slot){
            $this->db->query("SELECT * FROM $this->table WHERE SlotAdress='$Slot'");
            // $this->db->query("SELECT SlotID FROM $this->table WHERE SlotAdress='$Slot'");
            // $id = $this->db->single();
            //return $id;
            $record = $this->db->single();
            return $record->SlotID;
         }

        public function deleteSlot($SlotID){
            $this->db->query("DELETE FROM $this->table WHERE SlotID='$SlotID'");
            $this->db->execute();
         }
        
         
    }
    
?>