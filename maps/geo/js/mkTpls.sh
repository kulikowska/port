cat tpl.html |\
    sed "s/<directive>/'/" |\
    sed "s/<\/directive>/' :/" |\
    sed "s/<html>/'/" |\
    sed "s/<\/html>/',/"|\
    tr -d '\n' |\
    tr -s ' ' |\
    sed "s/> </></g" |\
    uglifyjs
