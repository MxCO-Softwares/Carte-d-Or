$( document ).ready(function() {

    $( "#signin-button-link" ).click(function( event ) {
        $("#signin-div").show("scale");
        event.preventDefault();
    });
    $( "#signup-button-link" ).click(function( event ) {
        $("#signup-div").show();
        event.preventDefault();
    });
});
