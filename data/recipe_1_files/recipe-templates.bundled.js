angular.module('allrecipes').run(['$templateCache', 'ar_services_environment', function(templateCache, ar_services_environment) {templateCache.put(ar_services_environment.scriptServerUrl+"assets/source/angular/templates/IMadeItModal.html",'<div ng-init="init()"> <div ng-show="rateReview"> <div class="ngdialog-header"> <span class="svg-icon--recipe-page--imadeit-white svg-icon--recipe-page--imadeit-white-dims"></span><a>High Five! You\'ve made it <span ng-bind="madeIt.madeCount |largeNumberDisplay"></span> time<span data-ng-show="(madeIt.madeCount> 1)">s</span>.</a> </div> <div class="ngdialog-message"> <div class="rate-review"> <h2>Rate and review</h2> <span class="rate-review__description">Your rating</span> <span class="rate-review__rating-words" ng-bind="userReview.ratingWords"></span> <div class="rate-review__rating-stars"> <label id="star1" ng-class="ngDialogData.userReview.inProgressReview.styleStar1" title="One Star" class="rate-star-single"><input type="radio" name="rating" ng-model="userReview.ratingWords" value="Couldn\'t eat it" ng-click="starOnClick(1);"/></label> <label id="star2" ng-class="ngDialogData.userReview.inProgressReview.styleStar2" title="Two Stars" class="rate-star-single"><input type="radio" name="rating" ng-model="userReview.ratingWords" value="Didn\'t like it" ng-click="starOnClick(2);"/></label> <label id="star3" ng-class="ngDialogData.userReview.inProgressReview.styleStar3" title="Three Stars" class="rate-star-single"><input type="radio" name="rating" ng-model="userReview.ratingWords" value="It was OK" ng-click="starOnClick(3);"/></label> <label id="star4" ng-class="ngDialogData.userReview.inProgressReview.styleStar4" title="Four Stars" class="rate-star-single"><input type="radio" name="rating" ng-model="userReview.ratingWords" value="Liked it" ng-click="starOnClick(4);"/></label> <label id="star5" ng-class="ngDialogData.userReview.inProgressReview.styleStar5" title="Five Stars" class="rate-star-single"><input type="radio" name="rating" ng-model="userReview.ratingWords" value="Loved it" ng-click="starOnClick(5);"/></label> </div> <label for="user-review" class="rate-review__review-label">Your review (optional)</label> <textarea id="user-review" class="rate-review__review-text" ng-model="ngDialogData.userReview.inProgressReview.text" placeholder="Did you make any changes, and will you make it again?"></textarea> </div> </div> <div class="ngdialog-buttons"> <button ng-click="cancelRateAndReview()" type="button" class="btns-two-small ngdialog-button">Cancel</button> <button ng-click="saveReview()" type="button" class="btns-two-small ngdialog-button made-it-submit-button">Submit</button> </div> </div> <div class="made-it-success rate-review-confirmation-popup" ng-show="!rateReview"> <div class="ngdialog-header"> <a ng-click="closeThisDialog(\'undo\')">&nbsp;</a> </div> <div class="ngdialog-message"> <div class="made-it-image-container"> <div class="made-it-image-container__image-upload-display" ng-show="photoUploadData.hasUploadedPhoto" ng-style="photoUploadData.style"></div> <div class="svg-icon--cook-card--ar_icon_rate_wh" ng-hide="photoUploadData.hasUploadedPhoto"> <span class="svg-icon--recipe-navbar--rate_wh svg-icon--recipe-navbar--rate_wh-dims"></span> </div> <h2 ng-show="photoUploadData.hasUploadedPhoto">Looks great!</h2> <h2 ng-hide="photoUploadData.hasUploadedPhoto">Awesome!</h2> <h3 ng-hide="photoUploadData.hasUploadedPhoto">Thanks for your rating and review.</h3> </div> </div> <div class="ngdialog-buttons"> <h2>Can you leave a photo?</h2> <input type="file" class="photo-upload__input" id="madeItPhotoUpload" ng-file-select="onFileSelect($files)"> <label id="madeItPhotoUploadLabel" class="btns-two-small photo-upload__button" for="madeItPhotoUpload"> <span class="add-photo"> <span class="svg-icon--profile--photo_or svg-icon--profile--photo_or-dims"></span> </span> <span ng-bind="photoUploadData.hasUploadedPhoto ? \'Change photo\' : \'Upload photo\'"></span> </label> </div> </div> </div>');
templateCache.put(ar_services_environment.scriptServerUrl+"assets/source/angular/templates/RateAndReview.html",'<div ng-controller="ar_controllers_rate_and_review_modal"> <div class="ngdialog-header"> <h2>Rate, Review & Add Photo</h2> </div> <div class="ngdialog-message"> <span class="rate-review__description">Your rating</span> <span class="rate-review__rating-words" ng-bind="model.ratingWords"></span> <div class="rate-review__rating-stars"> <label id="star1" ng-class="model.inProgressReview.styleStar1" title="One Star"><input type="radio" name="rating" ng-model="model.ratingWords" value="Couldn\'t eat it" ng-click="starOnClick(1)"/></label> <label id="star2" ng-class="model.inProgressReview.styleStar2" title="Two Stars"><input type="radio" name="rating" ng-model="model.ratingWords" value="Didn\'t like it" ng-click="starOnClick(2)"/></label> <label id="star3" ng-class="model.inProgressReview.styleStar3" title="Three Stars"><input type="radio" name="rating" ng-model="model.ratingWords" value="It was OK" ng-click="starOnClick(3)"/></label> <label id="star4" ng-class="model.inProgressReview.styleStar4" title="Four Stars"><input type="radio" name="rating" ng-model="model.ratingWords" value="Liked it" ng-click="starOnClick(4)"/></label> <label id="star5" ng-class="model.inProgressReview.styleStar5" title="Five Stars"><input type="radio" name="rating" ng-model="model.ratingWords" value="Loved it" ng-click="starOnClick(5)"/></label> </div> </div> <label for="user-review" class="rate-review__review-label">Your review (optional)</label> <textarea id="user-review" class="rate-review__review-text" ng-model="model.inProgressReview.text" placeholder="Did you make any changes, and will you make it again?"></textarea> <input type="file" class="photo-upload__input" id="reviewPhotoUpload" ng-file-select="onFileSelect($files)"> <label ng-class="buttonClass" for="reviewPhotoUpload"> <span class="svg-icon--recipe-page--ar_icon_photo_wh svg-icon--recipe-page--ar_icon_photo_wh-dims"></span> <span ng-bind="buttonLabel"></span> </label> <div class="ngdialog-buttons"> <a class="btns-two-small ngdialog-button" ng-click="cancelEdit()">Cancel</a> <a class="btns-two-small ngdialog-button" ng-click="saveReview()">Submit</a> </div> </div>');
templateCache.put(ar_services_environment.scriptServerUrl+"assets/source/angular/templates/ReviewModal.html",'<section id="reviewModalDivider "> <div> <div class="review-modal-header" ng-style="styles.heroImage"> <h1> <div> Reviews for: <span class="recipeTitle" ng-bind="recipeTitle"></span> <span ng-click="closeModal()" class="reviewCloseButton"></span> </div> </h1> <div class="tabs"> <div ng-click="sort(\'HelpfulCountDescending\')" ng-class="{\'selected\':sortBy==\'HelpfulCountDescending\'}">Most helpful</div> <div ng-click="sort(\'RatingDescending\')" ng-class="{\'selected\':sortBy==\'RatingDescending\'}">Most positive</div> <div ng-click="sort(\'RatingAscending\')" ng-class="{\'selected\':sortBy==\'RatingAscending\'}">Least positive</div> <div ng-click="sort(\'DatePostUpdatedDescending\')" ng-class="{\'selected\':sortBy==\'DatePostUpdatedDescending\'}">Newest</div> </div> <div class="reviewModalMobileSort"> <div class="selectedSortDisplay" ng-click="openSelect()" ng-hide="isOpen==true"> <div ng-bind="sortTypeData[sortBy].display + \' reviews\'"></div> <div class="selectButton icon--chevron-down"></div> </div> </div> </div> <div class="options" ng-class="{\'openSelect\':isOpen==true}"> <div ng-click="sort(\'HelpfulCountDescending\')">Most helpful reviews</div> <div ng-click="sort(\'RatingDescending\')">Most positive reviews</div> <div ng-click="sort(\'RatingAscending\')">Least positive reviews</div> <div ng-click="sort(\'DatePostUpdatedDescending\')">Newest reviews</div> </div> <div class="modalContents"> <div class="reviewModalTextColumn"> <div class="nextPrevContainerMobile noselect"> <span class="btns-two-small modalNavBtn" ng-click="prev()" id="BI_loadReview4_left">Previous</span> <span class="btns-two-small modalNavBtn" ng-click="next()" id="BI_loadReview4_right">Next</span> </div> <a ng-click="profileIconClick()"> <div class="recipe-details-cook-stats-container"> <ul class="cook-details statsCard "> <li> <img class="img-profile elevate-cook-thumbnail cookImg" alt="profile image" ng-src="{{review.submitter.photo.urls[0].url}}" style="display: inline-block;"/> </li> <li> <h4 itemprop="author" ng-bind="review.submitter.name"></h4> <ul class="cook-details__followers followers-count"> <li> <span class="svg-icon--cook-card--follow svg-icon--cook-card--follow-dims" title="Followers"></span> </li> <li> <span ng-bind="formatNumber(review.submitter.followersCount)"></span> </li> </ul> <ul class="cook-details__favorites favorites-count"> <li> <span class="svg-icon--cook-card--heart svg-icon--cook-card--heart-dims" title="Favorites"></span> </li> <li> <span ng-bind="formatNumber(review.submitter.favoritesCount)"></span> </li> </ul> <ul class="cook-details__recipes-made recipes-made-count"> <li> <span class="svg-icon--cook-card--imadeit svg-icon--cook-card--imadeit-dims" title="Recipes Made"></span> </li> <li> <span ng-bind="formatNumber(review.submitter.madeRecipesCount)"></span> </li> </ul> </li> </ul> </div> </a> <div class="likeReview" ng-click="clickHelpful()" ng-class="{\'up\': isHelpful==true}"> <span class="svg-icon--actions--like svg-icon--actions--like-dims"></span> <div class="svg-icon--actions--like_white svg-icon--actions--like_white-dims"></div> <div class="button helpful-count reviewCount" itemprop="interactionCount" ng-bind="formatNumber(review.helpfulCount)"></div> </div> <a href="" class="review-share-toggle" data-ng-click="openShareBlock()" data-ng-class="isShareBlockOpen ? \'open\' : \'closed\'"> <span ng-class="shareIcon"></span> </a> <div class="reviewModalShareBlock" data-ng-class="isShareBlockOpen ? \'open\' : \'closed\'"> <div class="reviewModalShareBar"> <section ng-controller="ar_controllers_share_item" id="shareRecipe"> <section class="share-container"> <a ng-click="socialShareNavigate(urlGenerators.getPinterestUrl(reviewDetailUrl, reviewImage, reviewTitle, \'social-share-review-modal\'), \'_blank\', PinterestTargetParams, {category: \'Review\', contentType: \'review\', contentCmsId: review.reviewID, label: \'Pinterest\'}, {itemId: \'pinterest\', eventName: \'\', options: {reviewSocial: {reviewId: review.reviewID}}}, true);" class="pinterest"><span class="svg-icon--social--pinterest svg-icon--social--pinterest-dims"></span></a> <a ng-click="socialShareNavigate(urlGenerators.getFacebookUrl(reviewDetailUrl, \'social-share-review-modal\'), \'_blank\', FacebookTargetParams, {category: \'Review\', contentType: \'review\', contentCmsId: review.reviewID, label: \'Facebook\'}, {itemId: \'facebook\', eventName: \'\', options: {reviewSocial: {reviewId: review.reviewID}}}, true);" class="facebook"><span class="svg-icon--social--facebook svg-icon--social--facebook-dims"></span></a> <a ng-click="socialShareNavigate(urlGenerators.getTwitterUrl(reviewDetailUrl, reviewTitle, \'social-share-review-modal\'), \'_blank\', TwitterTargetParams, {category: \'Review\', contentType: \'review\', contentCmsId: review.reviewID, label: \'Twitter\'}, {itemId: \'twitter\', eventName: \'\', options: {reviewSocial: {reviewId: review.reviewID}}}, true);" class="twitter"><span class="svg-icon--social--twitter svg-icon--social--twitter-dims"></span></a> </section> </section> </div> <div class="detailLink"> <a ng-href="reviews/{{review.reviewID}}/" ng-bind="reviewDetailUrl"></a> </div> </div> <hr/> <div class="rating"> <img ng-src="{{ review.rating>=1 ? imageUrls.fullStarImageUrl : imageUrls.emptyStarImageUrl }}"/> <img ng-src="{{ review.rating>=2 ? imageUrls.fullStarImageUrl : imageUrls.emptyStarImageUrl }}"/> <img ng-src="{{ review.rating>=3 ? imageUrls.fullStarImageUrl : imageUrls.emptyStarImageUrl }}"/> <img ng-src="{{ review.rating>=4 ? imageUrls.fullStarImageUrl : imageUrls.emptyStarImageUrl }}"/> <img ng-src="{{ review.rating>=5 ? imageUrls.fullStarImageUrl : imageUrls.emptyStarImageUrl }}"/> <i ng-bind="review.dateLastModified"></i> </div> <p ng-bind="review.text" class="ReviewText"></p> <div class="nextPrevContainer noselect"> <span class="btns-two-small modalNavBtn" ng-click="prev()" id="BI_loadReview2_left">Previous</span> <span class="btns-two-small modalNavBtn" ng-click="next()" id="BI_loadReview2_right">Next</span> </div> </div> <div class="reviewModalAdColumn"> <div data-ad-container-autocollapse class="ad-review-page"> <sideloaded-ad ad-slot-hc-type="{{adSlot1}}" class="ad-recipe-page-middle-3 ad-review-page-modal" id="modalReviewAd"></sideloaded-ad> </div> <div data-ad-container-autocollapse class="ad-review-page"> <sideloaded-ad ad-slot-hc-type="{{adSlot2}}" platform="desktop-tablet" class="ad-recipe-page-middle-3 ad-review-page-modal ad-hide-mobile" id="modalReviewAd2"></sideloaded-ad> </div> <div class="nextPrevContainerMobile noselect"> <span class="btns-two-small modalNavBtn" ng-click="prev()" id="BI_loadReview3_left">Previous</span> <span class="btns-two-small modalNavBtn" ng-click="next()" id="BI_loadReview3_right">Next</span> </div> </div> </div> <div class="footer noselect"> <span ng-bind="currentIndex + 1"></span> / <span ng-bind="totalReviews"></span> </div> <div class="paddles noselect"> <div class="left" ng-click="prev()" id="BI_loadReview1_left"> <span class="icon--chevron-left"></span> </div> <div class="right noselect" ng-click="next()" id="BI_loadReview1_right"> <span class="icon--chevron-right"></span> </div> </div> </div> </section>');
templateCache.put(ar_services_environment.scriptServerUrl+"assets/source/angular/templates/RightRailFeed.html",'<div data-ng-show="recipes.length"> <h2 class="heading__h2--gutters rr-content"> <a data-internal-referrer-link="rr_tasteprefs" data-content-provider-id="{{recipe.contentProviderId}}" data-click-id="recipe breadcrumb 1" href="/cook/my/profile-settings/?tab=tastePrefs" target="_self" data-ng-hide="isAnonymous" data-ng-click="sendRegistrationTracking(\'rr_tasteprefs\')"> <span class="svg-icon--profile--gear-grey svg-icon--profile--gear-grey-dims"></span> </a> </h2> <div class="recommended-content"> <article ng-repeat="recipe in recipes" ng-cloak class="content-card recipe" aria-label="{{recipe.recipeTitle}}"> <a href="{{recipe.url}}" data-internal-referrer-link="RR Feed Recipe SB" data-content-provider-id="{{recipe.contentProviderId}}" data-click-id="right rail{{$index}}" class="ng-isolate-scope" target="_self"> <img class="content-card__image ng-isolate-scope" data-lazy-load="" data-original-src="{{recipe.imageUrl}}" alt="" title="{{recipe.recipeTitle}}"> <h3 class="content-card__h3">{{recipe.recipeTitle}}</h3> </a> <div data-star-rating data-rating="{{recipe.rating}}" data-review-count="{{recipe.reviewCount}}"></div> <div class="content-card-profile"> <a href="{{recipe.cookProfileUrl}}" data-internal-referrer-link="rr_feed_cook" data-content-provider-id="{{recipe.contentProviderId}}" data-click-id="right rail{{$index}}" class="ng-isolate-scope" target="_self"> <ul class="cook-pic-name"> <li> <img class="img-profile" alt="" ng-src="{{recipe.cookThumbnailUrl}}"> </li> <li> <h4><span>By </span>{{recipe.cookDisplayName}}</h4> </li> </ul> </a> </div> </article> </div> <a data-internal-referrer-link="rr_tasteprefs" data-content-provider-id="{{recipe.contentProviderId}}" data-referring-content-type="rr_recipe" href="/" target="_self" class="btns-one-small rr-content" aria-label="See all recommendations"></a> </div>');
templateCache.put(ar_services_environment.scriptServerUrl+"assets/source/angular/templates/RecommendationsAfterSave.html",'<div ng-cloak> <div ng-class="{\'tasteBlock\': true, \'open\' : showMe}"> <section class="recommended-tastes--details"> <h2 class="heading__h2--gutters recommended"> <a data-ng-click="toggleFollowing()" class="btns-one-small recommended" data-ng-class="{highlighted : topTaste.isSelected}"></a> <span><span class="ipad-landscape-up">Like </span>{{topTaste.DisplayText}} recipes? Follow to get personalized recommendations</span> </h2> <div class="recommended-tastes__wrap"> <div class="carousel-navigation"> <a carousel-scroll-left="recommendedTastes" data-ng-if="recommendedTastes_atLeftBound===false"> <div class="icon--chevron-left"></div> </a> <a carousel-scroll-right="recommendedTastes" data-ng-if="recommendedTastes_atRightBound===false"> <div class="icon--chevron-right"></div> </a> </div> <div class="recommended-tastes__container"> <div id="scrollDiv" carousel-scroll-target="recommendedTastes" scroll-event> <div id="insideScroll" class="grid slider"> <ul class="recipe-carousel"> <li data-ng-repeat="r in recipes" class="slider-card"> <div class="slider-card__recipes"> <a href="{{r.url}}?internalSource=RDPTasteCarousel&referringId={{recipeId}}" referring-id="{{recipeId}}" target="_self"> <img class="slider-card__img ng-isolate-scope" data-lazy-load="" data-original-src="{{r.imageUrl250x250}}" alt="{{r.description}}" title="{{r.recipeTitle}}" src="{{r.imageUrl250x250}}" data-container="similarRecipes"> <h3 data-ellipsis class="slider-card__h3">{{r.recipeTitle}}</h3> </a> <a href=""> <div class="slider-card__ratings" onclick="AnchorScroll(\'reviews\')"> <div data-star-rating data-rating="{{r.rating}}" onclick="AnchorScroll(\'reviews\')"></div> <span class="aggregate-rating">\' <meta content="{{r.reviewCount}}"> <span class="grid-col__reviews"><format-large-number number="{{r.reviewCount}}"></format-large-number></span> </span> </div> </a> </div> </li> </ul> </div> </div> </div> </div> </section> </div> </div>');
templateCache.put(ar_services_environment.scriptServerUrl+"assets/source/angular/templates/AllStarNotification.html",'<div class="arAllStar-section"> <div class="allStar-notification" ng-class="onBottom" popup-trigger="allStarNotification" data-ng-cloak data-ng-show="isShowNotification"> <div class="lo-message-box"> <div class="lo-msg-arrow-up"></div> <div class="lo-message-box__box"> <div class="lo-message-box__title"> <span>ALLRECIPES ALLSTAR</span> <a> <span class="icon--close" ng-click="clickClose();"></span></a> </div> <div class="lo-message-box__text"> This reviewer is an Allrecipes Allstar. Allstars are loyal community members selected to be brand ambassadors based on onsite participation, interest, and commitment. Allstars may be compensated for their participation in the Allrecipes Allstar Program. </div> </div> <div class="lo-msg-arrow-down"></div> </div> </div> <a class="display" ng-click="showNotification();" ng-mouseover="showNotification();" ng-mouseout="closeNotification();"> <span class="starIcon icon svg-icon--cook-card--allstar svg-icon--cook-card--allstar-dims"></span> <span class="allStarLabel">Allstar</span> </a> </div>');
templateCache.put(ar_services_environment.scriptServerUrl+"assets/source/angular/templates/RecipeNotes.html",'<div class="ngdialog-header notes--header"> <h2>My notes</h2> </div> <div class="ngdialog-message"> <textarea class="notes__text" ng-model="model.itemNoteEditing" placeholder="Add a note just for you." maxlength="500"></textarea> <div class="ngdialog-buttons"> <a class="btns-two-small ngdialog-button" data-ng-click="cancelEdit()">Cancel</a> <a class="btns-two-small ngdialog-button" data-ng-click="save()">Submit</a> </div> </div>');
}]);