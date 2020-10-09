		<!-- ******CONTENT****** --> 
		<style style="text/css">
		.grid {
	        max-height: 450px;
	        height: auto;
			width: 100%;
	    }
		.ui-grid-header-cell-row {
		    text-align: center;
		}
		div.ui-grid-cell button {
		    font-size: 12px;
		    margin-top: 4% !important;
		}
		
		div.ui-grid-pager-panel {
		    background: #f3f3f3 none repeat scroll 0 0;
		    bottom: 0;
		    left: 0;
		    padding-bottom: opx !important;
		    padding-top: 0px !important;
		}

		.grid-msg-overlay {
		  position: absolute;
		  top: 0;
		  bottom: 0;
		  width: 100%;
		  background: #fff;
		}
		
		.grid-msg-overlay .msg {
			background-color: #fff;
		    border: 1px solid #555;
		    border-radius: 4px;
		    display: table;
		    font-size: 24px;
		    height: 50px;
		    left: 50%;
		    opacity: 1;
		    position: absolute;
		    text-align: center;
		    top: 50px;
		    width: 50px;
		}
		
		.grid-msg-overlay .msg span {
		  display: table-cell;
		  vertical-align: middle;
		}
		.ui-grid-cell span {
			padding-left:1px;
		}		
		</style>
        <div class="content container" ng-controller="AlumniMembersCtrl">
            <div class="page-wrapper">
                <header class="page-heading clearfix">
                    <h1 class="heading-title pull-left">The Alumni Society</h1>
                    <div class="breadcrumbs pull-right">
                        <ul class="breadcrumbs-list">
                            <li class="breadcrumbs-label">You are here:</li>
                            <li><a href="<?php echo $headerData['base_url'];?>member/home">Home</a><i class="fa fa-angle-right"></i></li>
                            <li class="current">Members</li>
                        </ul>
                    </div><!--//breadcrumbs-->
                </header> 
                <div class="page-content">
                    <div class="row page-row">
                        <aside class="page-sidebar col-md-2 col-sm-3 affix-top">                    
                            <section class="widget">
                                <ul class="nav">
                                    <li><a href="<?php echo $headerData['base_url'];?>alumni">Alumni</a></li>
                                    <li class="active"><a href="<?php echo $headerData['base_url'];?>alumni/member">Members</a></li>
                                    <?php if($this->session->userdata('username') == "admin" || $this->session->userdata('username') == "superadmin"){?>
                                    <li><a href="<?php echo $headerData['base_url'];?>alumni/register">Register</a></li>
                                    <?php }?>
                                </ul>                    
                            </section><!--//widget-->
                        </aside><!--//page-sidebar-->
                        
                        <!--content-wrapper-->
                        <div class="content-wrapper col-md-10 col-sm-9">
                       		<div class="grid" ui-grid="gridOptions" ui-grid-auto-resize ui-grid-resize-columns ui-grid-pagination>
		                        <div class="grid-msg-overlay" ng-hide="!loading">
		                          <div class="msg">
		                            <span>
		                              <i class="fa fa-spinner fa-spin white"></i>
		                            </span>
		                          </div>
		                        </div>
		                    </div>                 
                        </div>
                        <!--//content-wrapper-->         
                                  
                    </div><!--//page-row-->
                </div><!--//page-content-->
            </div><!--//page--> 
        </div><!--//content-->
    </div><!--//wrapper-->