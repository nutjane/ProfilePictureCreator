var ProfileCreator = (function() {

	var profileFrame = 'design-1';
	var size = 800;

	function output(node) {
		var existing = $('#result .croppie-result');
		if (existing.length > 0) {
			existing[0].parentNode.replaceChild(node, existing[0]);
		}
		else {
			$('#result')[0].appendChild(node);
		}
	}

	function popupResult2(result) {
		var html;
		if (result.html) {
			html = result.html;
		}
		if (result.src) {
			html = '<img src="' + result.src + '" />';

		}
		console.log(result.src);
		$('#result').html(html);
		/*
		swal({
			title: '',
			html: true,
			text: html,
			allowOutsideClick: true
		});
		setTimeout(function(){
			$('.sweet-alert').css('margin', function() {
				var top = -1 * ($(this).height() / 2),
					left = -1 * ($(this).width() / 2);

				return top + 'px 0 0 ' + left + 'px';
			});
		}, 1);
		*/
	}


	function popupResult(result) {
		$('.create-msg').css('display', 'block');
		var cnv = document.getElementById("result-canvas");
		var ctx = cnv.getContext("2d");
		var image = new Image();
		image.src = result.src;
		image.onload = function() {
		  	var imageOverlay = new Image();
		  	if (profileFrame == 'design-1')
					imageOverlay.src = 'images/frame1.png';
		  	else
					imageOverlay.src = 'images/frame2.png';

		  	imageOverlay.onload = function() {
				ctx.fillStyle = 'white';
				ctx.fillRect(0, 0, size, size);
				ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
				ctx.drawImage(imageOverlay, 0, 0, imageOverlay.width, imageOverlay.height, 0, 0, imageOverlay.width, imageOverlay.height);

				var imageUrl = cnv.toDataURL("image/jpeg",1.0);
				var a = document.getElementById("download");
				a.href = imageUrl;
				var a_href = $('#download').attr('href');
				var url_convert = a_href.replace(/^data:image\/[^;]/, 'data:application/octet-stream');

				$('#download').attr('href',url_convert);
				$('#download').attr("download", "TEDxMU_profile.jpg")
				$('.result-image-output').html('<img src="' + imageUrl + '" alt="TEDxMU Profile Picture" width="300">');
				$('.result-text-wrapper').removeClass("hidden").addClass("visible");
		  	};
		};
	}



	function demoUpload() {
		var $uploadCrop;

		function readFile(input) {
 			if (input.files && input.files[0]) {
	            var reader = new FileReader();

	            reader.onload = function (e) {
					$('.upload-demo').addClass('ready');
	            	$uploadCrop.croppie('bind', {
	            		url: e.target.result
	            	}).then(function(){
	            		console.log('jQuery bind complete');

	            	});

	            }

	            reader.readAsDataURL(input.files[0]);
							$('#step2').removeClass("hidden").addClass("visible");
							$('#step1').removeClass("visible").addClass("hidden");

	        }
	        else {
		        swal("Sorry - you're browser doesn't support the FileReader API");
		    }
		}

		$uploadCrop = $('#upload-demo').croppie({
			viewport: {
				width: 280,
				height: 280,
				type: 'square'
			},
			boundary: {
				width: 300,
				height: 300
			},
			enableExif: true
		});

		$('#upload').on('change', function () { readFile(this); });
		$('.upload-result').on('click', function (ev) {
			$uploadCrop.croppie('result', {
				type: 'canvas',
				size: { width: size, height: size},
				format: 'png'
			}).then(function (resp) {
				popupResult({
					src: resp
				});
			});
			$('#step2').removeClass("visible").addClass("hidden");
			$('#step3').removeClass("hidden").addClass("visible");
		});
	}



	function init() {
		demoUpload();
	}

	return {
		init: init
	};
})();
