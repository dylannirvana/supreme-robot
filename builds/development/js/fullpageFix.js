$(document).ready(function() {
	$('#fullpage').fullpage({
		sectionsColor: ['#f7e8e1', '#FFDFBF', '#F0CFB4', '#D6DFFF', '#f7e8e1', '#FFDFBF', '#D6DFFF'],
		anchors: ['MillerWeiner', 'buffer', 'clients', 'clips', 'outlets', 'blog', 'affiliates'],
		menu: '#navbar',
		scrollingSpeed: 1000,
        scrollOverflow: true,
		afterRender: function(){
			//playing the video
			$('video').get(0).play();
		},
		afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){
            var loadedSlide = $(this);

            // add active class to slide rather than section only through callback
            // refactor please
            if(anchorLink == 'MillerWeiner' && slideIndex == 0){
                $("li[data-menuanchor='MillerWeiner/1']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/2']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/3']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/4']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner']").addClass('active');
            }		            
            if(anchorLink == 'MillerWeiner' && slideIndex == 1){
                $("li[data-menuanchor='MillerWeiner']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/2']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/3']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/4']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/1']").addClass('active');
            }
            if(anchorLink == 'MillerWeiner' && slideIndex == 2){
                $("li[data-menuanchor='MillerWeiner/1']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/3']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/4']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/2']").addClass('active');
            }
            if(anchorLink == 'MillerWeiner' && slideIndex == 3){
                $("li[data-menuanchor='MillerWeiner/1']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/2']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/4']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/3']").addClass('active');
            }
            if(anchorLink == 'MillerWeiner' && slideIndex == 4){
                $("li[data-menuanchor='MillerWeiner/1']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/2']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/3']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner']").removeClass('active');
                $("li[data-menuanchor='MillerWeiner/4']").addClass('active');
            }
        }
	});
});