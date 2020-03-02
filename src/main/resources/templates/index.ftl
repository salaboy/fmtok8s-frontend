<!doctype html>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="manifest" href="site.webmanifest">
    <link rel="apple-touch-icon" href="icon.png">
    <!-- Place favicon.ico in the root directory -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <link href="https://fonts.googleapis.com/css?family=Rubik:300,400&display=swap" rel="stylesheet">


    <meta name="theme-color" content="#E7E7EA">
</head>

<body data-gr-c-s-loaded="true">
<!--[if IE]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade
    your browser</a> to improve your experience and security.</p>
<![endif]-->

<!-- Add your site or application content here -->
<div class="block header">
    <div class="header__image">
        <img src="kubecon-logo.png" width="35">
    </div>
    <div class="header__title">
        <h1>Kubecon 2020 <span><a
                        href="https://github.com/salaboy/fmtok8s-api-gateway/releases/tag/v${version}">v${version}</a></span>
        </h1>
    </div>
    <div class="header__options">
        <a href="/backoffice">
            Go to Back Office
        </a>
    </div>

</div>
<div class="bottom-blocks">
    <div class="main-title">
        <h2><a href="https://github.com/salaboy/fmtok8s-c4p/releases/tag/v${version}">${agenda} v${version}</a></h2>
        <h3>Accepted talks</h3>
    </div>
    <div class="agenda">
        <div class="agenda__day">
            <div class="agenda__day__info">
                <div class="agenda__day__info__number">
                    12
                </div>
                <div class="agenda__day__info__name">
                    MON
                </div>
            </div>
            <div class="agenda__day__content">
                <#if agendaItemsMonday??>
                    <ul class="item-list">
                        <#list agendaItemsMonday as item>
                            <li>
                                <div class="item-list__title">
                                    ${item.title}
                                </div>
                                <div class="item-list__description">
                                    <#--                                    ${item.description}-->
                                </div>
                                <div class="item-list__data">
                                    ${item.time} <br/>
                                    By ${item.author}
                                </div>
                            </li>
                        </#list>
                    </ul>
                <#else>
                    <h5> No Items yet.</h5>
                </#if>
            </div>
        </div>

        <div class="agenda__day">
            <div class="agenda__day__info">
                <div class="agenda__day__info__number">
                    13
                </div>
                <div class="agenda__day__info__name">
                    TUE
                </div>
            </div>
            <div class="agenda__day__content">
                <#if agendaItemsTuesday??>
                    <ul class="item-list">
                        <#list agendaItemsTuesday as item>
                            <li>
                                <div class="item-list__title">
                                    ${item.title}
                                </div>
                                <div class="item-list__description">
                                    <#--                                    ${item.description}-->
                                </div>
                                <div class="item-list__data">
                                    ${item.time} <br/>
                                    By ${item.author}
                                </div>
                            </li>
                        </#list>
                    </ul>
                <#else>
                    <h5> No Items yet.</h5>
                </#if>
            </div>
        </div>
    </div>
</div>
<div class="button-layer">
    <a class="main-button" onclick="toggleModal()">
        Submit Proposal
    </a>
</div>
<div class="modal" id="modal">
    <div id="modalContent" class="modal__content">
        <div class="modal__content__title">
            New Proposal ${c4p}
            <div class="close">
                <a onclick="toggleModal()">Close</a>
            </div>
        </div>
        <div id="modalBody" class="modal__content__body">
            <div class="form">
                <div class="form-field">
                    <label>Title</label>
                    <input id="title" type="text">
                </div>
                <div class="form-field">
                    <label>Author</label>
                    <input id="author" type="text">
                </div>
                <div class="form-field">
                    <label>Email</label>
                    <input id="email" type="text">
                </div>
                <div class="form-field">
                    <label>Abstract</label>
                    <textarea id="description" rows="6"></textarea>
                </div>
            </div>
        </div>
        <div id="modalActions" class="modal__content__action">
            <a onclick="submitProposal()" class="button">Send</a>
        </div>
        <div id="modalMessage" class="modal__content__message_hidden">
            <h2>Thanks for your submission</h2>
            <p>Your proposal has been sent successfully. The committee will evaluate your proposal and notify you
                soon.</p>
            <img src="https://lh3.googleusercontent.com/proxy/aez-tCdkMofydPVsyNKQ8WMNlZSuNhFJhHu4mdy7hDdXudLC5nD1yxXfRcU9VsolYpjvTU1yS5AGaluIU5Vl6ggGFhD5-k_dlYkDh9DWF3QjQeFcK3DzorvRpJ4M-1P-wrb6iOZnbhlwTlb1vz-LJqF7eLviJqRlnFM"/>

            <p><a onclick="toggleModal()">Continue to the website</a></p>
        </div>
    </div>
    <div class="modal__overlay" onclick="toggleModal()"></div>
</div>

<script src="js/vendor/modernizr-3.7.1.min.js"></script>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-3.4.1.min.js"><\/script>')</script>
<script src="js/plugins.js"></script>
<script type="text/javascript">

    function toggleModal() {
        document.getElementById("modalBody").className = "modal__content__body";
        document.getElementById("modalActions").className = "modal__content__action";
        document.getElementById("modalMessage").className = "modal__content__message_hidden";
        document.getElementById("author").value = "";
        document.getElementById("email").value = "";
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        var element = document.getElementById("modal");
        element.classList.toggle("open");
    }


    function submitProposal() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/c4p/");
        var errorMsg = "errorMsg=";
        if (document.getElementById("author").value == "") {
            errorMsg += "author,"
        }
        if (document.getElementById("email").value == "") {
            errorMsg += "email,"
        }
        if (document.getElementById("title").value == "") {
            errorMsg += "title,"
        }
        if (document.getElementById("description").value == "") {
            errorMsg += "description,"
        }

        if (errorMsg == "errorMsg=") {
            var data = JSON.stringify({
                author: document.getElementById("author").value,
                email: document.getElementById("email").value,
                title: document.getElementById("title").value,
                description: document.getElementById("description").value
            });
            xhr.setRequestHeader('Content-Type', 'application/json');
            console.log(data);
            xhr.send(data);
            // window.location.href = "/?submitted=true";

            document.getElementById("modalBody").className = "modal__content__body_hidden";
            document.getElementById("modalActions").className = "modal__content__action_hidden";
            document.getElementById("modalMessage").className = "modal__content__message";

        } else {
            //window.location.href = "/?" + errorMsg;
        }
    }


</script>


</body>

</html>

<#--<!DOCTYPE html>-->
<#--<html class="no-js" lang="">-->

<#--<head>-->
<#--    <meta charset="utf-8">-->
<#--    <title></title>-->
<#--    <meta name="description" content="">-->
<#--    <meta name="viewport" content="width=device-width, initial-scale=1">-->

<#--    <link rel="manifest" href="site.webmanifest">-->
<#--    <link rel="apple-touch-icon" href="icon.png">-->
<#--    <!-- Place favicon.ico in the root directory &ndash;&gt;-->
<#--    <link rel="stylesheet" href="css/normalize.css">-->
<#--    <link rel="stylesheet" href="css/main.css">-->
<#--    <link href="https://fonts.googleapis.com/css?family=Rubik:400,500&display=swap" rel="stylesheet">-->


<#--    <meta name="theme-color" content="#fafafa">-->
<#--</head>-->

<#--<body>-->
<#--<!--[if IE]>-->
<#--<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade-->
<#--    your browser</a> to improve your experience and security.</p>-->
<#--<![endif]&ndash;&gt;-->

<#--<!-- Add your site or application content here &ndash;&gt;-->
<#--<div class="block conference">-->
<#--    <div class="container">-->
<#--        <h1>KubeCon <img src="kubecon-logo.png" width="8%"/></h1>-->
<#--        <h2><a href="https://github.com/salaboy/fmtok8s-api-gateway/releases/tag/v${version}">v${version}</a> </h2><h4><a href="/backoffice">Access Back Office</a></h4>-->
<#--        <br/>-->
<#--    </div>-->
<#--</div>-->
<#--<div class="bottom-blocks">-->
<#--    <div class="block block-left">-->
<#--        <div class="container">-->
<#--            <h2>${c4p}</h2>-->

<#--            <div class="block-col">-->
<#--                <#if required??>-->
<#--                <h4>${required}</h4>-->
<#--                </#if>-->
<#--                <h4>New Proposal</h4>-->
<#--                <#if !submitted>-->
<#--                    <div class="block-form">-->
<#--                        <div class="form-field">-->
<#--                            <label>Title</label>-->
<#--                            <input id="title" type="text">-->
<#--                        </div>-->
<#--                        <div class="form-field">-->
<#--                            <label>Author</label>-->
<#--                            <input id="author" type="text">-->
<#--                        </div>-->
<#--                        <div class="form-field">-->
<#--                            <label>Email</label>-->
<#--                            <input id="email" type="text">-->
<#--                        </div>-->
<#--                        <div class="form-field">-->
<#--                            <label>Abstract</label>-->
<#--                            <textarea id="description"></textarea>-->
<#--                        </div>-->
<#--                        <div class="form-actions">-->
<#--                            <button type="submit" onclick="submitProposal()">Submit</button>-->
<#--                        </div>-->
<#--                    </div>-->
<#--                <#else>-->
<#--                    <h5> Thanks for your submission. The committee will evaluate your proposal and notify you-->
<#--                        soon. </h5>-->
<#--                </#if>-->
<#--            </div>-->

<#--        </div>-->
<#--    </div>-->
<#--    <div class="block block-right">-->
<#--        <div class="container">-->
<#--            <h2>${agenda}</h2>-->

<#--            <h4>Accepted Talks (Public)</h4>-->
<#--            <#if agendaItems??>-->
<#--                <ul class="item-list">-->
<#--                    <#list agendaItems as item>-->
<#--                        <li>-->
<#--                            <h5 class="item-list__title">${item.title}</h5>-->
<#--                            <div class="item-list__author">By ${item.author}-->
<#--                                @ ${item.talkTime?string('dd.MM.yyyy HH:mm:ss')} </div>-->
<#--                        </li>-->
<#--                    </#list>-->
<#--                </ul>-->
<#--            <#else>-->
<#--                <h5> No Items yet.</h5>-->
<#--            </#if>-->
<#--        </div>-->
<#--    </div>-->
<#--</div>-->
<#--<script src="js/vendor/modernizr-3.7.1.min.js"></script>-->
<#--<script src="https://code.jquery.com/jquery-3.4.1.min.js"-->
<#--        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>-->
<#--<script>window.jQuery || document.write('<script src="js/vendor/jquery-3.4.1.min.js"><\/script>')</script>-->
<#--<script src="js/plugins.js"></script>-->
<#--<script type="text/javascript">-->

<#--    function submitProposal() {-->
<#--        var xhr = new XMLHttpRequest();-->
<#--        xhr.open("POST", "/c4p/", true);-->
<#--        var errorMsg = "errorMsg=";-->
<#--        if(document.getElementById("author").value == ""){-->
<#--            errorMsg += "author,"-->
<#--        }-->
<#--        if(document.getElementById("email").value == ""){-->
<#--            errorMsg += "email,"-->
<#--        }-->
<#--        if(document.getElementById("title").value == ""){-->
<#--            errorMsg += "title,"-->
<#--        }-->
<#--        if(document.getElementById("description").value == ""){-->
<#--            errorMsg += "description,"-->
<#--        }-->

<#--        if(errorMsg == "errorMsg=") {-->
<#--            var data = JSON.stringify({-->
<#--                author: document.getElementById("author").value,-->
<#--                email: document.getElementById("email").value,-->
<#--                title: document.getElementById("title").value,-->
<#--                description: document.getElementById("description").value-->
<#--            });-->
<#--            xhr.setRequestHeader('Content-Type', 'application/json');-->
<#--            console.log(data);-->
<#--            xhr.send(data);-->
<#--            window.location.href = "/?submitted=true";-->
<#--        }else{-->
<#--            window.location.href = "/?"+errorMsg;-->
<#--        }-->
<#--    }-->
<#--</script>-->


<#--</body>-->

<#--</html>-->