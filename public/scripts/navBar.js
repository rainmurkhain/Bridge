//<script type="text/javascript">
function writeHTMLasJS(){
    document.write("<div class=\"navbar\">");
    document.write("    <div class=\"dropdown\">");
    document.write("        <button class=\"dropbtn\">ETBL<\/button>");
    document.write("        <div class=\"dropdown-content\">");
    document.write("            <a href=\"#\">Põhikiri<\/a>");
    document.write("            <a href=\"#\">Juhatus<\/a>");
    document.write("            <a href=\"#\">Kontakt<\/a>");
    document.write("        <\/div>");
    document.write("    <\/div>");
    document.write("    <a href=\"#calendar\">Kalender<\/a>");
    document.write("    <a href=\"#statistics\">Statistika<\/a>");
    document.write("    <a href=\"\/news\">Uudised<\/a>");
    document.write("    <a href=\"\/lisa\">Lisa uudis<\/a>");
    document.write("    <a href=\"\/meist\">Meist<\/a>");
    document.write("    <div class=\"dropdown\">");
    document.write("        <button class=\"dropbtn\">Turniirid<\/button>");
    document.write("        <div class=\"dropdown-content\">");
    document.write("            <a href=\"\/turniirid\">Vaata turniire<\/a>");
    document.write("            <a href=\"#\">Registreeri<\/a>");
    document.write("        <\/div>");
    document.write("    <\/div>");
    document.write("<\/div>");
}

//   </script> <!--now place this function call at whatever point it needs to write the markup on to the page: --> <script type="text/javascript">
writeHTMLasJS();

//</script>