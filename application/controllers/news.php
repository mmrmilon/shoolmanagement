<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class News extends CI_Controller {
	private $custUrl = 'news/';
	private $headerUrl = 'news/';
	private $footerUrl = 'member/';
		
	public function __construct(){
	    parent::__construct();	      
	    $this->load->helper('form');
    	$this->load->helper('url');
    	
	    $this->load->model('headmodel');
		$this->load->model('newsmodel');
		$this->load->model('eventmodel');
		$this->load->model('loginmodel');
		$this->load->model('custdatabase');	
		$this->load->model('mycurl');
		
		// Check Login Information From The Session
	    //$this->headmodel->loginCheck();
	}
	
	public function index()
	{
		$header_data = array();
		$header_data['page'] = 'News';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		
		$header_data['newslist'] = $this->newsmodel->GetNewsList();
		$header_data['eventlist'] = $this->eventmodel->GetTopFiveEvent();
		
		$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
		$output .= $this->load->view($this->custUrl.'news',$header_data,true); 
		$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);           
		$this->output->set_output($output);
	}
	
	public function details($news_id)
	{
		$news_id = ($news_id > 0? $news_id: 0);
		$header_data = array();
		$header_data['page'] = 'News';
		$header_data['headerData'] = $this->headmodel->getHeaderData();
		
		$header_data['newsdetails'] = $this->newsmodel->GetNewsDetailsById($news_id);
		$header_data['newslist'] = $this->newsmodel->GetTopFiveNews();
		$header_data['eventlist'] = $this->eventmodel->GetTopFiveEvent();
		
		$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
		$output .= $this->load->view($this->custUrl.'newsdetails',$header_data,true); 
		$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);         
		$this->output->set_output($output);
	}
	
	public function addnews()
	{
		if(($this->session->userdata('logged_in')==true) && ($this->session->userdata('id') != ""))
		{
			$header_data = array();
			$header_data['page'] = 'Add News';
			$header_data['headerData'] = $this->headmodel->getHeaderData();
			$output = $this->load->view($this->headerUrl.'header',$header_data,true); 	
			$output .= $this->load->view($this->custUrl.'addnews',$header_data,true); 
			$output .= $this->load->view($this->footerUrl.'footer',$header_data,true);           
			$this->output->set_output($output);
		}
		else
		{
			redirect(config_item('base_url').'login');
		}
	}
	
	
	public function GetNewsList(){	
	    $data = $this->newsmodel->GetNewsList();
	    echo json_encode($data);    
	}
		
	public function SaveNews(){
	    $get=file_get_contents('php://input');
	    $json_get=json_decode($get);
	    foreach ($json_get as $row)
	    { 
	        $news_id = $row->news_id;
	        $head_line = $row->head_line;
		    $details = $row->details;
		    $news_photo = $row->news_photo;
		    $post_on = $row->post_on;
	    }
			
	    $data = array(
	    	'news_id' => $news_id,
		    'member_id' => $this->session->userdata('id'),
		    'head_line' => $head_line,
		    'details' => $details,
	    	'news_photo' => $news_photo,
		    'post_on' => $post_on
		);
	    
	    $data = $this->newsmodel->SaveNews($news_id, $data);
	    echo json_encode($data);
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */