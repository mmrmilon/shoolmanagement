		<!-- ******CONTENT****** --> 
		<style>
		.fusioncharts-container{
			border-left: 1px solid #f5f5f5 !important;
			/*border-top: 1px solid #f5f5f5 !important;*/
		}
		</style>
        <div class="content container" ng-controller="AlumniCtrl">
            <div class="page-wrapper">
                <header class="page-heading clearfix">
                    <h1 class="heading-title pull-left">The Alumni Society</h1>
                    <div class="breadcrumbs pull-right">
                        <ul class="breadcrumbs-list">
                            <li class="breadcrumbs-label">You are here:</li>
                            <li><a href="<?php echo $headerData['base_url'];?>member/home">Home</a><i class="fa fa-angle-right"></i></li>
                            <li class="current">Alumni</li>
                        </ul>
                    </div><!--//breadcrumbs-->
                </header> 
                <div class="page-content">
                    <div class="row page-row">
                        <aside class="page-sidebar col-md-2 col-sm-3 affix-top">                    
                            <section class="widget">
                                <ul class="nav">
                                    <li class="active"><a href="<?php echo $headerData['base_url'];?>alumni">Alumni</a></li>
                                    <li><a href="<?php echo $headerData['base_url'];?>alumni/member">Members</a></li>
                                    <?php if($this->session->userdata('username') == "admin" || $this->session->userdata('username') == "superadmin"){?>
                                    <li><a href="<?php echo $headerData['base_url'];?>alumni/register">Register</a></li>
                                    <?php }?>
                                </ul>                    
                            </section><!--//widget-->
                        </aside><!--//page-sidebar-->
                        
                        <!--content-wrapper-->
                        <div class="content-wrapper col-md-10 col-sm-9">
                        	<!-- <div fusioncharts width="1000" height="400" type="column3d" dataSource="{{myDataSource}}" ></div> -->
                        	<div style="border: 1px solid #f5f5f5; width: 100%;">
								<fusioncharts width="900" height="600" type="pie3d" datasource="{{myDataSource}}"></fusioncharts>
							</div>                      	                         
                        </div>
                        <!--//content-wrapper-->
                                         
                    </div><!--//page-row-->
                </div><!--//page-content-->
            </div><!--//page--> 
        </div><!--//content-->
    </div><!--//wrapper-->