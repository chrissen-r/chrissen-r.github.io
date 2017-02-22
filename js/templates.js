this["Portfolio"] = this["Portfolio"] || {};
this["Portfolio"]["templates"] = this["Portfolio"]["templates"] || {};
this["Portfolio"]["templates"]["home"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"teaser__background\" style=\"background-image: url('img/project-1-teaser.png');\" ></div>\n<div class=\"teaser\">\n	<div class=\"teaser__gallery\">\n		<div class=\"teaser__gallery-container\">		\n			<div class=\"teaser__thumbnail teaser__thumbnail--current\" style=\"background-image: url('img/project-1-thumbnail.png');\">\n				<a href=\"project/tesla\"></a>\n			</div>\n			<div class=\"teaser__thumbnail teaser__thumbnail--next\" style=\"background-image: url('img/project-2-thumbnail.png');\">\n				<a href=\"project/lbpc\"></a>\n			</div>\n			<div class=\"teaser__thumbnail\" style=\"background-image: url('img/project-3-thumbnail.png');\">\n				<a href=\"project/delivrhetic\"></a>\n			</div>\n		</div>\n	</div>\n	<div class=\"teaser__text\">\n		<div class=\"teaser__count\"><span class=\"teaser__count-current\">1</span>/<span class=\"teaser__count-total\">3</span></div>\n		<h2 class=\"with-line\">TeslaXHer</h2>\n		<div class=\"teaser__project-type\">UX/UI</div>\n		<a href=\"#\" class=\"cta\">view project</a>\n		<div class=\"scrollbox\">\n			<div class=\"scrollbox__up scrollbox__up--active\">scroll up</div>\n			<div class=\"scrollbox__down scrollbox__down--active\">scroll down</div>\n		</div>\n	</div>\n</div>";
},"useData":true});
this["Portfolio"]["templates"]["project"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=container.escapeExpression;

  return "			<img src=\""
    + alias3(((helper = (helper = helpers.source || (depth0 != null ? depth0.source : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"source","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.legend || (depth0 != null ? depth0.legend : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"legend","hash":{},"data":data}) : helper)))
    + "\">	\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=container.escapeExpression, alias4=container.lambda;

  return "<div class=\"teaser__background\" style=\"background-image:url("
    + alias3(((helper = (helper = helpers.teaser || (depth0 != null ? depth0.teaser : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"teaser","hash":{},"data":data}) : helper)))
    + ");\"></div>\n<div class=\"teaser "
    + alias3(((helper = (helper = helpers.isMobile || (depth0 != null ? depth0.isMobile : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"isMobile","hash":{},"data":data}) : helper)))
    + "\">\n	<div class=\"teaser__gallery\">\n		<div class=\"teaser__gallery-container\">		\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.images : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</div>\n	</div>\n	<div class=\"teaser__text\">\n		<div class=\"teaser__count\"><span class=\"teaser__count-current\">"
    + alias3(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "</span>/<span class=\"teaser__count-total\">3</span></div>\n		<h2 class=\"with-line\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h2>\n		<div class=\"teaser__project-type\">"
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + "</div>\n		<p class=\"teaser__description\">"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n		<div class=\"teaser__legend with-line\">\n			"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.legend : stack1), depth0))
    + "\n		</div>\n		<a href=\"/\" class=\"cta\">go back to projects</a>\n		<div class=\"next-project\">next project - <a href=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0["next-project"] : depth0)) != null ? stack1.link : stack1), depth0))
    + "\" class=\"cta\">"
    + alias3(alias4(((stack1 = (depth0 != null ? depth0["next-project"] : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a></div>\n		<div class=\"scrollbox\">\n			<div class=\"scrollbox__down scrollbox__down--active\">scroll down</div>\n		</div>\n	</div>\n</div>";
},"useData":true});