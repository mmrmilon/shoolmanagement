<?php 

class Adminmodel extends CI_Model {
	function __construct(){
		//parent::Model();	
		$this->load->model('myxml');
	}
	
	// Start administrative section
	function GetEventList()
	{
		$sql = "SELECT 
		events.event_id, 
		events.member_id, 
		events.start_date, 
		events.end_date, 
		DATE_FORMAT(events.start_time,'%l.%i%p') AS start_time,
		DATE_FORMAT(events.end_time,'%l.%i%p') AS end_time,
		CONCAT(DATE_FORMAT(events.start_time,'%l.%i%p'),' - ',DATE_FORMAT(events.end_time,'%l.%i%p'))AS time_duration,
		events.event_name, 
		events.event_details, 
		events.event_date, 
		UPPER(member.user_name) 
		FROM `events` 
		INNER JOIN `member` ON `events`.member_id = `member`.member_id 
		ORDER BY `events`.event_id DESC";
		$result=$this->db->query($sql)->result();
		return $result;		
	}
	
	function GetMessageList()
	{
		$sql = "SELECT 
		messages.message_id,
		messages.member_id,
		messages.msg_title,
		messages.msg_details,
		messages.msg_date,
		UPPER(member.user_name) AS msg_from
		FROM `messages`
		INNER JOIN member ON messages.member_id = member.member_id";
		$result=$this->db->query($sql)->result();
		return $result;		
	}
	
	function SaveMessages($message_id, $member_id, $msg_title, $msg_details)
	{
		$data = array(
	        'member_id' => 1,
		    'msg_title' => $msg_title,
		    'msg_details' => $msg_details,
			'msg_date' => date("Y-m-d"),
		);
		
		if($message_id > 0)
		{
			$this->db->where('message_id', $message_id);
			$query = $this->db->update('messages',$data);
		}
		else 
		{
			$query=$this->db->insert('messages', $data);
		}
		if($query)
			return true;
		else
			return false;		
	}
	
	/*End administrative section here ....*/
}
?>