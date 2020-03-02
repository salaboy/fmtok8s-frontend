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

<body data-gr-c-s-loaded="true" class="backoffice">
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
        <a href="/">
            Go to Main Site
        </a>
    </div>

</div>
<div class="bottom-blocks">
    <div class="main-title">
        <h2>${c4p}</h2>
        <h3>Received Proposals</h3>
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
                <#if proposals?? && proposals?has_content>
                    <ul class="item-list">

                        <#list proposals as proposal>
                            <#if proposal.status?? && proposal.status == "DECIDED">
                                <#if proposal.approved>
                                    <li class="approved">
                                <#else>
                                    <li class="declined">
                                </#if>
                            <#else>
                                <li class="pending">
                            </#if>
                            <div class="item-list__title">
                                ${proposal.title}
                            </div>
                            <div class="item-list__description">
                                ${proposal.description}
                            </div>
                            <div class="item-list__data">
                                16:00 <br/>
                                <#--                                    Author: ${proposal.author}-->
                                <#if proposal.approved>
                                    <div class="item-list__status__approved">
                                        Approved
                                    </div>
                                <#else>
                                    <div class="item-list__status__declined">
                                        Declined
                                    </div>
                                </#if>
                            </div>
                            <#if proposal.status?? && proposal.status == "PENDING">
                                <div class="item-list__actions">
                                    <a class="item-list__actions__accept" onclick="approveProposal('${proposal.id}')">
                                        Accept
                                    </a>
                                    <a class="item-list__actions__reject" onclick="rejectProposal('${proposal.id}')">
                                        Reject
                                    </a>
                                </div>

                            </#if>

                            </li>
                        </#list>

                    </ul>
                <#else>
                    <h5> No Proposals yet.</h5>
                </#if>

            </div>
        </div>


    </div>
</div>
<div class="button-layer">
    <a class="main-button" onclick="toggleModal()">
        Send Email
    </a>
</div>
<div class="modal" id="modal">
    <div class="modal__content">
        <div class="modal__content__title">
            Send Email <h2>${email}</h2>
            <div class="close">
                <a onclick="toggleModal()">Close</a>
            </div>
        </div>
        <div id="modalBody" class="modal__content__body">
            <div class="form">
                <div class="form-field half">
                    <label>To</label>
                    <input id="toEmail" type="text">
                </div>
                <div class="form-field half">
                    <label>Title</label>
                    <input id="title" type="text">
                </div>
                <div class="form-field">
                    <label>Content</label>
                    <textarea id="content"></textarea>
                </div>
            </div>
        </div>
        <div id="modalActions" class="modal__content__action">
            <a onclick="sendEmail()" class="button">Send</a>
        </div>
        <div id="modalMessage" class="modal__content__message_hidden">
            <h2>Email Sent.</h2>
            <p>Your email has been sent successfully.</p>
            <p><a onclick="toggleModal()">Continue to the backoffice</a></p>
        </div>
    </div>
    <div class="modal__overlay"></div>
</div>

<script src="js/vendor/modernizr-3.7.1.min.js"></script>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery-3.4.1.min.js"><\/script>')</script>
<script src="js/plugins.js"></script>
<script type="text/javascript">

    function sendEmail() {
        console.log("sending email");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/email/", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        var data = JSON.stringify({
            title: document.getElementById("title").value,
            toEmail: document.getElementById("toEmail").value,
            content: document.getElementById("content").value,
        });
        console.log(data);
        xhr.send(data);

        document.getElementById("modalBody").className = "modal__content__body_hidden";
        document.getElementById("modalActions").className = "modal__content__action_hidden";
        document.getElementById("modalMessage").className = "modal__content__message";
        //window.location.href = "/backoffice?sent=true";
    }

    function approveProposal(id) {
        console.log("approving");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/c4p/" + id + "/decision", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        var data = JSON.stringify({
            "approved": true,
            "dayTime": "monday-morning"
        });
        console.log(data);
        xhr.send(data);
        window.location.href = "/backoffice";

    }

    function rejectProposal(id) {
        console.log("rejecting");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/c4p/" + id + "/decision", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        var data = JSON.stringify({
            "approved": false
        });
        console.log(data);
        xhr.send(data);
        window.location.href = "/backoffice";

    }

    function toggleModal() {
        document.getElementById("modalBody").className = "modal__content__body";
        document.getElementById("modalActions").className = "modal__content__action";
        document.getElementById("modalMessage").className = "modal__content__message_hidden";
        document.getElementById("toEmail").value = "";
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
        var element = document.getElementById("modal");
        element.classList.toggle("open");
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
<#--        <h1>KubeCon- Back Office <img src="kubecon-logo.png" width="8%"/></h1>-->
<#--        <h2>V${version} </h2><h4><a href="/">Main Site</a></h4>-->
<#--        <br/>-->
<#--    </div>-->
<#--</div>-->
<#--<div class="bottom-blocks">-->
<#--    <div class="block block-left">-->
<#--        <div class="container">-->
<#--            <h2>${c4p}</h2>-->


<#--            <div class="block-col">-->
<#--                <h4>Proposal Received (Back Office)</h4>-->
<#--                <#if proposals?? && proposals?has_content>-->
<#--                    <ul class="item-list">-->

<#--                        <#list proposals as proposal>-->
<#--                            <li>-->
<#--                                <h5 class="item-list__title"><#if proposal.title??>${proposal.title}<#else> N/A</#if></h5>-->
<#--                                <div class="item-list__author"><#if proposal.description??>${proposal.description}<#else> N/A</#if></div>-->
<#--                                <div class="item-list__status"><#if proposal.status??>${proposal.status}<#else> N/A</#if>-->
<#--                                    <#if proposal.status?? && proposal.status == "DECIDED">-->
<#--                                        <#if proposal.approved>-->
<#--                                            <span class="item-list__status__approved">ACCEPTED</span>-->
<#--                                        <#else>-->
<#--                                            <span class="item-list__status__declined">REJECTED</span>-->
<#--                                        </#if>-->
<#--                                    </#if>-->
<#--                                </div>-->
<#--                                <#if proposal.status?? && proposal.status == "PENDING">-->
<#--                                    <div class="item-list__actions">-->
<#--                                        <a href="#" class="item-list__actions__accept"-->
<#--                                           onclick="approveProposal('${proposal.id}')">Accept</a>-->
<#--                                        <a class="item-list__actions__reject" href="#"-->
<#--                                           onclick="rejectProposal('${proposal.id}')">Reject</a>-->
<#--                                    </div>-->
<#--                                <#else>-->

<#--                                </#if>-->
<#--                            </li>-->
<#--                        </#list>-->

<#--                    </ul>-->
<#--                <#else>-->
<#--                    <h5> No Proposals yet.</h5>-->
<#--                </#if>-->

<#--            </div>-->
<#--        </div>-->
<#--    </div>-->
<#--    <div class="block block-right">-->
<#--        <div class="container">-->
<#--            <h2>${email}</h2>-->

<#--            <h4>Send Email Reminder</h4>-->
<#--            <#if !sent>-->
<#--                <div class="block-form">-->
<#--                    <div class="form-field">-->
<#--                        <label>Title</label>-->
<#--                        <input id="title" type="text">-->
<#--                    </div>-->
<#--                    <div class="form-field">-->
<#--                        <label>To</label>-->
<#--                        <input id="toEmail" type="text">-->
<#--                    </div>-->

<#--                    <div class="form-field">-->
<#--                        <label>Content</label>-->
<#--                        <textarea id="content"></textarea>-->
<#--                    </div>-->
<#--                    <div class="form-actions">-->
<#--                        <button type="submit" onclick="sendEmail()">Send</button>-->
<#--                    </div>-->
<#--                </div>-->
<#--            <#else>-->
<#--                <h5> Email Sent. </h5>-->
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

<#--    function sendEmail() {-->
<#--        console.log("sending email");-->
<#--        var xhr = new XMLHttpRequest();-->
<#--        xhr.open("POST", "/email/", true);-->
<#--        xhr.setRequestHeader('Content-Type', 'application/json');-->
<#--        var data = JSON.stringify({-->
<#--            title: document.getElementById("title").value,-->
<#--            toEmail: document.getElementById("toEmail").value,-->
<#--            content: document.getElementById("content").value,-->
<#--        });-->
<#--        console.log(data);-->
<#--        xhr.send(data);-->
<#--        window.location.href = "/backoffice?sent=true";-->
<#--    }-->

<#--    function approveProposal(id) {-->
<#--        console.log("approving");-->
<#--        var xhr = new XMLHttpRequest();-->
<#--        xhr.open("POST", "/c4p/" + id + "/decision", true);-->
<#--        xhr.setRequestHeader('Content-Type', 'application/json');-->
<#--        var data = JSON.stringify({-->
<#--            "approved": true,-->
<#--            "dayTime": "monday-morning"-->
<#--        });-->
<#--        console.log(data);-->
<#--        xhr.send(data);-->
<#--        window.location.href = "/backoffice";-->

<#--    }-->

<#--    function rejectProposal(id) {-->
<#--        console.log("rejecting");-->
<#--        var xhr = new XMLHttpRequest();-->
<#--        xhr.open("POST", "/c4p/" + id + "/decision", true);-->
<#--        xhr.setRequestHeader('Content-Type', 'application/json');-->
<#--        var data = JSON.stringify({-->
<#--            "approved": false-->
<#--        });-->
<#--        console.log(data);-->
<#--        xhr.send(data);-->
<#--        window.location.href = "/backoffice";-->

<#--    }-->


<#--</script>-->


<#--</body>-->

<#--</html>-->