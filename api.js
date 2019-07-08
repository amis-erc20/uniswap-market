$(function() {
  //  register
  $('body').on('click', 'button[data-btn-type=ajax]', function(e) {
    console.log('click btn');
    //  preparation
    var send_data;
    send_data = {
      //  input from text box
      user_type : $('input').val()
    };
    console.log(send_data);
    //  use webapi
    $.ajax({
      url: 'https://api.uniswap.info/pair/0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
      dataType: "json",
      data: "",
      //  when success
      success: function(responce) {
        if (responce.result === "OK") {
          console.log(responce);
          $('div[data-result=""]').html(JSON.stringify(responce));
        } else {
          console.log(responce);
          $('div[data-result=""]').html(JSON.stringify(responce));
        }
        return false;
      },
      //  when fail
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(XMLHttpRequest);
        console.log(textStatus);
        console.log(errorThrown);
        $('div[data-result=""]').html(JSON.stringify("error"));
        return false;
      }
    });
    //  focus
    $('input').focus();

    return false;
  });
});
