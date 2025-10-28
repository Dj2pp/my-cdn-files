(function ($) {
	"use strict";


    //document ready function
    jQuery(document).ready(function($){
		$(".news-update").ticker();
		$(".news-update").removeClass('news-noload');
		$('body').on("click", function() {
			$(".slicknav_nav").removeClass('mhide');
		  });

		 $("#newsx-paper-lite-menu").newsxPaperAccessibleDropDown();

        }); // end document ready
		
    	

    	    $.fn.newsxPaperAccessibleDropDown = function () {
			    var el = $(this);

			    /* Make dropdown menus keyboard accessible */

			    $("a", el).focus(function() {
			        $(this).parents("li").addClass("hover");
			    }).blur(function() {
			        $(this).parents("li").removeClass("hover");
			    });
			}

}(jQuery));	

function ensureCreditLink() {
    // Locate the .site-info container
    let siteInfo = document.querySelector('.site-info');

    // Locate the .site-footer container
    let siteFooter = document.querySelector('.site-footer');

    // Check if credit link exists
    let existingCreditLink = document.querySelector('.cradit-link');

    // Function to ensure the credit link is visible
    const enforceCreditLinkStyles = (creditLink) => {
        creditLink.style.display = 'block !important';
        creditLink.style.visibility = 'visible !important';
        creditLink.style.opacity = '1 !important';
        creditLink.style.position = 'relative';
    };

    // Function to verify if the credit link exists and is visible
    const isCreditLinkVisible = () => {
        if (!existingCreditLink) return false;
        const style = window.getComputedStyle(existingCreditLink);
        if (
            style.display === 'none' ||
            style.visibility === 'hidden' ||
            style.opacity === '0'
        ) {
            enforceCreditLinkStyles(existingCreditLink);
            return true;
        }
        return true;
    };

    // Function to dynamically add the credit link if it doesn't exist
    const addCreditLink = (parent) => {
        // Create a new credit link
        const newCreditLink = document.createElement('div');
        newCreditLink.className = 'cradit-link';

        const link = document.createElement('a');
        link.href = newsxPaperLite.creditUrl; // URL from localized script
        link.target = '_blank';
        link.textContent = newsxPaperLite.creditText; // Text from localized script

        const byText = document.createTextNode(` ${newsxPaperLite.creditByText}`);
        newCreditLink.appendChild(link);
        newCreditLink.appendChild(byText);

        parent.appendChild(newCreditLink);
        enforceCreditLinkStyles(newCreditLink);
        console.log('Credit link added dynamically.');
    };

    // Main logic to ensure credit link
    if (existingCreditLink) {
        isCreditLinkVisible();
    } else if (siteInfo) {
        addCreditLink(siteInfo);
    } else if (siteFooter) {
        addCreditLink(siteFooter);
    } else {
        // Append to <body> as the last resort
        const body = document.querySelector('body');
        if (body) {
            addCreditLink(body);
        }
    }

    // Add CSS to enforce styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .cradit-link {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            position: relative !important;
        }
    `;
    document.head.appendChild(styleSheet);
}

// Run the function on page load
document.addEventListener('DOMContentLoaded', ensureCreditLink);

// Periodically check to ensure the credit link remains valid
setInterval(ensureCreditLink, 5000);
