this["templates"] = this["templates"] || {};
this["templates"]["contact"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"view contact\">\n    <div class=\"content clearfix\">\n        <a class=\"btn left col-2 top\" href=\"/\" data-navigo ><span>About</span></a><br>\n        <a class=\"btn left col-2 top\" href=\"project/tesla\" data-navigo ><span>Works</span></a>\n        <div class=\"content-centered\">\n            <h1 class=\"col-3\">Let's keep in touch</h1>\n            <p class=\"col-3\">I’m looking for an internship from July to October in London as a Web Designer !<br>I also do freelance work, feel free to contact me for any request.</p>\n            <a class=\"btn right col-right-3\" href=\"#\"><span>E-mail</span></a><br>\n            <a class=\"btn right col-right-3\" href=\"#\"><span>Twitter</span></a><br>\n            <a class=\"btn right col-right-3\" href=\"#\"><span>Behance</span></a>\n        </div>\n        <a class=\"btn left col-2 bottom\" href=\"http://louisamiot.com\"><span>Developed by Louis Amiot</span></a>        \n    </div>\n</div>";
},"useData":true});
this["templates"]["home"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"view home\">\n    <div class=\"content clearfix\">\n        <a class=\"btn left col-2 top\" href=\"project/explore\" data-navigo><span>Works</span></a>\n        <div class=\"content-centered\">\n            <h1 class=\"col-3\">Rajathurai Chrissen</h1>\n            <p class=\"col-3\">French UX | UI Designer, 3rd year student @HETIC.<br>Looking for a 4 month internship in London.</p>\n            <a class=\"btn right col-right-3\" href=\"#\"><span>My Resume</span></a>\n        </div>\n        <a class=\"btn left col-2 bottom\" href=\"contact\" data-navigo><span>Contact</span></a>\n    </div>\n</div>";
},"useData":true});
this["templates"]["project"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"view project project-"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"layer\"></div>\n    <div class=\"content clearfix\">\n        <a class=\"btn left col-2 top\" href=\"/\" data-navigo><span>About</span></a>\n        <div class=\"content-centered\">\n            <h1 class=\"col-3\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h1>\n            <p class=\"col-3\">"
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n            <a class=\"btn right col-right-3\" target=\"_blank\" href=\""
    + alias3(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"link","hash":{},"data":data}) : helper)))
    + "\"><span>Website</span></a>\n            <div class=\"project-info col-3\">\n                <p><span>"
    + alias3(((helper = (helper = helpers.scope || (depth0 != null ? depth0.scope : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"scope","hash":{},"data":data}) : helper)))
    + "</span></p>\n                <p><span>"
    + alias3(((helper = (helper = helpers.job || (depth0 != null ? depth0.job : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"job","hash":{},"data":data}) : helper)))
    + "</span></p>\n            </div>\n        </div>\n        <a class=\"btn left col-2 bottom\" href=\"contact\" data-navigo><span>Contact</span></a>        \n    </div>\n</div>";
},"useData":true});