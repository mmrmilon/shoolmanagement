      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
       <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1><i class="fa fa-dashboard"></i>&nbsp;Dashboard</h1>
          <ol class="breadcrumb">
            <li><a href="<?php echo $headerData['base_url'];?>member/home"><i class="fa fa-home"></i> Home</a></li>
            <li class="active">Dashboard</li>
          </ol>
        </section>

        <!-- Main content -->
        <section class="content">
          <!-- Small boxes (Stat box) -->
          <div class="row">
            <div class="col-lg-3 col-xs-6">
              <!-- small box -->
              <div class="small-box bg-aqua">
                <div class="inner">
                  <h3>8</h3>
                  <p>Guardian Came Today</p>
                </div>
                <div class="icon">
                  <i class="ion ion-bag"></i>
                </div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div><!-- ./col -->
            <div class="col-lg-3 col-xs-6">
              <!-- small box -->
              <div class="small-box bg-green">
                <div class="inner">
                  <h3>97<sup style="font-size: 20px">%</sup></h3>
                  <p>Student Present Today</p>
                </div>
                <div class="icon">
                  <i class="ion ion-stats-bars"></i>
                </div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div><!-- ./col -->
            <div class="col-lg-3 col-xs-6">
              <!-- small box -->
              <div class="small-box bg-yellow">
                <div class="inner">
                  <h3>19</h3>
                  <p>Teacher Present Today</p>
                </div>
                <div class="icon">
                  <i class="ion ion-person-add"></i>
                </div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div><!-- ./col -->
            <div class="col-lg-3 col-xs-6">
              <!-- small box -->
              <div class="small-box bg-red">
                <div class="inner">
                  <h3>11</h3>
                  <p>Total Visitors, 2015</p>
                </div>
                <div class="icon">
                  <i class="ion ion-pie-graph"></i>
                </div>
                <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
              </div>
            </div><!-- ./col -->
          </div><!-- /.row -->
          <!-- Main row -->
          <div class="row">
            <!-- Left col -->
            <section class="col-lg-7 connectedSortable">
              <!-- Custom tabs (Charts with tabs)-->
              <div class="nav-tabs-custom">
                <!-- Tabs within a box -->
                <ul class="nav nav-tabs pull-right">
                  <li class="active"><a href="#ssc-chart" data-toggle="tab">SSC RESULT</a></li>
                  <li><a href="#jsc-chart" data-toggle="tab">JSC RESULT</a></li>
                  <li class="pull-left header"><i class="fa fa-inbox"></i> Last 5 Years Result</li>
                </ul>
                <div class="tab-content no-padding">
                  <!-- Morris chart - Sales -->
                  <!-- <div class="chart tab-pane active" id="ssc-chart" style="position: relative; height: 300px;"></div>
                  <div class="chart tab-pane" id="jsc-chart" style="position: relative; height: 300px;"></div> -->
                  <div class="chart tab-pane active" id="ssc-chart" style="position: relative; height: 300px;"></div>
                  <div class="chart tab-pane" id="jsc-chart" style="position: relative; height: 300px;"></div>
                </div>
              </div><!-- /.nav-tabs-custom -->

              <!-- Chat box -->
              <div class="box box-success">
                <div class="box-header">
                  <i class="fa fa-leanpub"></i>
                  <h3 class="box-title">LATEST NEWS</h3>
                </div>
                <div class="box-body chat" id="chat-box">
                  <!-- chat item -->
                  <div class="item">
                    <img src="<?php echo $headerData['assets'];?>dist/img/mizan-160x160.png" alt="user image" class="online"/>
                    <p class="message">
                      <a href="#" class="name">
                        <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 2:15</small>
                        Administrative Assistant
                      </a>
                      In High School section (Class VI to Class X) Bengali, English, Math, Physics, Chemistry, Biology, Religion, Social Science, General Science, Art & other cultural subjects will be additional subjects.
                    </p>
                  </div><!-- /.item -->
                  <!-- chat item -->
                  <div class="item">
                    <img src="<?php echo $headerData['assets'];?>dist/img/mizan-160x160.png" alt="user image" class="offline"/>
                    <p class="message">
                      <a href="#" class="name">
                        <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 5:15</small>
                        Administrative Assistant
                      </a>
                      In High Section (Class VI to Class X) for S.S.C. we offer Science & Humanities.
                    </p>
                  </div><!-- /.item -->
                  <!-- chat item -->
                  <div class="item">
                    <img src="<?php echo $headerData['assets'];?>dist/img/mizan-160x160.png" alt="user image" class="offline"/>
                    <p class="message">
                      <a href="#" class="name">
                        <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 5:30</small>
                        Administrative Assistant
                      </a>
                      Ability is what you're capable of doing. Motivation determines what you do. Attitude determines how well you do it.
                    </p>
                  </div><!-- /.item -->
                  <!-- chat item -->
                  <div class="item">
                    <img src="<?php echo $headerData['assets'];?>dist/img/mizan-160x160.png" alt="user image" class="offline"/>
                    <p class="message">
                      <a href="#" class="name">
                        <small class="text-muted pull-right"><i class="fa fa-clock-o"></i> 5:30</small>
                        Administrative Assistant
                      </a>
                      A number of Students are not getting marks up to satisfactory level. 
                      This is because they are not enough meritorious or enough to afford teachers teach within the scheduled class time. 
                      If these students get more teaching support after completing their class, they may improve themselves. 
                      If we give more times to understand their study then this problem would be resolved and they will come into the range of up to marks.
                    </p>
                  </div><!-- /.item -->
                </div><!-- /.chat -->
              </div><!-- /.box (chat box) -->              
            </section><!-- /.Left col -->
            
            <!-- right col (We are only adding the ID to make the widgets sortable)-->
            <section class="col-lg-5 connectedSortable">
              <!-- Calendar -->
              <div class="box box-solid bg-green-gradient">
                <div class="box-header">
                  <i class="fa fa-calendar"></i>
                  <h3 class="box-title">Calendar</h3>
                  <!-- tools box -->
                  <div class="pull-right box-tools">
                    <!-- button with a dropdown -->
                    <div class="btn-group">
                      <button class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bars"></i></button>
                      <ul class="dropdown-menu pull-right" role="menu">
                        <li><a href="#">Add new event</a></li>
                        <li><a href="#">Clear events</a></li>
                        <li class="divider"></li>
                        <li><a href="#">View calendar</a></li>
                      </ul>
                    </div>
                    <!-- 
                    <button class="btn btn-success btn-sm" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    <button class="btn btn-success btn-sm" data-widget="remove"><i class="fa fa-times"></i></button>
                     -->
                  </div><!-- /. tools -->
                </div><!-- /.box-header -->
                <div class="box-body no-padding">
                  <!--The calendar -->
                  <div id="calendar" style="width: 100%"></div>
                </div><!-- /.box-body --
                
                <div class="box-footer text-black">
                  <div class="row">
                    <div class="col-sm-6">
                      <!-- Progress bars --
                      <div class="clearfix">
                        <span class="pull-left">Task #1</span>
                        <small class="pull-right">90%</small>
                      </div>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-green" style="width: 90%;"></div>
                      </div>

                      <div class="clearfix">
                        <span class="pull-left">Task #2</span>
                        <small class="pull-right">70%</small>
                      </div>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-green" style="width: 70%;"></div>
                      </div>
                    </div><!-- /.col --
                    <div class="col-sm-6">
                      <div class="clearfix">
                        <span class="pull-left">Task #3</span>
                        <small class="pull-right">60%</small>
                      </div>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-green" style="width: 60%;"></div>
                      </div>

                      <div class="clearfix">
                        <span class="pull-left">Task #4</span>
                        <small class="pull-right">40%</small>
                      </div>
                      <div class="progress xs">
                        <div class="progress-bar progress-bar-green" style="width: 40%;"></div>
                      </div>
                    </div><!-- /.col --
                  </div><!-- /.row --
                </div> -->
              </div><!-- /.box -->

            </section><!-- right col -->
          </div><!-- /.row (main row) -->

        </section><!-- /.content -->
      </div>
      <!-- /.content-wrapper -->