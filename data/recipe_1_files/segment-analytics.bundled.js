//
// source/js/util/string-helper.js
//
"use strict";var StringHelper={};StringHelper.IsNullOrEmpty=function(a){return(a===null||a===undefined||a==="")};StringHelper.ToTitleCase=function(a){if(!a){return a
}return a.replace(/\S+/g,function(b){return b.charAt(0).toUpperCase()+b.substr(1).toLowerCase()})};
//
// source/js/analytics/segment-shim.js
//
"use strict";var SegmentShim=function(b,f){f.meredithApplication="Dot Net";f.meredithBrand="allrecipes.com";f.url=document.location.href;
f.referrer=document.referrer;f.contentHeadlines=document.title;var g=["sun","mon","tue","wed","thu","fri","sat"];var a=new Date();
f.dayOfWeek=g[a.getDay()];f.hourOfDay=a.toLocaleString("en-US",{hour:"numeric",hour12:true});if(b.page.pageInfo.pageName){f.path=b.page.pageInfo.pageName
}if(b.page.pageInfo.onSiteSearchTerm){f.search=b.page.pageInfo.onSiteSearchTerm}if(b.page.pageInfo.title){f.title=b.page.pageInfo.title
}if(b.page.category.contentType){f.contentType=StringHelper.ToTitleCase(b.page.category.contentType)}if(b.page.category.subContentType){f.contentSubType=b.page.category.subContentType
}if(b.page.pageInfo.pageId){f.contentCMSID=b.page.pageInfo.pageId}if(b.page.pageInfo.title){f.contentHeadline=b.page.pageInfo.title
}if(b.page.category.adKeys){var e=new RegExp("k=\\[(.+)\\]");var c=e.exec(b.page.category.adKeys);if(c){f.contentAdKeys=c[1]}}if(b.page.category.contentSource){f.contentSource=b.page.category.contentSource===1?null:b.page.category.contentSource
}if(b.page.pageInfo.breadcrumbs){f.contentCmsCategory=b.page.pageInfo.breadcrumbs}if(b.page.pageInfo.heroImageUrl){f.contentFeaturedImage=b.page.pageInfo.heroImageUrl
}if(b.page.pageInfo.experimentViewed){f.experimentViewed=b.page.pageInfo.experimentViewed}};
//
// source/js/analytics/segment-analytics.js
//
"use strict";var readContentSource=function(a){return a>1?a:null};var Allrecipes=Allrecipes||{};Allrecipes.segmentConstants={ContentShownOnPlatform:"own",MeredithApplication:"Dot Net",MeredithBrand:"allrecipes.com"};
var segmentAnalytics={track:function(a,b){window.analytics.track(a,{category:b.category,clickId:b.clickId,contentCmsId:b.contentCmsId,contentShownOnPlaform:Allrecipes.segmentConstants.ContentShownOnPlatform,contentSource:readContentSource(b.contentSource),contentType:b.contentType,label:b.label,linkedCmsId:b.linkedCmsId,linkedUrl:b.linkedUrl,meredithApplication:Allrecipes.segmentConstants.MeredithApplication,meredithBrand:Allrecipes.segmentConstants.MeredithBrand,onSiteIngredientExc:b.onSiteIngredientExc,onSiteIngredientInc:b.onSiteIngredientInc,onSiteSearchTerm:b.onSiteSearchTerm,registrationId:b.registrationId,regSource:b.regSource,scrollDepth:b.scrollDepth});
window.getSegmentContentProperties={category:b.category,contentShownOnPlaform:Allrecipes.segmentConstants.ContentShownOnPlatform,label:b.label,meredithApplication:Allrecipes.segmentConstants.MeredithApplication,meredithBrand:Allrecipes.segmentConstants.MeredithBrand,registrationId:b.registrationId,regSource:b.regSource};
if(b!==undefined||b!==null||b!==""){localStorage.setItem("Allrecipes.trackProperties",JSON.stringify(b))}},page:function(a){var b={url:window.location.href,path:window.location.pathname,referrer:document.referrer,title:document.title,meredithApplication:Allrecipes.segmentConstants.MeredithApplication,meredithBrand:Allrecipes.segmentConstants.MeredithBrand,contentShownOnPlaform:Allrecipes.segmentConstants.ContentShownOnPlatform,};
for(var c in a){if(a.hasOwnProperty(c)){b[c]=a[c]}}window.analytics.page(b)},readCookieValue:function(a){var c=new RegExp("(?:(?:^|.*;\\s*)"+a+"\\s*\\=\\s*([^;]*).*$)|^.*$");
var b=document.cookie.replace(c,"$1");return b},identify:function(b,a){window.analytics.identify(b,{timeincid:b||null,omnitureViId:readCookieValue("s_vi")||null,omnitureFid:readCookieValue("s_fid")||null,googleAnalyticsYearly:readCookieValue("_ga")||null,telemetryUserId:readCookieValue("telemetryUserId")||null,meredithHashID:a.user[0].segment.hashId||null,allrecipesTastePreferences:readCookieValue("TastePrefs"+a.user[0].profile[0].profileInfo.profileId)||null,kruxIDKx:window.localStorage.kxkuid||null,kruxID:window.localStorage.kxfp_id||null,kruxIDLong:window.localStorage._kxfp_id||null,allreceipesMemberId:a.user[0].profile[0].profileInfo.profileId||null,email:null,firstName:null,lastName:null,displayName:a.user[0].profile[0].profileInfo.userName||null,postalCode:null})
}};!function(){var a=window.analytics=window.analytics||[];if(!a.initialize){if(a.invoked){window.console&&console.error&&console.error("Segment snippet included twice.")
}else{a.invoked=!0;a.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];
a.factory=function(d){return function(){var f=Array.prototype.slice.call(arguments);f.unshift(d);a.push(f);return a}};for(var c=0;
c<a.methods.length;c++){var b=a.methods[c];a[b]=a.factory(b)}a.load=function(h,d){var f=document.createElement("script");f.type="text/javascript";
f.async=!0;f.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+h+"/analytics.min.js";
var g=document.getElementsByTagName("script")[0];g.parentNode.insertBefore(f,g);a._loadOptions=d};a.SNIPPET_VERSION="4.1.0";a.load(AR.segmentWriteKey)
}}}();
