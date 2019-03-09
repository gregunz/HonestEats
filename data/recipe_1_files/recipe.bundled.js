//
// source/angular/controllers/madeItModalCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_controllers_made_it_modal",["$scope","$window","datalayerEvent","perishableLocalstorage","arLogin","ar_services_photoupload","$rootScope","$document","ar_services_review_rating","ar_services_user","ngDialog","ar_services_environment","ar_services_file_reader",function(c,d,o,t,j,g,b,a,h,i,s,e,f){var v=function(x){c.ngDialogData.userReview.inProgressReview.rating=x;
var w=function(z){var y=z<=x?"rate-star-single star-rating":"rate-star-single";return y};c.ngDialogData.userReview.inProgressReview.styleStar1=w(1);
c.ngDialogData.userReview.inProgressReview.styleStar2=w(2);c.ngDialogData.userReview.inProgressReview.styleStar3=w(3);c.ngDialogData.userReview.inProgressReview.styleStar4=w(4);
c.ngDialogData.userReview.inProgressReview.styleStar5=w(5)};v(c.ngDialogData.userReview.inProgressReview.rating||0);c.photoUploadData={dataUrl:"",style:null,selectedFile:null,hasUploadedPhoto:false};
c.madeIt={madeCount:0,totalRecipeMadeCount:0};c.allDoneEnabled=true;c.isUploadPhotoSection=true;c.init=function(){c.rateReview=true;
c.madeIt={madeCount:c.ngDialogData.madeCount,totalRecipeMadeCount:c.ngDialogData.totalRecipeMadeCount}};c.modalConfirm=function(){if(c.allDoneEnabled){n()
}};var n=function(){c.confirm()};var p=function(w){var x=w[0];m();if(x.size>20971520){c.$emit("notify","Photo must be less than 20MB in size.",null,"failure");
return}f.readAsDataUrl(w[0],c).then(function(z){c.userSelectedPhoto=z});var y={template:e.scriptServerUrl+"assets/source/angular/templates/PhotoUploadModal.html",className:"ngdialog-theme-default",scope:c};
y.scope.description=null;c.showMakeProfile=false;s.openConfirm(y).then(function(z){g.uploadPhoto({userId:j.userId,recipeId:c.ngDialogData.userReview.recipeId,description:z.description,file:x,recipeType:"Recipe"}).then(r,q)
})};c.onFileSelect=p;var k=function(y,x){o.push("rate/photo flow: photo upload",y,"Action Complete");var w={category:"Recipe",contentType:"Recipe",contentCmsId:y,linkedCmsId:x,contentSource:c.ngDialogData.recipeSponsorId,label:(c.ngDialogData.segmentLabelPrefix||"")+"Recipe Photo Submitted"};
d.segmentAnalytics.track("Recipe Photo Submitted",w)};var r=function(w){c.photoData=w;k(c.ngDialogData.userReview.recipeId,w.photoId);
c.confirm();u()};var q=function(w){c.$emit("notify",w,null,"failure");c.allDoneEnabled=true};c.$on("onPhotoUpload",function(w,x){c.madeItPhotoURL=x;
c.photoUploadData.hasUploadedPhoto=true});var m=function(){a.find("[ng-file-select]").val("")};c.cancelRateAndReview=function(){c.rateReview=false
};c.starOnClick=function(w){v(w)};var l=function(){var w={category:"Recipe",contentType:"Recipe",contentCmsId:c.ngDialogData.userReview.recipeId,label:(c.ngDialogData.segmentLabelPrefix||"")+"Recipe Rating Submitted",contentSource:c.ngDialogData.recipeSponsorId,linkedCmsId:c.ngDialogData.userReview.recipeId.toString()};
d.segmentAnalytics.track("Recipe Rating Submitted",w);if(c.ngDialogData.userReview.inProgressReview.text){w.label=(c.ngDialogData.segmentLabelPrefix||"")+"Recipe Review Submitted";
d.segmentAnalytics.track("Recipe Review Submitted",w)}o.push("rate/photo flow: review saved",c.ngDialogData.userReview.recipeId,"Action Complete")
};c.saveReview=function(){var w="";if(typeof c.ngDialogData.userReview.inProgressReview.rating==="undefined"||c.ngDialogData.userReview.inProgressReview.rating<=0){c.$emit("notify","Oops! You need to select a star rating.",null,"failure")
}else{if(c.ngDialogData.userReview.inProgressReview.recipetype==="Personal"){w=h.savePersonalRecipeReview({recipeId:c.ngDialogData.userReview.recipeId,rating:c.ngDialogData.userReview.inProgressReview.rating,text:c.ngDialogData.userReview.inProgressReview.text,ignoreReview:false})
}else{w=h.save({recipeId:c.ngDialogData.userReview.recipeId,rating:c.ngDialogData.userReview.inProgressReview.rating,text:c.ngDialogData.userReview.inProgressReview.text,ignoreReview:false})
}w.$promise.then(function(x){l();i.getPrivate().$promise.then(function(y){c.ngDialogData.userReview.user=y});c.ngDialogData.userReview.userReview=c.ngDialogData.userReview.inProgressReview;
c.ngDialogData.userReview.userReview.date=new Date(x.dateUpdated);c.rateReview=false},function(x){if(x.status!==401){c.$emit("notify","Oops! We couldn’t save your review. Try again in just a moment.",null,"failure")
}})}};var u=function(){c.isPhotoSuccess=true;c.isUploadPhotoSection=false;var w={template:e.scriptServerUrl+"assets/source/angular/templates/PhotoUploadModal.html",scope:c,className:"ngdialog-theme-default ngdialog-theme-madeit"};
w.scope.description=null;s.openConfirm(w)}}]);
//
// source/angular/controllers/madeItCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_controllers_made_it",["$scope","$window","$rootScope","arLogin","ar_services_made_it","ar_services_review_rating","perishableLocalstorage","$q","$timeout","datalayerEvent","$location","$anchorScroll","ar_services_url","ar_services_user","ngDialog","ar_services_environment",function(e,g,d,m,i,j,y,c,f,o,b,a,k,l,x,h){e.madeItButtonIsHighlighted=false;
e.recipeid=0;e.recipetype="Recipe";e.madeCount=0;e.madeCountRunningTotal=0;e.rating=0;e.shouldShowReviews=false;e.showRate=false;
e.isDirty=false;e.totalRecipeMadeCount=0;e.areReviewsReadOnly=false;e.reviewLastUpdatedDate=null;e.hasMadeIt=false;e.user={};
e.modalConfig=null;e.madeItPhotoURL=null;e.isReady=false;var w="MadeRecipes"+m.userId;var v=m.userId!==0?y.get(w):[];var z;var B="";
e.init=function(G,F,J,L,I,N,M,O,K,H){e.totalRecipeMadeCount=K;e.recipeid=G;e.reviewLastUpdatedDate=L;e.rating=F;e.review=J;e.recipeSponsorId=H;
e.user={followersCount:N,favoritesCount:M,madeRecipesCount:O};e.userReview={recipeId:G,userReview:{text:J,rating:F,date:L,recipetype:I},inProgressReview:{text:J,rating:F,date:L,recipetype:I},recipetype:I,recipeSponsorId:H};
if(!g.pubsub.isListening("A.MadeIt.Add.Event","MadeIt.Controller")){g.pubsub.listen("A.MadeIt.Add.Event","MadeIt.Controller",e.save)
}if(v===null||v===undefined){v=[];if(m.isLoggedIn()){z=i.query().$promise;z.then(function(P){y.set(w,P);v=P;e.madeCount=q();e.madeCountRunningTotal=r()
})}else{z=c.when(v)}}else{z=c.when(v);e.madeCount=q();e.madeCountRunningTotal=r()}D(F);e.review=J===undefined||J===null?"":J;
B=e.review;e.showRate=e.rating>0||e.review.length>0;e.isReadOnly=e.rating>0||e.review.length>0;if(e.isReadOnly&&k.getQueryStringValue("editReview")===1){e.isReadOnly=false;
b.hash("recipe-toolbar");a()}u();e.modalConfig={template:h.scriptServerUrl+"assets/source/angular/templates/IMadeItModal.html",controller:"ar_controllers_made_it_modal",className:"ngdialog-theme-default ngdialog-theme-madeit"};
e.isReady=true};var C=function(){d.$emit("onRatingClick",false)};var u=function(){if(e.review.length>0){var F=angular.element(document.getElementById("reviewLabel"));
if(F.length>0){F.hide()}}};e.cancelEdit=function(){e.isReadOnly=true;e.review=B};var E=function(F){e.showRate=F};d.$on("onRatingClick",function(F,G,H){if(H){e.fromStickyNav=H.fromStickyNav
}E(G)});var t=function(){C()};var A=document.getElementById("ad-footer");var p=angular.element(A);var D=function(G){e.rating=G;
var F=function(I){var H=I<=G?"rate-star-single star-rating":"rate-star-single";return H};e.styleStar1=F(1);e.styleStar2=F(2);
e.styleStar3=F(3);e.styleStar4=F(4);e.styleStar5=F(5)};e.hideAds=function(){p.hide()};e.showAds=function(){p.show()};e.starOnClick=function(F,G,H){D(F);
if(H==="Recipe"){j.save({recipeId:G,rating:F,text:e.review,ignoreReview:true})}else{j.savePersonalRecipeReview({recipeId:e.recipeid,rating:e.rating,text:e.review,ignoreReview:true})
}d.$emit("onReviewSaved",true);l.getPrivate().$promise.then(function(I){e.user=I})};e.reviewOnChange=function(){e.isDirty=true
};e.onEditReviewClick=function(){e.isReadOnly=false;B=e.review};var s=function(F){if(F==="undo"){e.remove()}};function n(){o.pushRegistrationSourceClick("rd_imadeit_bar");
var F={category:"Recipe",contentType:"Recipe",contentCmsId:e.recipeid,label:"Made It - Button",contentSource:e.recipeSponsorId};
g.segmentAnalytics.track("Made it",F);if(!m.isLoggedIn()){g.segmentAnalytics.track("Registration Started",{category:"Sign In and Registration",label:"Registration Started",regSource:"ALR_SitePlacement_rd_imadeit",registrationId:"3637"})
}}e.madeItClick=function(){if(!e.userReview){e.userReview={recipeId:e.recipeid,userReview:{text:e.review,rating:e.rating,date:e.reviewLastUpdatedDate,recipetype:0,styleStar1:"",styleStar2:"",styleStar3:"",styleStar4:"",styleStar5:""},inProgressReview:{text:e.review,rating:e.rating,date:e.reviewLastUpdatedDate,recipetype:0,styleStar1:"",styleStar2:"",styleStar3:"",styleStar4:"",styleStar5:""}}
}n();g.pubsub.broadcast("A.MadeIt.Add.Event",["Made It - Button - "])};e.save=function(G){var F=ar.models.madeItPost(e.recipeid,"AddMadeIt");
i.save(F).$promise.then(function(){e.updateMadeCount(1);e.madeItButtonIsHighlighted=true;g.pubsub.broadcast("IMadeIt");o.push("add a photo rate it flow",e.recipeid,"Action Complete");
e.modalConfig.data={madeCount:e.madeCount,totalRecipeMadeCount:e.totalRecipeMadeCount,madeItPhotoUrl:e.madeItPhotoURL,userReview:e.userReview,recipeSponsorId:e.recipeSponsorId,segmentLabelPrefix:G};
x.openConfirm(e.modalConfig).then(function(){},s)},function(H){})};e.remove=function(){var F=ar.models.madeItUndo(e.recipeid);
i.remove(F).$promise.then(function(){e.madeItButtonIsHighlighted=false;if(e.madeCount<=1){e.shouldShowReviews=false}e.updateMadeCount(-1);
e.$emit("cancelNotification")},function(G){})};var q=function(){var G=v.filter(function(H){return H.recipeID===e.recipeid});var F=G.length>0?G[0].count:0;
return F};var r=function(){var G=0;for(var F=0;F<v.length;F++){G+=v[F].count}return G};e.updateMadeCount=function(G){e.madeCount=e.madeCount+G;
e.totalRecipeMadeCount=e.totalRecipeMadeCount+G;e.madeCountRunningTotal=e.madeCountRunningTotal+G;d.$emit("updateMadeCount",G);
if(v!==null&&v!==undefined){var H=v.map(function(J,I){if(J.recipeID===e.recipeid){return I}});if(H.length>0){for(var F=0;F<H.length;
F++){if(H[F]!==undefined){v.splice(H[F],1)}}}}if(e.madeCount>0){v.push({recipeID:e.recipeid,count:e.madeCount})}y.set(w,v)};e.$on("onPhotoUpload",function(F,G){e.madeItPhotoURL=G
})}]);
//
// source/angular/controllers/rateAndReviewCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_controllers_rate_and_review",["$scope","$window","ngDialog","datalayerEvent","arLogin","userReview","ar_services_environment",function(a,b,g,f,d,h,c){var e=function(i){var j={category:"Recipe",contentType:"Recipe",contentCmsId:a.model.recipeId,label:(i||"")+"Recipe Rating Clicked",linkedCmsId:a.model.recipeId.toString(),contentSource:a.model.recipeSponsorId};
b.segmentAnalytics.track("Recipe Rating Clicked",j);f.push("rd_rateit",a.recipeid,"Action Complete")};a.init=function(i){a.model={recipeId:h.recipeId,userReview:JSON.parse(JSON.stringify(h.userReview)),inProgressReview:JSON.parse(JSON.stringify(h.userReview)),recipetype:h.recipetype,recipeSponsorId:i};
if(!b.pubsub.isListening("A.Recipe.RateAndReview.ClickEvent","RateAndReview.Controller")){b.pubsub.listen("A.Recipe.RateAndReview.ClickEvent","RateAndReview.Controller",a.openRating)
}};a.openRating=function(j){var i=j?j.clickSource:undefined;e(i);if(!d.isLoggedIn()){if(j&&j.fromStickyNav){b.segmentAnalytics.track("Sign In and Registration",{regSource:"3637",registrationId:"ALR_SitePlacement_rd_rateit_bar",category:"Sign In and Registration",label:"Registration Started"})
}else{b.segmentAnalytics.track("Registration Started",{category:"Sign In and Registration",label:"Registration Started",regSource:"3637",registrationId:"ALR_SitePlacement_rd_rateit"})
}var k=(b.location.href.indexOf("?")<0?"?":"&")+"deferred="+JSON.stringify({deferredActionName:"OpenRatingSection",clickSource:i});
d.goToAuthorizationWelcomePage(encodeURIComponent(b.location.href+k))}else{a.model.clickSource=i;g.openConfirm({trapFocus:false,template:c.scriptServerUrl+"assets/source/angular/templates/RateAndReview.html",className:"ngdialog-theme-default ngdialog-theme-rateandreview",data:a.model})
}}}]).controller("ar_controllers_rate_and_review_modal",["$scope","$rootScope","datalayerEvent","arLogin","ar_services_review_rating","ar_services_user","ar_services_photoupload","$window",function(b,a,j,g,e,f,d,c){b.model=b.ngDialogData;
var m=function(o){b.model.inProgressReview.rating=o;var n=function(q){var p=q<=o?"rate-star-single star-rating":"rate-star-single";
return p};b.model.inProgressReview.styleStar1=n(1);b.model.inProgressReview.styleStar2=n(2);b.model.inProgressReview.styleStar3=n(3);
b.model.inProgressReview.styleStar4=n(4);b.model.inProgressReview.styleStar5=n(5)};m(b.model.inProgressReview.rating||0);b.starOnClick=function(n){m(n)
};b.cancelEdit=function(){b.model.inProgressReview=JSON.parse(JSON.stringify(b.model.userReview));b.model.ratingWords="";b.confirm()
};var i=function(){var o={category:"Recipe",contentType:"Recipe",contentCmsId:b.model.recipeId,label:(b.model.clickSource||"")+"Recipe Rating Submitted",contentSource:b.model.recipeSponsorId,linkedCmsId:b.model.recipeId.toString()};
c.segmentAnalytics.track("Recipe Rating Submitted",o);if(b.model.inProgressReview.text){o.label=(b.model.clickSource||"")+"Recipe Review Submitted";
c.segmentAnalytics.track("Recipe Review Submitted",o)}var n=b.fromStickyNav?"sticky nav 4":"recipe button";j.push("rate/review recipe",b.model.recipeId,"Action Complete",n)
};var h=function(p,o){c._satellite.setVar("UploadLocation","pu_review_modal");c._satellite.track("photo-upload");var n={category:"Recipe",contentType:"Recipe",contentCmsId:p,linkedCmsId:o,contentSource:b.model.recipeSponsorId,label:(b.model.clickSource||"")+"Recipe Photo Submitted"};
c.segmentAnalytics.track("Recipe Photo Submitted",n)};b.saveReview=function(){if(typeof b.model.inProgressReview.rating==="undefined"||b.model.inProgressReview.rating<=0){b.$emit("notify","Oops! You need to select a star rating.",null,"failure");
return}b.reviewCount="";e.getLatestReviewsCount({latestReviewsCountOnly:true}).$promise.then(function(n){b.reviewCount=n.metaData.totalCount;
if(b.reviewCount>=20){b.$emit("notify","You have already submitted 20 reviews in the last 24 hours",null,"failure");return}var o="";
if(b.model.inProgressReview.recipetype===1){o=e.savePersonalRecipeReview({recipeId:b.model.recipeId,rating:b.model.inProgressReview.rating,text:b.model.inProgressReview.text,ignoreReview:false})
}else{o=e.save({recipeId:b.model.recipeId,rating:b.model.inProgressReview.rating,text:b.model.inProgressReview.text,ignoreReview:false})
}o.$promise.then(function(p){b.$emit("notify","Review saved.",null,"success");i();a.$emit("onReviewSaved",true);f.getPrivate().$promise.then(function(q){b.model.user=q
});b.model.userReview=JSON.parse(JSON.stringify(b.model.inProgressReview));b.model.userReview.date=new Date(p.dateUpdated);b.confirm()
},function(p){if(p.status!==401){b.$emit("notify","Oops! We couldn’t save your review. Try again in just a moment.",null,"failure")
}})})};b.setButtonDefaultStyle=function(){b.buttonClass="rate-review__add-photo-label";b.buttonLabel="Add Photo"};b.setButtonAddedStyle=function(){b.buttonClass="rate-review__add-photo-label added";
b.buttonLabel="Added Photo"};b.setButtonDefaultStyle();b.onFileSelect=function(n){if(n[0]){var p=n[0];var o={minHeight:960,minWidth:960,maxSize:20971520};
d.readPhotoData(p,b,o).then(function(){d.uploadPhoto({userId:g.userId,recipeId:b.model.recipeId,description:"",file:p}).then(l,k)
},function(q){b.$emit("notify",q.error,null,"failure")})}};var l=function(n){h(b.model.recipeId,n.photoId);b.setButtonAddedStyle()
};var k=function(n){b.$emit("notify",n,null,"failure");b.setButtonDefaultStyle()}}]);
//
// source/angular/controllers/reviewCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_controllers_recipe_reviews",["$scope","$window","$sce","arLogin","$location","$anchorScroll","ar_services_reviews","ar_services_review_helpful","$cookies","$rootScope","datalayerEvent","ngDialog","adConfiguration","adsConstants","ar_services_environment",function(f,g,e,m,c,a,l,k,b,d,p,q,h,i,j){f.reviews=[];
f.sortByFriendlyName={MostHelpful:"Most helpful",MostPositive:"Most positive",LeastPositive:"Least positive",Newest:"Newest"};
f.styleHelpfulIcon="icon--helpful-thumb";f.init=function(z,x,y,B,w,C,A){f.recipeId=z;f.pageNumber=x;f.pageSize=y;f.recipeType=B;
f.rateReviewIconIsHighlighted=false;f.availablePages=w;f.moreReviewsAvailable=(w>1);f.sortBy=C;f.recipeSponsorId=A;a();v()};var r=false;
var v=function(){g.pubsub.listen("A.Recipe.RateAndReview.ClickEvent","RecipeReviews.Controller",t)};var s=function(w){f.rateReviewIconIsHighlighted=w
};d.$on("onRatingClick",function(w,x){s(x)});var n=function(x){p.push("more recipe reviews",x,"Action Complete","more recipe reviews");
var w={category:"Recipe",contentType:"Recipe",contentCmsId:x,linkedCmsId:x,contentSource:f.recipeSponsorId,label:"More Recipe Reviews"};
g.segmentAnalytics.track("Reviews Viewed",w)};var o=function(w){var x={category:"Recipe",contentType:"Recipe",contentCmsId:f.recipeId,label:w,contentSource:f.recipeSponsorId};
g.segmentAnalytics.track("Recipe Interaction",x)};f.getReviews=function(x,w){if(x){if(f.sortBy==x){return}o(w);if(f.clearReviews){f.clearReviews()
}f.sortBy=x;f.pageNumber=1}else{n(f.recipeId)}l.getReviews(f.recipeId,f.pageNumber,f.pageSize,f.recipeType,f.sortBy).then(function(y){if(y.data){if(x){f.reviews.length=0;
f.moreReviewsAvailable=(f.availablePages>1)}f.reviews.push(e.trustAsHtml(y.data));u();f.pageNumber++;if(f.pageNumber>f.availablePages){f.moreReviewsAvailable=false
}}},function(y){f.reviewsErrorMessage=y.data.message})};function u(){setTimeout(function(){window.dispatchEvent(new Event("scroll"))
},500)}f.clickHelpful=function(w,D){var x=angular.element(w.target);var C=x.hasClass(f.styleHelpfulIcon);var z;var y;if(C){z=w.target[0].childNodes[0];
y=x}else{z=x;y=x.parent()}var B="up";var A=y.hasClass(B);if(A){return}f.saved=k.save({recipeId:f.recipeId,reviewId:D,guid:b.get("ARSiteUser")});
f.saved.$promise.then(function(){var E=parseInt(z.textContent)+1;z.textContent=E;y.addClass(B)},function(E){f.ClickHelpfulErrorMessage=E.data.message
})};f.recipeReviewsToggleRating=m.ensureUserIsLoggedIn(function(){r=!r;d.$emit("onRatingClick",r);c.hash("recipe-toolbar");a()
});var t=function(w){d.$emit("onRatingClick",w.showModal,w.trackingData)};f.reviewModalDialog=function(w,x){h.settings.lazyLoadTargeting=i.reviewModalTargeting;
q.open({template:j.scriptServerUrl+"assets/source/angular/templates/ReviewModal.html",controller:"ar_controllers_review_modal",className:"ngdialog-theme-default review-modal",data:{indexToOpen:w,pageSortOrder:x,recipeSponsorId:f.recipeSponsorId},showClose:false})
}}]);
//
// source/angular/controllers/recipeSummaryCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_controllers_recipe_summary",["$scope","$rootScope","$window","ar_services_collections","datalayerEvent",function(b,a,c,d,f){b.totalRecipeMadeCount=0;
b.show=false;b.collectionList=[];b.collectionList=JSON.parse(c.localStorage.getItem("collectinlist"));b.init=function(i,h,g){if(g=="New"){if(b.collectionList!=undefined){b.update=d.addRecipeToCollectionList({recipeId:h,recipeType:"PersonalRecipe",collectionList:b.collectionList,savedItemId:undefined});
b.update.$promise.then(function(){b.$emit("notify","Added to ",5000,"success",null,null,null,collectionList[0].name,collectionList[0].folderID,collectionList.length-1);
c.localStorage.setItem("collectinlist",null)},function(j){if(j.status!==401){b.errorMessage=j.data.message;c.localStorage.setItem("collectinlist",null)
}})}a.$broadcast("notify","Recipe saved to your Personal Recipes",5000,"success",null,null,null,null)}b.totalRecipeMadeCount=i;
b.show=true};a.$on("updateMadeCount",function(g,h){b.totalRecipeMadeCount=b.totalRecipeMadeCount+h});b.articleClick=function(i,g,h){e(g,i,h);
c.location.href=g};function e(h,k,i){var g="";var j="";f.push("recipe dish article redirect",k,"Action Complete");if(i){g="Eyebrow Test";
j="Recipe > Eyebrow"}if(i===false){g="Mixed Content Test";j="Recipe > Mixed Content"}var l={category:"Recipe",contentType:"Recipe",contentCmsId:k,label:j,contentSource:b.recipeSponsorId,linkedUrl:h,contentSubType:g};
c.segmentAnalytics.track("Content Action Taken",l)}}]);
//
// source/angular/controllers/recipePhotoCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_controllers_recipe_photo",["$scope","ar_services_environment","ngDialog","$window","adConfiguration","adsConstants",function(a,e,f,b,c,d){var g=function(i,j,k){a.recipeInfo={recipeId:i,recipeTitle:j,recipeType:k};
c.settings.lazyLoadTargeting=d.photoModalTargeting;a.segmentProperties={category:"Photo",contentType:"Photo",contentCmsId:a.selectedPhotoId};
var h={template:e.scriptServerUrl+"assets/source/angular/templates/PhotoDetailModal.html",className:"ngdialog-theme-default photo-detail",scope:a,controller:"ar_controllers_photo_detail_modal"};
f.openConfirm(h)};a.init=function(h){a.recipeSponsorId=h};a.openGalery=function(m,i,j,h,l,k){a.hiResUrl=h||"";a.selectedPhotoId=l||"";
if(m){b.location.href=m}else{g(i,j,k)}};a.$on("A.Recipe.PhotoModal.PhotoUpload.ClickEvent",function(h,i){g(i.recipeId,i.recipeTitle,i.recipeType)
})}]);
//
// source/angular/controllers/photoDetailModalCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_controllers_photo_detail_modal",["$scope","$element","$window","carousel_scroller_manager_service","ngDialog","ar_services_photo_detail_modal","ar_services_photoupload","$document","arLogin","datalayerEvent","ar_tracking_metadata",function(c,b,d,j,u,w,e,a,g,l,f){var x=1;
var v=20;var t=0;c.isPhotoUploadActive=false;var n=function(B){if(!B){return 0}var C=c.photoList.filter(function(D){return D.photoId==B
});if(C[0]){c.mainPhoto=C[0];return C[0].photoIndex}};var A=function(C,B){c.photoCount=C;c.photoList=c.photoList.concat(B);d.setTimeout(function(){j.triggerScrollInitialize("morePhotos");
for(var D=0;D<B.length;D++){var E=new Image();E.src=B[D].url}},500)};c.init=function(B){c.initialPhotoId=B;c.currentPhotoIndex=0;
c.title=c.recipeInfo.recipeTitle;if(!c.recipeInfo){return}c.photoUploadDeferredAction={deferredActionName:"UploadPhotoOnPhotoModal",recipeId:c.recipeInfo.recipeId,recipeTitle:c.recipeInfo.recipeTitle};
if(!c.photoCount||c.photoList.length<c.photoCount||c.initialPhotoId){var C={recipeId:c.recipeInfo.recipeId,page:x,pagesize:v};
w.getPhotos(C,function(E,D){A(E,D);c.loadPhoto(c.photoList[n(B)],"initialPhoto",0)})}};if(typeof d.karma.purgeRefreshSlots==="function"){d.karma.purgeRefreshSlots()
}c.photoCount=0;c.photoList=[];c.adSlot1=(d.innerWidth>768)?"div-gpt-lazy-square-fixed-tier3":"div-gpt-lazy-mob-square-fixed-tier3";
c.adSlot2="div-gpt-lazy-square-fixed-tier4";function y(){d.karma.refresh()}c.closeModal=function(){u.closeAll()};c.displayMorePhotosNavigation=function(){c.navigationClass="carousel-navigation"
};c.setDefaultNavigationClass=function(){c.navigationClass="carousel-navigation hide-navigation"};c.setDefaultNavigationClass();
function o(C){var B=d.document.createElement("a");B.href=C;return B.href}var p=function(){var B={recipeId:c.recipeInfo.recipeId,page:x,pagesize:v};
if(!c.photoCount||c.photoList.length<c.photoCount||c.initialPhotoId){w.getPhotos(B,A)}};var m;c.loadPhoto=function(K,B,C){c.mainPhoto=K;
var G=d.document.getElementById("main-photo-wrapper");var D=C<0;var E=C===0;if(E){var F=d.document.getElementById("main-photo-image");
F.src=K.url}else{clearTimeout(m);var I=d.document.getElementById("moving-image-wrapper");if(I){G.removeChild(I)}var J=d.document.createElement("div");
J.id="moving-image-wrapper";J.className="slideImgWrap "+(D?"slideFromLeft":"slideFromRight");var H=d.document.createElement("img");
H.src=K.url;J.appendChild(H);G.appendChild(J);setTimeout(function(){J.className+=" slideIn"},1);m=setTimeout(function(){var M=d.document.getElementById("main-photo-image-wrapper");
G.removeChild(M);J.id="main-photo-image-wrapper";H.id="main-photo-image";y()},500)}d._satellite.setVar("PhotoID",K.photoId);d._satellite.setVar("object_id",B);
d._satellite.track("photo-click");c.currentPhotoIndex=K.photoIndex;c.photoDetailUrl=o("photos/"+K.photoId+"/");var L=i(K);window.segmentAnalytics.page(L)
};function i(B){return{path:window.location.pathname+"photos/"+B.photoId,contentAdKeys:window.segment.contentAdKeys,contentCmsId:B.photoId,contentCmsCategory:f.contentType,contentCmsSubCategory:"",contentFeaturedImage:B.url,contentHeadline:document.title,contentSource:c.recipeSponsorId,contentType:"Recipe Photos",contentSubType:"",contentAuthorName:"",contentCmsTags:"",contentCmsTerms:"",contentIsPost:"post",contentPublishedDate:"",contentModifiedDate:"",contentPublishedDateFormatted:"",contentModifiedDateFormatted:"",contentSyndicated:"",contentSyndicatedBrand:"",contentSyndicatedUrl:"",contentNlpCategories:"",contentNlpEntities:"",contentNlpPayload:"",contentNlpSentimentLabel:"",linkedCmsId:f.contentId,dayOfWeek:window.dataLayer.page.pageInfo.dayOfWeek,hourOfDay:window.dataLayer.page.pageInfo.hourOfDay,meredithApplication:"Dot Net Modal"}
}var h=function(D,C){l.push("add a photo",D,"Action Complete","photoUpload");var B={category:"Recipe",contentType:"Recipe",contentCmsId:D,linkedCmsId:C,contentSource:c.recipeSponsorId,label:"Recipe Photo Submitted"};
d.segmentAnalytics.track("Recipe Photo Submitted",B)};c.loadMorePhotos=function(){x+=1;p()};c.profileIconClick=function(){d.location.href=c.mainPhoto.submitter.profileUrl
};c.handleScroll=function(C){var B=C.target.scrollWidth;var D=C.target.offsetWidth;var E=C.target.scrollLeft;if(C.target.id=="scrollDiv"&&(E+D)>=B*0.75){c.initialPhotoId=null;
c.loadMorePhotos();t=C.target.scrollLeft}};c.selectPreviousImage=function(B){z(-1,B)};c.selectNextImage=function(B){z(1,B)};function z(C,B){var D=c.mainPhoto.photoIndex+C;
if(c.photoList.length!=c.photoCount){if(D==c.photoList.length-2){c.loadMorePhotos()}}if(D<0){D=0;return}else{if(D>c.photoList.length-1){D=c.mainPhoto.photoIndex;
return}}c.loadPhoto(c.photoList[D],B,C)}var k=function(){a.find("[ng-file-select]").val("")};var q=function(B){var C=B[0];k();
c.description=null;var D={minHeight:960,minWidth:960,maxSize:20971520};e.readPhotoData(C,c,D).then(function(E){c.selectedFile=C;
c.userSelectedPhoto=E.dataUrl;c.isPhotoUploadActive=true},function(E){c.$emit("notify",E.error,null,"failure")})};c.onFileSelect=q;
c.save=function(){c.isPhotoUploadActive=false;e.uploadPhoto({userId:g.userId,recipeId:c.recipeInfo.recipeId,description:c.description,file:c.selectedFile,recipeType:c.recipeInfo.recipeType}).then(s,r)
};var s=function(B){c.$emit("notify","Photo added. Thank you!",null,"success",null,null);x=1;h(c.recipeInfo.recipeId,B.photoId);
c.init(B.photoId)};var r=function(B){c.$emit("notify",B,null,"failure")};c.close=function(){c.isPhotoUploadActive=false}}]);
//
// source/angular/controllers/ingredientCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_controllers_recipe_ingredient",["$scope","$log","$window","$filter","$timeout","ar_services_ingredients","ar_services_shopping_list","datalayerEvent","popup_manager_service","arLogin",function(c,b,e,a,d,f,g,l,n,h){c.ingredients=[];
c.ingredientColumns=[];c.reloaded=false;c.nutritionOn=false;c.servingsOn=false;c.isMetric=false;c.adjustedServings=0;c.$parent.printServings="";
c.$parent.printMetrics="";c.fullNutrition=false;c.nutrition=null;c.title=null;c.listClickPixels=[];c.servings=0;c.recipeId=0;
c.recipeType=null;c.userId=0;c.isNutritionPopup=false;c.isServingsPopup=false;c.allIngredientsCheckBox=null;c.footerAd=document.getElementById("ad-footer");
var m=true;c.init=function(s,p,r,u,t,q){c.servings=s;c.adjustedServings=s;c.$parent.printServings="servings="+c.adjustedServings;
c.$parent.printMetrics="isMetric="+c.isMetric;c.recipeId=p;c.recipeType=r;c.userId=u;c.title=t;c.recipeSponsorId=q;c.setBreakpoint();
n.triggerClicked.Add(c.handleTriggerClicked)};c.setBreakpoint=function(){var p=e.innerWidth>=768;c.isNutritionPopup=p;c.isServingsPopup=p
};c.handleTriggerClicked=function(p){if(!c.isNutritionPopup&&!c.isServingsPopup){if(p==="nutritionSection"&&c.servingsSection_showing){n.triggerPopup("servingsSection")
}else{if(p==="servingsSection"&&c.nutritionSection_showing){n.triggerPopup("nutritionSection")}}}};c.showFullNutrition=function(){if(c.nutrition){c.fullNutrition=true
}else{c.getNutrition()}};c.showSummaryNutrition=function(){c.fullNutrition=false};c.hideAds=function(){c.footerAd.style.display="none"
};c.showAds=function(){c.footerAd.style.display=""};c.ingredientsLoaded=function(){e.pubsub.broadcast("Ingredients.LoadedFromService")
};c.setNutrition=function(p){angular.forEach(p,function(r,q){if(r.name==="Fat"){r.name="Total Fat"}else{if(r.name==="Carbohydrates"){r.name="Total Carbohydrates"
}}});c.nutrition=p};c.calculateColumns=function(){var q=[];var t=Math.ceil(c.ingredients.length/2);var s=1;for(var r=0;r<c.ingredients.length;
r+=t){var p={index:s++,start:r,end:Math.min(r+t,c.ingredients.length)};q.push(p)}c.ingredientColumns=q};function i(q){var p={category:"Recipe",contentType:"Recipe",contentCmsId:q,label:"Adjust Servings",contentSource:c.recipeSponsorId?c.recipeSponsorId:null};
e.segmentAnalytics.track("Recipe Interaction",p)}c.getIngredients=function(q,s,p){i(q);c.$parent.printMetrics="isMetric="+c.isMetric;
c.listClickPixels=[];if(s==="Recipe"){if(c.servings<1||typeof c.servings==="undefined"){c.$emit("notify","Serving must be between 1 and 300.",null,"failure");
return}if(c.servings>300){c.$emit("notify","Feeding a small army? Sorry, serving size must be between 1 and 300.",null,"failure")
}else{var r=f.query({recipeId:q,servings:c.servings,isMetric:c.isMetric});r.$promise.then(function(u){if(!c.nutrition){c.setNutrition(u.nutrition)
}c.title=u.title;var t=[];angular.forEach(u.ingredients,function(w,v){if(w.displayType!=="BlankLine"){w.sequenceNbr=v+1;w.isSaved=false;
t.push(w)}});if(c.reloaded===false){c.reloaded=true}c.ingredients=t;c.calculateColumns();c.adjustedServings=c.servings;c.$parent.printServings="servings="+c.adjustedServings;
if(p){c.$emit("notify","The ingredient list now reflects serving size.",null,"success")}},function(t){var u=t.data.data.message;
c.$emit("notify",u,null,"failure");c.reloaded=false})}}};c.getNutrition=function(){var p=f.getNutrition({recipeId:c.recipeId,servings:c.servings,isMetric:c.isMetric});
p.$promise.then(function(q){if(!c.nutrition){c.setNutrition(q.nutrition)}c.fullNutrition=true})};c.shoppingListRecipeId="";c.saveRecipe=function(p,s,t){c.allIngredientsCheckBox=p.target.checked;
if(c.allIngredientsCheckBox){e.pubsub.broadcast("ShoppingListSave");if(t==="Recipe"){var r=e.ar.models.shoppingListRecipePost(s,c.servings,"AddRecipeToShoppingList");
c.saved=g.saveRecipe(r);l.pushRegistrationSourceClick("rd_shoppinglist");if(!h.isLoggedIn()){e.segmentAnalytics.track("Sign In and Registration",{regSource:"3624",registrationId:"ALR_SitePlacement_rd_shoppinglist",category:"Sign In and Registration",label:"Registration Started"})
}}else{if(t==="Personal"||t==="Custom"){var q=e.ar.models.shoppingListRecipePost(s,c.servings,"AddPersonalRecipeToShoppingList");
c.saved=g.savePersonalRecipe(q)}}c.saved.$promise.then(function(u){c.shoppingListRecipeId=u.shoppingListRecipeId;c.$emit("notify","Shopping list saved.",null,"success");
j(true)},function(){c.shoppingListRecipeId=0;if(p!==undefined&&p!==null){p.target.checked=false}})}else{j(false)}};function o(q,r){var p=q?"Add":"Remove";
e.segmentAnalytics.track("Shopping List "+p,{category:"Recipe",contentType:"Recipe",contentCmsId:c.recipeId,label:p+r,contentSource:c.recipeSponsorId})
}function j(p){if(p){l.push("add recipe to shopping list",c.recipeId,"Action Complete")}o(p," All Ingredients")}function k(p){l.pushRegistrationSourceClick("rd_shoppinglist");
o(p," Ingredient")}c.saveIngredient=function(p,r){if(typeof r==="number"){r={ingredientID:r,isSaved:false}}if(r.isSaved){p.target.checked=true;
return}var q=p.target.checked;if(q){if(c.recipeType==="Recipe"){pubsub.broadcast("ShoppingListSave");var s=ar.models.shoppingListIngredientPost(r.ingredientID,c.recipeId,c.servings,"AddIngredientToShoppingList");
c.saved=g.saveIngredient(s);c.saved.$promise.then(function(){c.$emit("notify","Added to shopping list.",null,"success");r.isSaved=true;
l.push("add grocery item",c.recipeId,"Action Complete")},function(){if(p!==undefined&&p!==null){p.target.checked=false}})}}k(q)
};angular.element(e.document).bind("resize",c.setBreakpoint);angular.element(e.document).bind("resize",c.$apply)}]);
//
// source/angular/services/lazy-load-trigger-service.js
//
"use strict";angular.module("allrecipes").service("lazyloadtrigger",["$timeout","$window",function(a,b){this.triggerLazyLoad=function(c){a(function(){var d=document.documentElement.scrollTop>0?document.documentElement.scrollTop:b.scrollY;
b.scroll(0,d+1);b.scroll(0,d)},c)}}]);
//
// source/angular/filters/slice-filter.js
//
"use strict";angular.module("allrecipes").filter("ar_filters_slice",function(){return function(a,c,b){return a.slice(c,b)}});
//
// source/angular/controllers/printRecipeCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_controllers_print_recipe",["$scope","$window","arLogin","datalayerEvent","arRecipeBoxStorage",function(a,b,c,f,d){a.hasPrinted=false;
a.saved=false;a.saveButtonText="Save";var g=function(h){if(a.recipeId===h.recipeId){a.saved=!a.saved}};a.init=function(h,j,i){a.recipeId=h;
a.recipeSponsorId=i;d.hasRecipeId(h,j).then(function(k){a.saved=k;if(a.saved){a.saveButtonText="Saved"}});b.pubsub.listen("Recipe.Heart.ClickEvent","RecipeToolBar.Controller",g)
};var e=function(){b.pubsub.broadcast("Recipe.Print");var h={category:"Recipe",contentType:"Recipe",contentCmsId:a.recipeId,contentSource:a.recipeSponsorId,label:"Print"};
b.segmentAnalytics.track("Print Click",h)};a.printRecipe=function(){e();b.print();a.hasPrinted=true};a.saveOnClick=function(i,k,j,h){f.pushRegistrationSourceClick("print_save_reg");
if(!c.isLoggedIn()){b.segmentAnalytics.track("Sign In and Registration",{regSource:"3635",registrationId:"ALR_SitePlacement_print_save_reg",category:"Sign In and Registration",label:"Registration Started"})
}if(a.saved){b.pubsub.broadcast("A.Recipe.Remove.ClickEvent",[{recipeID:i,type:k}]);a.saveButtonText="Save"}else{b.pubsub.broadcast("A.Recipe.Save.ClickEvent",[{recipeID:parseInt(i),type:k,title:j,imageUrl:h,source:"print_save"}]);
a.saveButtonText="Saved"}}}]);
//
// source/angular/controllers/AnchorScroll.js
//
"use strict";function AnchorScroll(b){if(typeof b!=="undefined"&&b){var c=document.getElementById(b);var a=c.offsetTop-60;var d=(a)<0?0:a;
easeInOutScroll(d,1000)}}function easeInOutScroll(d,c,b,a){if(a==="horizontal"){horizontalScroll(d,c,b)}else{verticalScroll(d,c,b)
}}function verticalScroll(f,e,b){if(b==undefined){b=window}var a=(b.pageYOffset-f)/2;var d=0;var c=performance.now();function g(i){d+=Math.PI/(e/(i-c));
if(d>=Math.PI){b.scrollTo(0,f);return}var h=Math.round(f+a*(1+Math.cos(d)));b.scrollTo(0,h);if(h===f){return}c=i;window.requestAnimationFrame(g)
}window.requestAnimationFrame(g)}var animating=false;function horizontalScroll(g,f,c){if(animating||!c||g===undefined||!f){return false
}var a=function(j,i){return j["webkitR"+i]||j["r"+i]||j["mozR"+i]||j["msR"+i]||function(k){setTimeout(k,60)}}(window,"requestAnimationFrame"),b=function(i){return i<0.5?4*i*i*i:(i-1)*(2*i-2)*(2*i-2)+1
},d=+new Date()+f,e=c.scrollLeft;animating=true;var h=function(){var i=+new Date(),k=d-i;if(k<0){animating=false}else{var j=b(1-k/f);
c.scrollLeft=e+(j*(g-e))}a(h)};h()};
//
// source/angular/directives/repeatComplete.js
//
"use strict";angular.module("allrecipes").directive("repeatComplete",function(){return{restrict:"A",link:function(c,b,a){if(c.$last===true){console.debug("repeat complete");
c.$evalAsync(a.repeatComplete)}}}});
//
// source/angular/directives/initialReviews.js
//
"use strict";angular.module("allrecipes").directive("arInitialReviews",[function(){return function(c,b,a){c.clearReviews=function(){b.empty()
}}}]);
//
// source/angular/controllers/recipeToolBarCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_controllers_recipe_toolbar",["$scope","$window","arLogin","$location","$anchorScroll","arRecipeBoxStorage","ngDialog","ar_services_environment","datalayerEvent","ar_tracking_metadata",function(c,d,g,b,a,i,o,e,n,f){c.saved=false;
c.enableNavPhotoUpload=g.ensureUserIsLoggedIn();c.printServings="";c.printMetrics="";c.init=function(q,s,r){c.recipeId=q;c.recipeSponsorId=r;
i.hasRecipeId(q,s).then(function(t){c.saved=t});d.pubsub.listen("Recipe.Heart.ClickEvent","RecipeToolBar.Controller",p)};var p=function(q){if(c.recipeId===q.recipeId){c.saved=!c.saved
}};c.saveOnClick=function(r,u,t,q){n.pushRegistrationSourceClick("rd_saver_bar");var s={recipeId:r,recipeSponsorId:c.recipeSponsorId,type:u,title:t,imageurl:q};
if(c.saved){l(s,true)}else{l(s,false)}if(!g.isLoggedIn()){d.segmentAnalytics.track("Sign In and Registration",{regSource:"3623",registrationId:"ALR_SitePlacement_rd_saver_bar",category:"Sign In and Registration",label:"Registration Started"})
}};function l(q,r){var s={category:f.contentType,contentType:f.contentType,contentSource:q.recipeSponsorId,contentCmsId:q.recipeId,label:""};
if(r){s.label="Recipe Remove Bar";d.segmentAnalytics.track("Recipe Save",s);d.pubsub.broadcast("A.Recipe.Remove.ClickEvent",[{recipeID:q.recipeId,type:q.type}])
}else{s.label="Recipe Save Bar";d.segmentAnalytics.track("Recipe Save",s);d.pubsub.broadcast("A.Recipe.Save.ClickEvent",[{recipeID:parseInt(q.recipeId),type:q.type,title:q.title,imageUrl:q.imageurl,source:"sticky nav 1"}])
}}function j(){n.pushRegistrationSourceClick("rd_imadeit_bar");var q={category:"Recipe",contentType:"Recipe",contentCmsId:c.recipeId,label:"Made It - Ribbon",contentSource:c.recipeSponsorId};
d.segmentAnalytics.track("Made it",q);if(!g.isLoggedIn()){d.segmentAnalytics.track("Registration Started",{category:"Sign In and Registration",label:"Registration Started",regSource:"3633",registrationId:"ALR_SitePlacement_rd_imadeit_bar"})
}}function k(){var q={category:"Recipe",contentType:"Recipe",contentCmsId:c.recipeId,contentSource:c.recipeSponsorId,label:"Print Preview"};
d.segmentAnalytics.track("Print Click",q)}function m(q){var r={category:"Recipe",contentType:"Recipe",contentCmsId:c.recipeId,label:q};
d.segmentAnalytics.track("Social Share",r)}c.rateItOnClick=function(r){n.pushRegistrationSourceClick("rd_rateit_bar");var q={showModal:r,fromStickyNav:true,clickSource:"Rate It - Ribbon - "};
d.pubsub.broadcast("A.Recipe.RateAndReview.ClickEvent",[q]);if(!r){q.deferredActionName="OpenRatingSection";var s=(window.location.href.indexOf("?")<0?"?":"&")+"deferred="+JSON.stringify(q);
g.goToAuthorizationWelcomePage(encodeURIComponent(window.location.href+s))}else{b.hash("recipe-toolbar");a()}};c.addPicOnClick=function(q){d.pubsub.broadcast("A.Recipe.AddPhoto.ClickEvent",[{files:q,source:"sticky nav 3"}])
};c.printRecipe=function(q){k();d.location.href="print/?recipeType="+q+"&"+c.$parent.printServings+"&"+c.$parent.printMetrics
};c.PinterestTargetParams="toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=750,height=700";c.FacebookTargetParams="toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=555,height=300";
c.socialShareNavigate=function(r,t,s,q){m(q);d.open(r,t,s)};c.printCss=function(){c.isPrint=true;var s=navigator.userAgent.toLowerCase();
var q=/android/i;var r=q.exec(s);if(r==="android"){c.isPrint=false}};c.madeItClick=function(){j();d.pubsub.broadcast("A.MadeIt.Add.Event",["Made It - Ribbon - "])
};c.keyBuffer=[];c.crtlP=[17,80];function h(q,r){return !(q<r||r<q)}d.addEventListener("keydown",function(q){if(q.keyCode===17||q.keyCode===80){c.keyBuffer.push(q.keyCode)
}var r=angular.element(document.querySelectorAll("#print-recipe")).attr("ng-href");if(h(c.crtlP,c.keyBuffer)&&r!==undefined&&r!==null){q.preventDefault();
d.location.href=r}})}]);
//
// source/angular/services/facebookapi-service.js
//
"use strict";angular.module("allrecipes").service("ar_facebook_api_service",["$window",function(a){a.fbAsyncInit=function(){FB.init({appId:66102450266,status:true,cookie:true,xfbml:true,version:"v2.8",})
};(function(b,g,e){var f,c=b.getElementsByTagName(g)[0];if(b.getElementById(e)){return}f=b.createElement(g);f.id=e;f.src="//connect.facebook.net/en_US/sdk.js";
c.parentNode.insertBefore(f,c)}(document,"script","facebook-jssdk"));return{openIMadeItShare:function(c,b){a.FB.ui({method:"share_open_graph",action_type:"allrecipes:make",action_properties:JSON.stringify({recipe:c})},function(){if(b){b()
}})}}}]);
//
// source/angular/services/ingredient-provider.js
//
"use strict";angular.module("allrecipes").factory("ar_services_ingredients",["ar_services_environment","$resource","ar_services_token",function(b,a,c){var d=b.url+"v1/recipes/:recipeId";
return a(d,{servings:"@servings",ismetric:"@ismetric"},{query:{url:d,method:"GET",isArray:false,headers:{Authorization:function(){var e=c.token();
return e}}},getNutrition:{url:d+"?fields=nutrition",method:"GET",isArray:false,headers:{Authorization:function(){var e=c.token();
return e}}}})}]);
//
// source/angular/services/review-provider.js
//
"use strict";angular.module("allrecipes").factory("ar_services_reviews",["$http",function(a){var b=function(e,c,d,f,g){var h="/recipe/getreviews/?recipeid="+e+"&pagenumber="+c+"&pagesize="+d+"&recipeType="+f;
if(g){h+="&sortBy="+g}return a.get(h)};return{getReviews:b}}]).factory("ar_rest_services_reviews",["ar_services_environment","$resource","ar_services_token",function(b,a,c){var d=b.url+"v1/reviews/:reviewId/";
return a(d,{recipeId:"@recipeId",userid:"@userid"},{save:{url:d,method:"POST",isArray:false,headers:{Authorization:function(){var e=c.token();
return e}}},remove:{url:d,method:"DELETE",isArray:false,headers:{Authorization:function(){var e=c.token();return e}}},privateProfile:{url:b.url+"v1/users/me/reviews",method:"GET",isArray:false,headers:{Authorization:function(){var e=c.token();
return e}}},publicProfile:{url:b.url+"v1/users/:userid/reviews",method:"GET",isArray:false,headers:{Authorization:function(){var e=c.token();
return e}}}})}]);
//
// source/angular/services/reviewhelpful-provider.js
//
"use strict";angular.module("allrecipes").factory("ar_services_review_helpful",["ar_services_environment","$resource","ar_services_token",function(b,a,c){var d=b.url+"v2/recipes/:recipeId/reviews/:reviewId/user/:guid/increment-helpful-count-anon";
return a(d,{recipeId:"@recipeId",reviewId:"@reviewId",guid:"@guid"},{save:{url:d,method:"POST",isArray:false,headers:{Authorization:function(){var e=c.token();
return e}}}})}]);
//
// source/angular/services/reviewsave-provider.js
//
"use strict";angular.module("allrecipes").factory("ar_services_review_rating",["ar_services_environment","$resource","ar_services_token",function(b,a,c){return a(b.url+"v1/recipes/:recipeId/reviews",{recipeId:"@recipeId"},{save:{url:b.url+"v1/recipes/:recipeId/reviews",method:"POST",isArray:false,headers:{Authorization:function(){var d=c.token();
return d}}},getLatestReviewsCount:{url:b.url+"v1/users/me/reviews/?latestReviewsCountOnly=:latestReviewsCountOnly",method:"GET",isArray:false,headers:{Authorization:function(){var d=c.token();
return d}}},savePersonalRecipeReview:{url:b.url+"v1/personal-recipes/:recipeId/reviews",method:"POST",isArray:false,headers:{Authorization:function(){var d=c.token();
return d}}}})}]);
//
// vendor/jquery/plugins/moment.js
//
Date.prototype.addMinutes=function(a){return new Date(this.getTime()+(a*60*1000))};Date.prototype.addHours=function(a){return new Date(this.getTime()+(a*60*60*1000))
};Date.prototype.addDays=function(a){return new Date(this.getTime()+(a*24*60*60*1000))};Date.prototype.from=function(a){var e=this.getTime()-a.getTime();
var f={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};
function d(j,h){var i=f[j];var g=i.replace(/%d/i,h);return g}function b(i,j){var h=i>0;var k=f[h?"future":"past"];var g=k.replace(/%s/i,j);
return g}function c(k){var m=Math.round(Math.abs(k)/1000);var l=Math.round(m/60);var j=Math.round(l/60);var h=Math.round(j/24);
var n=Math.round(h/365);var g=m<45&&["s",m]||l===1&&["m"]||l<45&&["mm",l]||j===1&&["h"]||j<22&&["hh",j]||h===1&&["d"]||h<=25&&["dd",h]||h<=45&&["M"]||h<345&&["MM",Math.round(h/30)]||n===1&&["y"]||["yy",n];
var i=d.apply({},g);i=b(k,i);return i}return c(e)};
//
// source/angular/controllers/reviewDetailCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_controllers_review_details",["$scope",function(a){a.showSortFiltersStyle="collapsed";
a.indicatorStyle="icon--chevron-down";a.toggleDisplayText="Sort";a.toggleShowSortOptions=function(){if(a.showSortFiltersStyle=="collapsed"){c()
}else{b()}};var c=function(){a.filterDisplayStatus="visible";a.toggleDisplayText="Hide";a.showSortFiltersStyle="exposed";a.indicatorStyle="icon--chevron-up"
};var b=function(){a.filterDisplayStatus="hidden";a.toggleDisplayText="Sort";a.showSortFiltersStyle="collapsed";a.indicatorStyle="icon--chevron-down"
}}]);
//
// source/angular/services/ads-service.js
//
"use strict";angular.module("allrecipes").factory("ads",["adConfiguration","$window",function(b,a){var f=function(){return Math.floor((Math.random()*3)-1)
};var d=function(m,l){if(m<=0){return[]}var k=(m/3);if(l>k){l=k}var h=2;if(l>0){h=Math.ceil(m/l)}var g=[2+f()];for(var j=1;j<l;
j++){g.push(g[g.length-1]+h+f())}return g};var e=b.settings.responsiveGridSlots;var c={desktop:["div-gpt-lazy-square-fixed-tier1","div-gpt-lazy-square-fixed-tier3","div-gpt-lazy-square-fixed-tier4"],mobile:["div-gpt-lazy-mob-square-fixed-tier1","div-gpt-lazy-mob-square-fixed-tier3","div-gpt-lazy-mob-square-fixed-tier4"]};
return{arrayWithAdsInserted:function(m){var h=d(m.length,b.settings.responsiveGridSlots);var l;var n;var j=(a.karma.config.isMobile)?"mobile":"desktop";
for(var k=0;k<h.length;k++){var g="grid-ad";e+=1;l="ad-recipe-grid-responsive-"+(k+1).toString();n=c[j][k%3];m.splice(h[k],0,{type:"ad",adClass:g,id:l,adType:n,itemType:"ad"})
}return m},refreshResponsiveAdSlot:function(g,h,i){if((i==="desktop"&&!a.karma.config.isDesktop)||(i==="desktop-tablet"&&a.karma.config.isMobile)||h===undefined){return
}a.karma.cmd.push(function(){var j=b.settings.lazyLoadTargeting;a.karma.createSlot(h,g,true,j)})}}}]);
//
// source/angular/controllers/ReviewModalCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_controllers_review_modal",["$scope","$window","$cookies","ar_services_recipe_review","ar_services_review_helpful","datalayerEvent","largeNumberDisplayFilter","ngDialog","reviewsInitialSet","ar_tracking_metadata",function(b,c,a,d,e,m,p,u,B,f){if(typeof c.karma.purgeRefreshSlots==="function"){c.karma.purgeRefreshSlots()
}var s=["January","February","March","April","May","June","July","August","September","October","November","December"];var C="https://images.media-allrecipes.com/ar-images/icons/rating-stars/";
var v=9;var z={HelpfulCountDescending:[],RatingAscending:[],RatingDescending:[],DatePostUpdatedDescending:[]};var A={HelpfulCountDescending:0,RatingAscending:0,RatingDescending:0,DatePostUpdatedDescending:0};
var r={MostHelpful:"HelpfulCountDescending",MostPositive:"RatingDescending",LeastPositive:"RatingAscending",Newest:"DatePostUpdatedDescending"};
b.sortBy=r[b.ngDialogData.pageSortOrder];var x=B.recipeId;b.sortTypeData={HelpfulCountDescending:o("Most helpful","recipe review detail sort - most helpful"),RatingDescending:o("Most positive","recipe review detail sort - most positive"),RatingAscending:o("Least positive","recipe review detail sort - least positive"),DatePostUpdatedDescending:o("Newest","recipe review detail sort - newest")};
b.isOpen=false;b.isHelpful=false;b.isShareBlockOpen=false;b.shareIcon="svg-icon--recipe-navbar--share svg-icon--recipe-navbar--share-dims";
b.adSlot1=(c.innerWidth>768)?"div-gpt-lazy-square-fixed-tier3":"div-gpt-lazy-mob-square-fixed-tier3";b.adSlot2="div-gpt-lazy-square-fixed-tier4";
b.imageUrls={fullStarImageUrl:C+"full-star-2015.svg",halfStarImageUrl:C+"half-star-2015.svg",emptyStarImageUrl:C+"empty-star.svg",heroImageUrl:B.heroImage,recipeImageUrl:B.recipeImageUrl};
b.reviewImage=b.imageUrls.heroImageUrl||b.imageUrls.recipeImageUrl;b.currentIndex=b.ngDialogData.indexToOpen;b.recipeTitle=B.recipeTitle;
b.totalReviews=B.totalReviews;b.styles={heroImage:{"background-image":"url("+b.imageUrls.heroImageUrl+")"}};if(B.reviews.MostHelpfulPositive&&B.reviews.MostHelpfulNegative){z.HelpfulCountDescending[B.reviews.MostPositiveIndex-1]=B.reviews.MostHelpfulPositive;
z.HelpfulCountDescending[B.reviews.MostCriticalIndex-1]=B.reviews.MostHelpfulNegative}b.prev=function(){t(-1);y();h(x,b.review.reviewID)
};b.next=function(){t(1);y();g(x,b.review.reviewID)};b.sort=function(E){if(b.sortBy==E){b.currentIndex=0}A[b.sortBy]=b.currentIndex;
b.currentIndex=A[E];b.isOpen=false;b.sortBy=E;n(b.currentIndex,D);y();j(x,b.review.reviewID,E)};b.clickHelpful=function(){if(!b.isHelpful){b.saved=e.save({recipeId:x,reviewId:b.review.reviewID,guid:a.get("ARSiteUser")});
b.saved.$promise.then(function(){b.isHelpful=true;b.review.helpfulCount++},function(E){b.ClickHelpfulErrorMessage=E.data.message
})}};b.formatNumber=function(E){return p(E)};b.openSelect=function(){b.isOpen=!b.isOpen};b.closeModal=function(){u.closeAll()
};b.openShareBlock=function(){b.isShareBlockOpen=!b.isShareBlockOpen;b.isShareBlockOpen?b.shareIcon="svg-icon--recipe-navbar--share_icon-wh svg-icon--recipe-navbar--share_icon-wh-dims":b.shareIcon="svg-icon--recipe-navbar--share svg-icon--recipe-navbar--share-dims"
};b.profileIconClick=function(){c.location.href=b.review.submitter.profileUrl};function y(){c.karma.refresh()}function t(E){var F=b.currentIndex+E;
if(F<0){F=b.totalReviews-1}else{if(F>b.totalReviews-1){F=0}}n(F,D)}function n(F,E){if(!z[b.sortBy][F]){q(F,E)}else{if(E){E(F)
}}}function q(G,F){var H=Math.ceil((G+1)/v);if(H>0){var E={recipeId:x,page:H,pagesize:v,sorttype:b.sortBy};d.getReviews(E).$promise.then(function(K){for(var J=0;
J<K.reviews.length;J++){var L=K.reviews[J];var I=new Date(Date.parse(L.dateLastModified));L.dateLastModified=s[I.getMonth()]+" "+I.getDate()+", "+I.getFullYear();
z[b.sortBy][(H-1)*v+J]=K.reviews[J]}if(F){F(G)}})}}function w(F){var E=c.document.createElement("a");E.href=F;return E.href}function o(F,E){return{display:F,biVal:E}
}var D=function(E){b.currentIndex=E;b.isHelpful=false;b.review=z[b.sortBy][b.currentIndex];b.reviewDetailUrl=w("reviews/"+b.review.reviewID);
b.reviewTitle=b.recipeTitle+" - Review by "+b.review.submitter.name};function i(F){m.push("recipe review detail nav","recipe review detail","Action Complete",F,null,b.reviewDetailUrl,null,null,null,{page:b.currentIndex});
var E=k(x,F);c.segmentAnalytics.page(E)}function g(F,G){var E=k(F,G);c.segmentAnalytics.page(E)}function h(F,G){var E=k(F,G);
c.segmentAnalytics.page(E)}function j(G,H,F){m.push("recipe review detail sort",b.sortTypeData[F].biVal,"Action Complete",H);
var E=l(G,H,"Sort");c.segmentAnalytics.track("Reviews Viewed",E)}function l(F,G,E){return{category:"Recipe",contentType:"Recipe",contentCmsId:G,linkedCmsId:F,contentSource:b.ngDialogData.recipeSponsorId,label:E}
}function k(E,F){return{path:window.location.pathname+"reviews/"+F,contentAdKeys:window.segment.contentAdKeys,contentCmsId:F,contentCmsCategory:f.contentType,contentCmsSubCategory:"",contentFeaturedImage:b.imageUrls.heroImageUrl,contentHeadline:document.title,contentSource:b.ngDialogData.recipeSponsorId,contentType:"Reviews",contentSubType:"",contentAuthorName:"",contentCmsTags:"",contentCmsTerms:"",contentIsPost:"post",contentPublishedDate:"",contentModifiedDate:"",contentPublishedDateFormatted:"",contentModifiedDateFormatted:"",contentSyndicated:"",contentSyndicatedBrand:"",contentSyndicatedUrl:"",contentNlpCategories:"",contentNlpEntities:"",contentNlpPayload:"",contentNlpSentimentLabel:"",linkedCmsId:f.contentId,dayOfWeek:window.dataLayer.page.pageInfo.dayOfWeek,hourOfDay:window.dataLayer.page.pageInfo.hourOfDay,meredithApplication:"Dot Net Modal"}
}n(b.currentIndex,function(E){D(E);i(b.review.reviewID)})}]);
//
// source/angular/services/recipereview-provider.js
//
"use strict";angular.module("allrecipes").factory("ar_services_recipe_review",["ar_services_environment","$resource","ar_services_token",function(b,a,c){var d=b.url+"v1/recipes/:recipeId/reviews/?page=:page&pagesize=:pagesize&sorttype=:sorttype";
return a(d,{recipeId:"@recipeId",page:"@page",pagesize:"@pagesize",sorttype:"@sorttype"},{getReviews:{url:d,method:"GET",isArray:false,headers:{Authorization:function(){var e=c.token();
return e}}}})}]);
//
// source/angular/services/perishable-sessionstorage-service.js
//
"use strict";angular.module("allrecipes").factory("perishableSessionStorage",["$window",function(a){var b=a.sessionStorage;return{setObj:function(c,d){if(b&&b.setItem){b.setItem(c,JSON.stringify(d))
}},getObj:function(c){var d=null;if(b&&b.getItem){d=JSON.parse(b.getItem(c))}return d},removeObj:function(c){if(b&&b.removeItem){b.removeItem(c)
}}}}]);
//
// source/angular/directives/loadDomScript.js
//
"use strict";angular.module("allrecipes").directive("loadDomScript",function(){var a=function(b){return function(d){if(d){b.empty();
var c=document.createElement("script");c.src=d;c.type="text/javascript";b[0].appendChild(c)}}};return{restrict:"A",scope:{script:"="},link:function(c,b){c.$watch("script",a(b))
}}});
//
// source/angular/controllers/similarRecipesCtrl.js
//
angular.module("allrecipes").controller("ar_controller_similar_recipes",["$scope","$window","datalayerEvent","lazyloadtrigger",function(a,b,c,d){a.init=function(e){a.segmentContentInfo=e
};a.handleScroll=function(e){d.triggerLazyLoad(500)}}]);
//
// source/angular/services/recipephotos-provider.js
//
"use strict";angular.module("allrecipes").factory("ar_services_recipe_photos",["ar_services_environment","$resource","ar_services_token",function(b,a,c){var d=b.url+"v1/recipes/:recipeId/photos?page=:page&pagesize=:pagesize";
return a(d,{recipeId:"@recipeId",page:"@page",pagesize:"@pagesize"},{getMoreResults:{url:d,method:"GET",isArray:false,headers:{Authorization:function(){var e=c.token();
return e}}}})}]);
//
// source/angular/services/photoDetailModal-service.js
//
"use strict";angular.module("allrecipes").factory("ar_services_photo_detail_modal",["ar_services_recipe_photos",function(b){var a=function(d){for(var c=0;
c<d.length;c++){if(d[c].height==250){return d[c].url}}return d[0].url};return{getPhotos:function(e,g,c){var f=[];var d=b.getMoreResults(e).$promise.then(function(k){if(k&&k.photos){var j;
for(var h=0;h<k.photos.length;h++){j={photoIndex:(e.pagesize*(e.page-1))+h,photoId:k.photos[h].photoID,smallPhotoUrl:a(k.photos[h].urls),url:k.photos[h].urls[k.photos[h].urls.length-1].url,description:k.photos[h].description,submitter:{name:k.photos[h].submitter.name,userId:k.photos[h].submitter.userID,profileUrl:k.photos[h].submitter.profileUrl,photoUrl:k.photos[h].submitter.photo.urls.length>1?k.photos[h].submitter.photo.urls[1].url:k.photos[h].submitter.photo.urls[0].url,city:k.photos[h].submitter.city,region:k.photos[h].submitter.region,madeRecipesCount:k.photos[h].submitter.madeRecipesCount,followingCount:k.photos[h].submitter.followingCount,favoritesCount:k.photos[h].submitter.favoritesCount}};
f.push(j)}}g(k.metaData.totalCount,f)},c)}}}]);
//
// source/angular/directives/photoUploadIsLoggedIn.js
//
"use strict";angular.module("allrecipes").directive("photoUploadIsLoggedIn",["arLogin",function(a){return{scope:{photoUploadDeferredAction:"@"},link:function(d,c,b){c.on("click",function(e){if(!a.isLoggedIn()){e.preventDefault();
var f=((window.location.href.indexOf("?")<0)?"?":"&")+"deferred="+d.photoUploadDeferredAction;a.goToAuthorizationWelcomePage(encodeURIComponent(window.location.href+f));
return false}})}}}]);
//
// source/angular/services/recommendedRecipesService.js
//
"use strict";angular.module("allrecipes").factory("recommendedRecipesService",["ar_services_environment","ar_services_token","$http",function(b,c,a){return{getRecommendedRecipes:function(d){var e=b.url+"v1/recommended-recipes";
return a.post(e,d,{headers:{Authorization:c.token}})}}}]);
//
// source/angular/directives/rightRailFeed.js
//
"use strict";angular.module("allrecipes").directive("rightRailFeed",["ar_services_environment","arLogin","ipCookie","$window","datalayerEvent","lowercaseNoSpacesFilter",function(b,c,f,a,d,g){function e(o,h){o.sendRegistrationTracking=function(i){d.pushRegistrationSourceClick(i)
};var j="";var l="rr_feed_recipe";l+=h.isStickyRightRail?"_sb":"";for(var k=0;k<h.items.length;k++){var m=h.items[k];var n=h.referringId;
j+="rc-"+m.id+",";m.url+="?clickId=right rail"+k+"&internalSource="+l+"&referringId="+n+" referringContentType=recipe";if(!m.cookThumbnailUrl){m.cookThumbnailUrl=m.baseImagesUrl+"/mobile/allrecipes/images/icon-user-default_v2.png"
}if(m.cookId!==0){m.cookProfileUrl=m.baseSiteUrl+"/cook/"+m.cookId+"/"}}o.recipes=h.items||[];a._satellite.setVar("impression_var",j);
a._satellite.track("rr_feed")}return{restrict:"E",templateUrl:b.scriptServerUrl+"assets/source/angular/templates/RightRailFeed.html",link:function(k,i,h){if(h.myFeedData!==undefined){var j=JSON.parse(h.myFeedData);
if(j&&j.items&&j.items.length){e(k,j);l()}}function l(){setTimeout(function(){window.dispatchEvent(new Event("scroll"))},500)
}}}}]);
//
// source/angular/services/recipe-notes-provider.js
//
"use strict";angular.module("allrecipes").factory("ar_recipe_notes_provider",["ar_services_environment","$resource","ar_services_token",function(b,a,c){var e=b.url+"/v1/users/me/recipe-box/recipes/:recipeId/note";
var d=a(e,{recipeId:"@recipeId",RecipeNote:"@itemNote"},{save:{url:e,method:"POST",isArray:false,headers:{Authorization:function(){var f=c.token();
return f}}},get:{url:e,method:"GET",isArray:false,headers:{Authorization:function(){var f=c.token();return f}}}});return{get:function(f){return d.get({recipeId:f})
},save:function(f,g){return d.save({recipeId:f,RecipeNote:g})}}}]);
//
// source/angular/controllers/recipeNotesCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_controllers_recipe_notes",["$scope","$window","arRecipeBoxStorage","ar_recipe_notes_provider","ar_services_environment","ngDialog","arLogin","datalayerEvent",function(a,b,f,g,d,o,e,j){var c="Add a note";
var k="Edit my note";var m="add edit note";var l="Action Complete";a.init=function(t,v,u){a.displayNote=v==="recipe";a.recipeSponsorId=u;
b.pubsub.listen("Recipe.Heart.ClickEvent","RecipeToolBar.Controller",n);if(!b.pubsub.isListening("A.Recipe.AddEditNote.ClickEvent","RecipeNotes.Controller")){b.pubsub.listen("A.Recipe.AddEditNote.ClickEvent","RecipeNotes.Controller",a.openNoteModal)
}a.model={recipeId:t,addEditText:c};if(a.displayNote){f.hasRecipeId(a.model.recipeId,"recipe").then(function(w){if(w){g.get(a.model.recipeId).$promise.then(function(x){angular.extend(a.model,{itemNote:x.itemNote,itemNoteEditing:x.itemNote});
if(x.itemNote){angular.extend(a.model,{addEditText:k})}})}})}};var s=function(t){if(a.model.addEditText===c){j.pushAndBlockImpressionTrace("add note",a.model.recipeId,t,"add recipe note","add note")
}else{j.pushAndBlockImpressionTrace("edit note",a.model.recipeId,t,"edit recipe note","edit note")}};function r(v,u){var t={category:"Recipe",contentType:"Recipe",contentCmsId:v,label:u,contentSource:a.recipeSponsorId?a.recipeSponsorId:null};
b.segmentAnalytics.track("Recipe Interaction",t)}function h(u,t){s(m);r(u,t)}function i(u,t){s(l);r(u,t)}a.openNoteModal=function(){if(!e.isLoggedIn()){j.pushRegistrationSourceClick("rd_note");
b.segmentAnalytics.track("Sign In and Registration",{regSource:"3636",registrationId:"ALR_SitePlacement_rd_note",category:"Sign In and Registration",label:"Registration Started"});
var u=(b.location.href.indexOf("?")<0?"?":"&")+"deferred="+JSON.stringify({deferredActionName:"OpenRecipeNote"});e.goToAuthorizationWelcomePage(encodeURIComponent(b.location.href+u))
}else{var t={template:d.scriptServerUrl+"assets/source/angular/templates/RecipeNotes.html",className:"ngdialog-theme-default ngdialog-theme-notes",scope:a,controller:"ar_controllers_recipe_notes"};
var v=a.model.addEditText===c?"Note Added":"Note Edited";h(a.model.recipeId,v);o.openConfirm(t)}};var n=function(t){if(!t.doNotRemoveNote){a.model.addEditText=c;
a.model.itemNote=null;a.model.itemNoteEditing=null}};a.cancelEdit=function(){o.closeAll()};var q=function(t){a.$emit("notify","Note saved.",null,"success");
a.model.itemNote=a.model.itemNoteEditing;var u=a.model.addEditText===c?"Note Saved":"Note Updated";i(a.model.recipeId,u);if(a.model.itemNoteEditing){a.model.addEditText=k
}else{a.model.addEditText=c}f.hasRecipeId(a.model.recipeId,"recipe").then(function(v){if(!v){f.add(a.model.recipeId,"recipe");
b.pubsub.broadcast("Recipe.Heart.ClickEvent",[{recipeId:a.model.recipeId,doNotRemoveNote:true}])}});o.closeAll()};var p=function(t){o.closeAll()
};a.save=function(){g.save(a.model.recipeId,a.model.itemNoteEditing).$promise.then(q,p)}}]);
//
// source/angular/directives/tastesAndRecommendationsAfterSaving.js
//
"use strict";angular.module("allrecipes").directive("tastesAndRecommendationsAfterSaving",["ar_services_environment",function(a){return{restrict:"E",replace:true,controller:"ar_tastes_and_recommendations_after_save_controller",scope:{},link:function(d,c,b){d.recipeId=b.recipeId
},templateUrl:a.scriptServerUrl+"assets/source/angular/templates/RecommendationsAfterSave.html"}}]);
//
// source/angular/controllers/tastesAndRecommendationsAfterSaveCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_tastes_and_recommendations_after_save_controller",["$scope","$window","$timeout","$q","arRecipeSave","carousel_scroller_manager_service","recommendedRecipesService","ar_services_taste_pref_cookie","arLogin","ar_rest_services_preferences","datalayerEvent","taste_toggle_service",function(b,d,c,a,h,i,o,f,g,e,k,p){b.topTaste=d.AR.topTaste;
if(!(b.topTaste&&b.topTaste.DisplayText&&b.topTaste.Abbreviation)){return}b.init=function(q){b.recipeId=q};var m=0.25,l=a.defer(),n=l.promise,j=h.registerForCollectionDialogDismissedEvent();
b.currentTastes=f.getCookie(g.userId);b.topTaste.isSelected=b.currentTastes?b.currentTastes.split(",").indexOf(b.topTaste.Abbreviation)>-1:false;
if(b.isFollowing){return}b.showMe=false;b.toggleFollowing=function(){b.topTaste.isSelected=!b.topTaste.isSelected;p.toggle(b.topTaste.Abbreviation,b.topTaste.isSelected).then(function(q){k.pushFollowTastePref("post-save taste",b.recipeId,!b.isFollowing,null,b.topTaste.DisplayText)
},function(q){b.$broadcast("notify","Oops! Something went wrong. Taste preferences did not save. Please try again later",3000,"failure")
})};h.registerForSavingEvent().then(function(){o.getRecommendedRecipes([b.topTaste.Abbreviation]).then(function(q){if(q.status&&q.status===200){l.resolve(q)
}else{l.reject(q)}})});a.all([j,n]).then(function(r){b.recipes=r[1].data.items;for(var q=0;q<b.recipes.length;q++){b.recipes[q].wholeStars=new Array(Math.floor(b.recipes[q].rating));
b.recipes[q].showHalfStar=(b.recipes[q].rating-b.recipes[q].wholeStars.length)>m}if(b.recipes.length){b.showMe=true;c(function(){i.triggerScrollInitialize("recommendedTastes")
})}})}]);
//
// source/angular/directives/noFollowIfExternal.js
//
"use strict";angular.module("allrecipes").directive("noFollowIfExternal",[function(){return{restrict:"A",link:function(e,b,a){var d=true;
if(a.ngHref&&a.ngHref!==""){d=c(a.ngHref)}else{if(a.href&&a.href!==""){d=c(a.href)}}if(d){b.attr("rel","nofollow")}return;function c(f){var h=new RegExp("(http|https)://?(.*).allrecipes(.[a-zA-z]{2,3})");
var g=f.match(h);return(g===null)}}}}]);
//
// source/angular/directives/allStarNotification.js
//
"use strict";angular.module("allrecipes").directive("arAllStar",["ar_services_environment",function(a){return{restrict:"E",replace:true,scope:{togglerId:"@"},link:function(c,b){c.closeNotification=function(){c.isShowNotification=false
};c.clickClose=function(){c.closeNotification()};c.clickNotification=function(){showNotification()};c.showNotification=function(){c.isShowNotification=true
}},templateUrl:a.scriptServerUrl+"assets/source/angular/templates/AllStarNotification.html"}}]);
//
// source/angular/controllers/directionsCtrl.js
//
"use strict";angular.module("allrecipes").controller("ar_controllers_directions",["$scope","$window",function(a,b){a.init=function(c,d){a.recipeId=c;
a.recipeSponsorId=d};a.biTracking=function(c){var e=c?"Directions Clicked":"Directions Unclicked";var d={category:"Recipe",contentType:"Recipe",contentCmsId:a.recipeId,label:e,contentSource:a.recipeSponsorId};
b.segmentAnalytics.track("Recipe Interaction",d)}}]);
