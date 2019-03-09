//
// source/js/ads/karma-ads-init.js
//
"use strict";window.karma=window.karma||{};window.karma.config=window.karma.config||{};(function(){if(Object.keys(window.karma).length===0){return
}var b=window.karma.config.targeting||{},c=(typeof window.Toggles==="object")?window.Toggles:false,a=(c)?c.AdTest:false;if(a){window.karma.config.site=(window.karma.config.isMobile)?"test.ar.mdp.mob":"test.ar.mdp.com"
}if(b.status==="supportingloggedin"){window.karma.config.site=(window.karma.config.isMobile)?"ar.supporting.mdp.mob":"ar.supporting.mdp.com"
}b.breakpoint=(window.karma.config.isMobile)?"mobile":false||(window.innerWidth<1024)?"tablet-portrait":"desktop";window.karma.cmd=window.karma.cmd||[]
})();
//
// source/js/ads/karma-ads-helper.js
//
"use strict";(function(){window.googletag=window.googletag||{};googletag.cmd=googletag.cmd||[];googletag.cmd.push(function(){googletag.pubads().addEventListener("slotRenderEnded",function(e){d(e)
})});var c=0;var b=false;var a=function(){var e=0,g,f;if(window.karma&&typeof window.karma.getSlotCount==="function"){e=window.karma.getSlotCount()
}else{g=adService.gptSlots;for(f in g){if(g.hasOwnProperty(f)){e++}}}return e};var d=function(f){c++;if(f){var e=$("#"+f.slot.getSlotId().getDomId());
if(f.isEmpty||e.clientHeight===0){var i=e.parents("[data-ad-container-autocollapse]");if(i.length){i.hide()}var g=e.parents("[data-ad-container-masonry-autocollapse]");
var h=e.data("sponsored-slot");if(g.length&&!h){g.hide();b=true}}}if(!b||a()!==c){return}window.pubsub.broadcast("MasonryGridReload");
if(window.console.error){window.console.error("Masonry grid is being reloaded due to an ad slot not being targeted.")}b=false
}})();
