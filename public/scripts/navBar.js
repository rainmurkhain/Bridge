//<script type="text/javascript">

function writeHTMLasJS(){
    document.write("<div class=\"header\">");
    document.write("<h1 class=\"lang\" key=\"home\"> EESTI TURNIIRIBRIDŽILIIT</h1>");
    document.write("</div>");
    document.write("<div id=\"navbar\">");
    document.write("    <div class=\"dropdown\">");
    document.write("        <div class= \"dropbtn\">");
    document.write("            <button class=\"lang\" key=\"lyhend\">ETBL<\/button>");
    document.write("        <\/div>");
    document.write("                <div class=\"dropdown-content\">");
    document.write("                    <a href=\"#\">Põhikiri<\/a>");
    document.write("                    <a href=\"#\">Juhatus<\/a>");
    document.write("                    <a href=\"#\">Kontakt<\/a>");
    document.write("                <\/div>");
    document.write("    <\/div>");
    document.write("    <div class= \"dropbtn\">");
    document.write("        <a href=\"#calendar\" class=\"lang\" key=\"calendar\">Kalender<\/a>");
    document.write("        <a href=\"#statistics\" class=\"lang\" key=\"statistics\">Statistika<\/a>");
    document.write("        <a href=\"\/news\" class=\"lang\" key=\"news\">Uudised<\/a>");
    document.write("        <a href=\"\/lisa\" class=\"lang\" key=\"addnews\">Lisa uudis<\/a>");
    document.write("        <a href=\"\/meist\" class=\"lang\" key=\"about\">Meist<\/a>");
    document.write("        <div class=\"right\">");
    document.write("            <a href=\"/login\" class=\"lang\" key=\"login\" >Logi sisse</a>");
    document.write("            <a href=\"\#\" class=\"lang translate\" key=\"lang\">English<\/a>");
    document.write("        <\/div>");
    document.write("    <\/div>");
    document.write("<\/div>");
}

//   </script> <!--now place this function call at whatever point it needs to write the markup on to the page: --> <script type="text/javascript">
writeHTMLasJS();

//</script>

