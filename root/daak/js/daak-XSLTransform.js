/*--v-david 1395-08-23*/
(function($){
	$.xml2String = function ($xml){
		try{
			return (new XMLSerializer()).serializeToString($xml);
		}catch(e){
			return $xml.xml;
		}
	};

	$.transform = function($xml,$xsl,$param){
		var $parser = new DOMParser();
		var $xmlobj = $parser.parseFromString($xml,"text/xml");
		var $xslobj = $parser.parseFromString($xsl,"text/xml");
		var $proc = new XSLTProcessor();
		if ($param && $param instanceof Object) $.each($param,function($n,$v){
			if($v !== undefined) $proc.setParameter(null, $n, $v);
		});
		$proc.importStylesheet($xslobj);
		var $resultDocument = $proc.transformToDocument($xmlobj);
		return $.xml2String($resultDocument)

	}

	$.loadXml = function($url,$callback){
		$.fn.readRequestUrl({
			url: $url,
			dataType: 'text',
			async: false,
			success: $callback,
			error: function(){
				if( $.notify ) {
					$.notify({
						title: $.msg.ERROR,
						text: $.msg.RECEIVE_XML_ERROR,
						type:  $.notifyTypes.ERROR
					});
				}
			}
		});
	}

	$.fn.XSLTransform = function($params){
		if (!$params){
			$params = {};
		}

		var $xmlstring;
		var $xslstring;
		var self = $(this);
		if($params.xmlurl){
			$.loadXml($params.xmlurl, function($result){
				$xmlstring = $result;

				if($xmlstring.trim().startsWith('<?xml')) {
					var firstHref = $xmlstring.indexOf('href');
					var subStr = $xmlstring.substring(firstHref, $xmlstring.lastIndexOf('?>'));
					subStr = subStr.substring(subStr.indexOf('"') + 1, $xmlstring.lastIndexOf('?>'));
					var $xslUrl = subStr.substring(0, subStr.indexOf('"')).trim();

					$.loadXml($xslUrl, function ($result) {
						$xslstring = $result;
						self.html($.transform($xmlstring, $xslstring, $params.params));

						if ($params.loadComplete) {
							var $completeParams = {
								xml: true,
								xmlstring: $xmlstring,
								xslstring: $xslstring,
							}

							$params.loadComplete($completeParams);
						}
					});
				}
				else{
					var body = $('<div></div>');
					$(body).html($xmlstring);

					if ($.checkLogin(body) == false) {

						var $completeNotifyType = $(body).notifyGetMessage();
						var completeForm = $(body).find('form:first');
						//var $completeMode = body.find('input[name=mode]:first').val();

						var $completeParams = {
							xml: false,
							//mode: $completeMode,
							notifyType: $completeNotifyType,
							xmlstring: $xmlstring,
						}

						$.tagToObject(completeForm, $completeParams);

						$params.loadComplete($completeParams);
					}
				}
			});
		}
	}
})(jQuery);
               
