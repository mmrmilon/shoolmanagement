		<!-- ******CONTENT****** --> 
		<style style="text/css">
			.form-group {
			    margin-left: 0px !important;
			    margin-right: 0px !important;
			}
			.form-group {
			    margin-bottom: 15px;
			}
			.modal-footer {
			    border-top: 1px solid #e5e5e5;
			    padding: 15px 15px 15px 0px !important;
			    text-align: left !important;
			}			
		</style>
		
        <div class="content container" ng-controller="NewsCtrl">
            <div class="page-wrapper">
                <header class="page-heading clearfix">
                    <h1 class="heading-title pull-left">News&nbsp;(&nbsp;<a href="javascript:void(0)" ng-click="load()"><i class="fa fa-refresh"></i></a>&nbsp;)</h1>
                    <div class="breadcrumbs pull-right">
                        <ul class="breadcrumbs-list">
                            <li class="breadcrumbs-label">You are here:</li>
                            <li><a href="<?php echo $headerData['base_url'];?>home">Home</a><i class="fa fa-angle-right"></i></li>
                            <li class="current">News</li>
                        </ul>
                    </div><!--//breadcrumbs-->
                </header> 
                <div class="page-content">
                	<div class="row page-row">
                        <div class="events-wrapper col-md-7 col-sm-6">  
                        	<article class="news-item page-row has-divider clearfix row" ng-repeat="row in newslist">       
                                <figure class="thumb col-md-2 col-sm-3 col-xs-4">
                                    <img ng-if="row.news_photo !='' " class="img-responsive" src="<?php echo $headerData['assets'];?>images/news/{{row.news_photo}}" alt="">
                                    <img ng-if="row.news_photo =='' " class="img-responsive" src="<?php echo $headerData['assets'];?>images/news/no_image_available.jpg" alt="">
                                </figure>
                                <div class="details col-md-10 col-sm-9 col-xs-8">
                                    <h3 class="title">{{row.head_line}}&nbsp;<a href="javascript:void(0)" ng-click="edit(row)"><i class="fa fa-pencil-square"></i></a></h3>
                                    <p class="text-justify">{{ row.details | limitTo: 200 }}{{row.details.length > 200 ? '...' : ''}}</p>
                                </div>
                            </article><!--//news-item-->                         
                        </div><!--//events-wrapper-->
                        
                        <aside class="page-sidebar col-md-5 col-sm-6">                    
                            <article class="contact-form page-row">
                        		<form role="form" name="frmNews" class="form-horizontal" ng-submit="news.save()">
	                            	<div class="row">
	                            		<div class="col-xl-12 col-md-12 col-sm-5">      
			                                <div class="form-group event_name">
			                                    <label for="event_name">News Head Line</label>
			                                    <input id="event_name" type="text" ng-model="NewsEntity.head_line" class="form-control" placeholder="Enter your event name" required>
			                                </div>
			                                
			                                <div class="form-group event_details">
			                                    <label for="event_details">News Details</label>
			                                    <textarea id="event_details" ng-model="NewsEntity.details" rows="15" class="form-control" placeholder="Enter your event details" required></textarea>
			                                </div>
	                            		</div>
	                            	</div>
	                                <!--//form-group-->
	                                <div class="modal-footer">
										<button type="submit" class="btn btn-theme"><i class="fa fa-check"></i> Submit</button>
									</div>
	                            </form>                  
	                        </article>
                        </aside>
                    </div>
                </div><!--//page-content-->
            </div><!--//page--> 
        </div><!--//content-->
    </div><!--//wrapper-->