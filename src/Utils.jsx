export const limparURL = (aLimpar) => {
    var uri = window.location.toString();
    console.log(uri);
    if (uri.indexOf(aLimpar) > 0) {
        var clean_uri = uri.substring(0, uri.indexOf(aLimpar));
        window.history.replaceState({}, document.title, clean_uri);
    };
};

export const mascaraTelefone = () => {
    var v = document.getElementById('telefone').value;
    v = v.replace(/\D/g,'')
    v = v.replace(/(\d{2})(\d)/,"($1) $2")
    v = v.replace(/(\d)(\d{4})$/,"$1-$2")
    document.getElementById('telefone').value = v
    return
};
