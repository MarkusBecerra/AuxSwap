import React, { useEffect } from 'react';


function Callback(props) {

useEffect(() => {
    const hash = window.location.hash.substring(1).split("&").reduce(function(initial,item) {
        if(item) {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
    let token = hash.access_token;
    if (token) {
      props.updateToken(token);
    }
  }, []);

  return null;
};

export default Callback;