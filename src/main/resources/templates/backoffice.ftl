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
        <img src="jnation-logo.png" width="135">
    </div>
    <div class="header__title">
        <h1><span><a
                        href="https://github.com/salaboy/fmtok8s-api-gateway/releases/tag/v${version}">v${version}</a></span>
        </h1>
    </div>
    <div class="header__options">
        <a href="/">
            Go to Main Site<span><img src="house.svg" alt=""></span>
        </a>
    </div>

</div>
<div class="bottom-blocks">
    <div class="main-title">
        <h2>Received Proposals</h2>
        <h5>
        <#if c4p??>
            <a href="https://github.com/salaboy/fmtok8s-c4p/releases/tag/v${c4p.version}">${c4p.name}
                    v${c4p.version}</a>
        <#else>
            <a href="https://github.com/salaboy/fmtok8s-c4p/">N/A</a>
        </#if>
            </h5>
    </div>
    <div class="options">
        <input type="checkbox" id="pending-check" name="pending-check" onchange="togglePending()" ${pending}>
        <label for="pending-check"> Show Only Pending</label>
    </div>
    <div class="agenda">
        <div class="agenda__day">
            <div class="agenda__day__info">

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
                                <#--
                                                               Author: ${proposal.author}-->
                                <#if proposal.status?? && proposal.status == "DECIDED">
                                    <#if proposal.approved>
                                        <div class="item-list__status__approved">
                                            Approved
                                        </div>
                                    <#else>
                                        <div class="item-list__status__declined">
                                            Declined
                                        </div>
                                    </#if>
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
            Send Email
            <h5>
                <#if email??>
                <a href="https://github.com/salaboy/fmtok8s-email/releases/tag/v${email.version}">${email.name}
                    v${email.version}</a>
                <#else>
                    <a href="https://github.com/salaboy/fmtok8s-email/">N/A</a>
                </#if>
            </h5>
            <div class="close">
                <a onclick="toggleModal()"><img src="close.svg" alt=""></a>
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
            <div id="modalErrorMessage" class="modal__content__action__message">
            </div>
            <a onclick="sendEmail()" class="button">Send</a>
        </div>
        <div id="modalMessage" class="modal__content__message__hidden">
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

    function togglePending() {
        var checked = document.getElementById("pending-check").checked;
        console.log("Show only pending..." + checked);
        window.location.href = "/backoffice?pending="+checked;
    }

    function sendEmail() {
        var errorMsg = "Please complete required fields: ";
        if (document.getElementById("title").value == "") {
            errorMsg += "title,"
        }
        if (document.getElementById("toEmail").value == "") {
            errorMsg += "toEmail,"
        }
        if (document.getElementById("content").value == "") {
            errorMsg += "content,"
        }
        if (errorMsg == "Please complete required fields: ") {
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


            document.getElementById("modalBody").className = "modal__content__body__hidden";
            document.getElementById("modalActions").className = "modal__content__action__hidden";
            document.getElementById("modalMessage").className = "modal__content__message";
        }else {
            console.log(errorMsg);
            document.getElementById("modalErrorMessage").innerHTML = errorMsg.substr(0, errorMsg.length - 1) + ".";
        }
    }

    function approveProposal(id) {
        console.log("approving");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/c4p/" + id + "/decision", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        var data = JSON.stringify({
            "approved": true
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
        document.getElementById("modalMessage").className = "modal__content__message__hidden";
        document.getElementById("toEmail").value = "";
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
        var element = document.getElementById("modal");
        element.classList.toggle("open");
    }


</script>


</body>

</html>
