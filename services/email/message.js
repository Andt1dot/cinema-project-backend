const configEmail = require("./config");

const messageConfirmRegister = async (email, user_id, token) => {
  const msg = {
    from: `"Olymp Cinema" <${process.env.EMAIL_PROFILE}>`,
    to: email,
    subject: "Confirmare înregistrare profil Olymp Cinema",
    html: `
<head>
<style type="text/css">
@media screen {
    @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
    }

    @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
    }

    @font-face {
        font-family: 'Lato';
        font-style: italic;
        font-weight: 400;
        src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
    }

    @font-face {
        font-family: 'Lato';
        font-style: italic;
        font-weight: 700;
        src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
    }
}

/* CLIENT-SPECIFIC STYLES */
body,
table,
td,
a {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
}

table,
td {
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
}

img {
    -ms-interpolation-mode: bicubic;
}

/* RESET STYLES */
img {
    border: 0;
    height: auto;
    line-height: 100%;
    outline: none;
    text-decoration: none;
}

table {
    border-collapse: collapse !important;
}

body {
    height: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
}

/* iOS BLUE LINKS */
a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
}

/* MOBILE STYLES */
@media screen and (max-width:600px) {
    h1 {
        font-size: 32px !important;
        line-height: 32px !important;
    }
}

/* ANDROID CENTER FIX */
div[style*="margin: 16px 0;"] {
    margin: 0 !important;
}
</style>
</head>

<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
<!-- HIDDEN PREHEADER TEXT -->
<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> Suntem încântați să te vedem aici, confirmă profilul creat și te așteptăm cu nerăbdare în aplicația Olymp Cinema </div>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<!-- LOGO -->
<tr>
    <td bgcolor="#FFA73B" align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
                <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
            </tr>
        </table>
    </td>
</tr>
<tr>
    <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
                <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                    <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Bun venit la <br> Olymp Cinema !</br></h1> <img src="https://api-olymp-cinema.herokuapp.com/static/media/olymp-cinema-logo.5cad48e1.png" width="125" height="120" style="display: block; border: 0px;" />
                </td>
            </tr>
        </table>
    </td>
</tr>
<tr>
    <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                    <p style="margin: 0;">Noi vă mulțuimim pentru alegere. Acum, este necesar să confirmați profilul creat prin accesarea butonului de mai jos.</p>
                </td>
            </tr>
            <tr>
                <td bgcolor="#ffffff" align="left">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                <table border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="https://api-olymp-cinema.herokuapp.com/api/auth/register-confirm/${token.token}/${user_id}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirmare profil</a></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr> <!-- COPY -->
            <tr>
                
            <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                    <p style="margin: 0;">Dacă aveți aveți întrebări s-au probleme tehnice, nu ezitați să ne contactați la numărul de telefon <b>060886863</b> s-au să ne scriți la poșta electronică <b>olymp.cinema@gmail.com</b></p>
                </td>
            </tr>
            <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                    <p style="margin: 0;">Cu stimă,<br> Echipa Olymp Cinema</p>
                </td>
            </tr>
        </table>
    </td>
</tr>


        </table>
    </td>
</tr>
</table>
</body>               
           `,
  };

  return await configEmail.sendMail(msg);
};

const notificationSendEmail = async (email, subject, content) => {
  const msg = {
    from: `"Olymp Cinema" <${process.env.EMAIL_PROFILE}>`,
    to: email,
    subject: subject,
    html: `<p style="color: blue; font-size: 46px;"> ${content}</p>`,
  };
  return await configEmail.sendMail(msg);
};

const messageResetPassword = async (email, user_id) => {
  const msg = {
    from: `"Olymp Cinema" <${process.env.EMAIL_PROFILE}>`,
    to: email,
    subject: "Resetare parolă - Olymp Cinema",
    html: `<!doctype html>

    <head>
     
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Resetare parolei de profil Olymp Cinema</title>
     
      <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
    
      <style type="text/css">
        @media only screen and (min-width:768px){
              .templateContainer{
                  width:600px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body,table,td,p,a,li,blockquote{
                  -webkit-text-size-adjust:none !important;
              }
      
      }   @media only screen and (max-width: 480px){
              body{
                  width:100% !important;
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              #bodyCell{
                  padding-top:10px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImage{
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
             
       .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                  max-width:100% !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnBoxedTextContentContainer{
                  min-width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupContent{
                  padding:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnCaptionLeftContentOuter
       .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                  padding-top:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardTopImageContent,.mcnCaptionBlockInner
       .mcnCaptionTopContent:last-child .mcnTextContent{
                  padding-top:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardBottomImageContent{
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockInner{
                  padding-top:0 !important;
                  padding-bottom:0 !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageGroupBlockOuter{
                  padding-top:9px !important;
                  padding-bottom:9px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnTextContent,.mcnBoxedTextContentColumn{
                  padding-right:18px !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                  padding-right:18px !important;
                  padding-bottom:0 !important;
                  padding-left:18px !important;
              }
      
      }   @media only screen and (max-width: 480px){
              .mcpreview-image-uploader{
                  display:none !important;
                  width:100% !important;
              }
      
      }   @media only screen and (max-width: 480px){
       
              h1{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
         
              h2{
                  /*@editable*/font-size:20px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
          
              h3{
                  /*@editable*/font-size:18px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
         
              h4{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
         
              .mcnBoxedTextContentContainer
       .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
        
              #templatePreheader{
                  /*@editable*/display:block !important;
              }
      
      }   @media only screen and (max-width: 480px){
         
              #templatePreheader .mcnTextContent,#templatePreheader
       .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
         
              #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
         
              #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                  /*@editable*/font-size:16px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }   @media only screen and (max-width: 480px){
         
              #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                  /*@editable*/font-size:12px !important;
                  /*@editable*/line-height:150% !important;
              }
      
      }
      </style>
    </head>
    
    <body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     background-color: #fed149; height: 100%; margin: 0; padding: 0; width: 100%">
      <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
     100%; background-color: #fed149; height: 100%; margin: 0; padding: 0; width:
     100%" width="100%">
          <tr>
            <td align="center" id="bodyCell" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
     height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
        
              <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
     600px; border: 0" width="100%">
                <tr>
                  <td id="templatePreheader" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fed149;
     border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
     100%; min-width:100%;" width="100%">
                             
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateHeader" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f7f7ff;
     border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     min-width:100%;" width="100%">
                      <tbody class="mcnImageBlockOuter">
                        <tr>
                          <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
     100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnImageContent" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
     padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top">
                                    <a class="" href="https://www.lingoapp.com" style="mso-line-height-rule:
     exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
     #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                      <a class="" href="https://www.lingoapp.com/" style="mso-line-height-rule:
     exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
     #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                        <img align="center" alt="Ai uitat parola?" class="mcnImage" src="https://static.lingoapp.com/assets/images/email/il-password-reset@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
     text-decoration: none; vertical-align: bottom; max-width:1200px; padding-bottom:
     0; display: inline !important; vertical-align: bottom;" width="600"></img>
                                      </a>
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td id="templateBody" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f7f7ff;
     border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
     100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
     color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
     line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
     padding-bottom: 9px; padding-left: 18px;' valign="top">
    
                                    <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
     sans-serif; font-size: 32px; font-style: normal; font-weight: bold; line-height:
     125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
     padding: 0'><span style="text-transform:uppercase">Ai uitat</span></h1>
    
    
                                    <h2 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
     sans-serif; font-size: 24px; font-style: normal; font-weight: bold; line-height:
     125%; letter-spacing: 1px; text-align: center; display: block; margin: 0;
     padding: 0'><span style="text-transform:uppercase">parola de la profil?</span></h2>
    
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:
     0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     min-width:100%;" width="100%">
                      <tbody class="mcnTextBlockOuter">
                        <tr>
                          <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                            <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
     100%; min-width:100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td class="mcnTextContent" style='mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
     color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
     line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
     padding-bottom: 9px; padding-left: 18px;' valign="top">Nu te îngrijora,  <b>Olymp Cinema</b> îți oferă posibilitate de resetare! <p> Accesează butonul de mai jos !</p>.
                                    <br></br>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     min-width:100%;" width="100%">
                      <tbody class="mcnButtonBlockOuter">
                        <tr>
                          <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
     exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     padding-top:18px; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                              <tbody class="mcnButtonBlockOuter">
                                <tr>
                                  <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
     exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
     mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     border-collapse: separate !important;border-radius: 48px;background-color:
     #F57153;">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="mcnButtonContent" style="mso-line-height-rule:
     exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
     font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; padding-top:24px;
     padding-right:48px; padding-bottom:24px; padding-left:48px;" valign="middle">
                                            <a class="mcnButton" href="http://localhost:3000/reset-password/${user_id}" style="mso-line-height-rule: exactly;
     -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block; color: #f57153;
     font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
     1px;line-height: 100%;text-align: center;text-decoration: none;color:
     #FFFFFF; text-transform:uppercase;" target="_blank" title="Review Lingo kit
     invitation">Resetează parola</a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
      </center>
    </body>
    
    </html>`,
  };
  return await configEmail.sendMail(msg);
};

const messageSendTicket = async (
  email,
  seats,
  premiere,
  movie,
  reservation,
  cinema,
  qrcode
) => {
  const fullDate = reservation.reserv_date;
  const year = fullDate.getFullYear();
  const month =
    (fullDate.getMonth() + 1).toString().length === 1
      ? "0" + (fullDate.getMonth() + 1)
      : fullDate.getMonth() + 1;
  const day =
    fullDate.getDate().toString().length === 1
      ? "0" + fullDate.getDate()
      : fullDate.getDate();
  const formatDate = day + "." + month + "." + year;

  const tableInfo = seats.map((seat) => {
    return ` <tr>
    <td align="left" style="padding-top: 5px;">
       <table cellspacing="0" cellpadding="0" border="0" width="100%">
           <tr>
              <td width="10%"  align="center"   style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; line-height: 24px; padding: 5px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">${
                seat._id.seat_num
              }</td>
               <td width="25%"  align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; line-height: 24px; padding: 5px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">${
                 seat._id.row_num
               }</td>
               <td width="18%"  align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; line-height: 24px; padding: 5px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">${
                 seat._id.seat_type
               }</td>
               <td width="30%"  align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; line-height: 24px; padding: 5px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">${
                 seat.client_type
               }</td>
               <td width="20%"   align="center"  style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; line-height: 24px; padding: 5px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">${
                 seat._id.seat_price + premiere.price
               }</td>
           </tr>
       </table>
   </td>
  </tr>`;
  });

  const msg = {
    from: `"Olymp Cinema" <${process.env.EMAIL_PROFILE}>`,
    to: email,
    subject: "Ticket - Olymp Cinema",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            body,
            table,
            td,
            a {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
    
            table,
            td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
    
            img {
                -ms-interpolation-mode: bicubic;
            }
    
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }
    
            table {
                border-collapse: collapse !important;
            }
    
            body {
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
            }
    
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            @media screen and (max-width: 480px) {
                .mobile-hide {
                    display: none !important;
                }
    
                .mobile-center {
                    text-align: center !important;
                }
            }
    
            div[style*="margin: 16px 0;"] {
                margin: 0 !important;
            }
        </style>
    
    <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
        <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
            For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them.
        </div>
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#141414">
                                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                        <tr>
                                            <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                                <h1 style="font-size: 28px; font-weight: 800; margin: 0; color: #c1842b;">Ticket,<br>Olymp Cinema</h1>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                        <tr>
                                            <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                                <table cellspacing="0" cellpadding="0" border="0" align="right">
                                                    <tr>
                                                        <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                           
                                                        </td>
                                                        <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-weight: 600; line-height: 34px;"> <img src="https://res.cloudinary.com/olymp-cinema/image/upload/v1627318894/olymp-cinema-logo_bzk0zx.png" width="87" height="20" style="display: block; border: 0px;" /></td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                    <tr>
                                        <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> 
                                      
                                        <img src=${movie.image_url} width="125" height="120" style="display: block; border: 0px;" /><br>
                                            <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">${movie.title}</h2>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                            <p style=" text-align:center; font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;"> Vă aștepăm cu drag la vizionare, la data <b>${formatDate}</b>, ora <b>${reservation.reserv_hour}</b> în <b>Sala Mare</b> a cinematografului <b>${cinema[0].name}</b>, amplasat în <b>${cinema[0].address}.</b>  </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" style="padding-top: 20px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="10%"  align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 800; line-height: 24px; padding: 10px;">Locul</td>
                                                    <td width="11%"  align="center" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 800; line-height: 24px; padding: 10px;">Rîndul</td>
                                                    <td width="20%"  align="center"  bgcolor="#eeeeee"  style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 800; line-height: 24px; padding: 10px;">Categ. Loc</td>
                                                    <td width="20%"  align="center" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 800; line-height: 24px; padding: 10px;">Categ. Vîrstă</td>
                                                    <td width="5%"   align="right" bgcolor="#eeeeee"  style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 800; line-height: 24px; padding: 10px;">Achitat</td>
                                                </tr>   
                                            </table>
                                        </td>
                                    </tr>
                                   ${tableInfo}
                                    <tr>
                                          <td align="left" style="padding-top: 5px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td width="85%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 800; line-height: 24px; padding: 10px;">Total Achitat</td>
                                                    <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 800; line-height: 24px; padding: 10px;">${reservation.total_price} Lei </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
                                    <tr>
                                        <td align="center" valign="top" style="font-size:0;">
                                            <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                                    <tr>
                                                        <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 5px;"> 
                                                     <img src="${qrcode}" width="250" height="10" style="display: block; border: 0px;" /><br>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                    
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" style=" padding: 35px; background-color: #141414;" bgcolor="#1b9ba3">
                                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                    <tr>
                                        <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                            <h2 style="font-size: 20px; font-weight: 800; line-height: 30px; color: #c1842b; margin: 0;">Ticket-ul poate fi tipărit s-au prezentat în format electronic ! </h2>
                                        </td>
                                    </tr>
                                  
                                </table>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `,
  };
  return await configEmail.sendMail(msg);
};
// console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

module.exports = {
  messageConfirmRegister,
  notificationSendEmail,
  messageResetPassword,
  messageSendTicket,
};
