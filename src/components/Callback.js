import React, { useEffect } from 'react';


function Callback(props) {

useEffect(() => {
    const hash = window.location.hash.substring(1).split("&").reduce(function(initial,item) {
        if(item) {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
            console.log(decodeURIComponent(parts[1]));
        }
        return initial;
    }, {});
    let token = hash.access_token;
    let refresh = hash.refresh_token;
    if (token && refresh) {
      props.updateToken(token,refresh);
      props.tokenflag(true);
    }
    else if(token){
      props.JustToken(token);
      props.tokenflag(true);
    }
  }, [props]);

  return null;
};

export default Callback;