<!DOCTYPE html>
<html lang="en" ng-app="mewApp">
<head>
 <link rel="icon" 
      type="image/png" 
      href="./images/lem.png" />
  <meta charset="utf-8">
  <title>e-leman</title>
  <link rel="canonical" href="https://api.monnaie-leman.org/" />
  <meta name="description" content="e-leman">
  <meta name="author" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/etherwallet-master.min.css">
  <script type="text/javascript" src="js/etherwallet-static.min.js"></script>
  <script type="text/javascript" src="js/etherwallet-master-min.js"></script>
  
  <script src="cordova.js"></script>
  <script src="js/zlib.js"></script> 
  <script src="js/png.js"></script> 
  <script src="js/jspdf.min.js"></script> 
  <script src="js/standard_fonts_metrics.js"></script>
  
  <link rel="apple-touch-icon" sizes="60x60" href="images/fav/apple-touch-icon-60x60.png">
  <link rel="apple-touch-icon" sizes="76x76" href="images/fav/apple-touch-icon-76x76.png">
  <link rel="apple-touch-icon" sizes="120x120" href="images/fav/apple-touch-icon-120x120.png">
  <link rel="apple-touch-icon" sizes="152x152" href="images/fav/apple-touch-icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="images/fav/apple-touch-icon-180x180.png">
  <link rel="icon" type="image/png" href="images/fav/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="images/fav/favicon-194x194.png" sizes="194x194">
  <link rel="icon" type="image/png" href="images/fav/favicon-96x96.png" sizes="96x96">
  <link rel="icon" type="image/png" href="images/fav/android-chrome-192x192.png" sizes="192x192">
  <link rel="icon" type="image/png" href="images/fav/favicon-16x16.png" sizes="16x16">
  <link rel="manifest" href="images/fav/manifest.json">
  <link rel="shortcut icon" href="images/favicon.ico">
  
  <script type="application/javascript" src="js/fastclick.js"></script> 
  <script type="application/javascript">
	    window.addEventListener('load', function () {
		    FastClick.attach(document.body);
	    }, false);
  </script> 
  <script type="application/javascript">
	    cordova.plugins.Keyboard.disableScroll(true);
  </script>
  
  <!--
  <script src="js/qrcode.js"></script>
  <script src="js/qrscan.js"></script>  
  

  <script src="js/angular-local-storage.js"></script>-->
  
  <meta name="msapplication-TileColor" content="#2e4868">
  <meta name="msapplication-TileImage" content="images/fav/mstile-144x144.png">
  <meta name="msapplication-config" content="images/fav/browserconfig.xml">
  <meta name="theme-color" content="#2e4868">
</head>

<body>
  @@if (site === 'exchangeOffice' ) { <header ng-controller='tabsCtrl' model="5">}
  @@if (site !== 'exchangeOffice' ) { <header ng-controller='tabsCtrl' model="0">}

 
     <a class="glassPaneMenu" ng-show="dropdown" ng-click="dropdown = !dropdown"> </a>
<div style="display:block;height:20px;width:100%;"></div>
  <section class="container bg-gradient">
       <div class="row" >
        <div  style="width:49%; display:inline-block;">
          @@if (site === 'readOnly' ) {<img src="images/icon-view.svg" height="40px" width="auto" /> } 
          <img src="images/etherwallet-logo.png" height="40px" width="auto" />
        </div>
        <div  style="width:49%;display:inline-block;margin-top:3px;">
        
          <span class="dropdown"  style="float:right;color:black;">
          <a href="#" class="dropdown-toggle" ng-click="dropdown = !dropdown" style="color:black;"> {{curLang}} <span class="caret"></span></a>
       

          <ul class="dropdown-menu pos_dropDown" ng-show="dropdown"  id="lg_mn">@@lang</ul>
          
          <!--       
            <li style="display:none;"><a ng-class="{true:'active'}[curLang=='Français']" ng-click="changeLanguage('fr','Français')" >Français</a></li>           
            <li style="display:none;"><a ng-class="{true:'active'}[curLang=='Deutsch']" ng-click="changeLanguage('de','Deutsch')" >Deutsch</a></li>
            <li style="display:none;"><a ng-class="{true:'active'}[curLang=='Italiano']" ng-click="changeLanguage('it','Italiano')" >Italiano</a></li>
            <li style="display:none;"><a ng-class="{true:'active'}[curLang=='English']" ng-click="changeLanguage('en','English')" >English</a></li>  
            -->

          </span>
          <span translate="Version" style="float:right;"></span>
        </div>
       </div>
        
  </section>
  
  
   

  <section class="container nav-container overflowing" >
    <a ng-show="showLeftArrow" class="nav-arrow-left" ng-click="scrollLeft(100);" ng-mouseover="scrollHoverIn(true,2);" ng-mouseleave="scrollHoverOut()">&#171;</a>
    <div class="nav-scroll">
      <nav class="nav-inner">
        @@if (site === 'mew' ) {
        
        <span ng-repeat="tab in tabNames track by $index" class="nav-item" ng-class="{active: $index==activeTab}" 
             
             ng-show="{{tab.mew}}" ng-click="tabClick($index)"> <a title="{{tab.name | translate}}" class="{{tab.cssClass}}" ></a></span>
       }
        @@if (site === 'readOnly' ) {
        
        <span ng-repeat="tab in tabNames track by $index" class="nav-item" ng-class="{active: $index==activeTab}" 
             
             ng-show="{{tab.readOnly}}" ng-click="tabClick($index)"> <a title="{{tab.name | translate}}" class="{{tab.cssClass}}" ></a></span>
       }
        @@if (site === 'exchangeOffice' ) {
        
        <span ng-repeat="tab in tabNames track by $index" class="nav-item" ng-class="{active: $index==activeTab}" 
             
             ng-show="{{tab.exchangeOffice}}" ng-click="tabClick($index)"> <a title="{{tab.name | translate}}" class="{{tab.cssClass}}" ></a></span>
       }
      </nav>
    </div>
    <a ng-show="showRightArrow" class="nav-arrow-right" ng-click="scrollRight(100);" ng-mouseover="scrollHoverIn(false,2);" ng-mouseleave="scrollHoverOut()">&#187;</a>
  </section>

 <div class="modal fade" id="switchPop" tabindex="-1" role="dialog" aria-labelledby="sendTransactionLabel">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      </div>
                      <div class="modal-body">
                          <h4 align="center">
                              <label translate="STR_Lock_wallet_title">Lock</label>
                              <p>
                                <button type="button" class="btn btn-primary"  ng-click="lockWallet()" translate="STR_Lock_wallet">Lock </button>
                              </p>
                              
                              <label translate="STR_Switch_title">Switch</label>
                              <div style="height:350px;overflow-y:scroll;">
                                <table width="95%">
	                               <tr  ng-repeat="wal in other_wallets track by $index" class="tr_trans">
	                                    <td  >
                                        <a ng-click="switchToWallet(wal.address)" style="color:black;">
                                            {{wal.name}}
                                        </a>
                                         </td>
                                         <td  width="100px"  >
                                         <a ng-click="switchToWallet(wal.address)">
                                             <div class="identiconWrapper" style="max-width:60px;">
                                                 <div id="addressIdenticon" title="Address Indenticon" img="1" blockie-address="0x{{wal.address}}"  watch-var="other_wallets" ></div>
                                             </div>
                                             </a>
                                         </td>
	                               </tr>
                                 </table>
                                </div>
                          </h4>
                      </div>
                      <div class="modal-footer text-center">
                          <button type="button" class="btn btn-default" data-dismiss="modal" translate="STR_LockCancel">Annuler </button>
                      </div>
                  </div>
              </div>
        </div>


</header>
 
