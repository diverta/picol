self.addEventListener('fetch', e => {
  const cache_url = e.request.url.substring(0,e.request.url.indexOf("GoogleAccessId")-1);

  if (cache_url.indexOf('storage.googleapis.com') == -1) {
    return;
  }

  // For example https://storage.googleapis.com/picol-c8553.appspot.com/files/topics/809_ext_04_0.jpg?GoogleAccessId=
  const cache_nm = 'picol-storage.googleapis.com';

  e.respondWith(
    caches.open(cache_nm).then(function (cache) {
      return cache.match(cache_url).then(function (response) {
        if (response) {
          //console.log(cache_url);
          return response;
        } else {
          return fetch(e.request.clone()).then(function (response) {
            cache.put(cache_url, response.clone());
            return response;
          });
        }
      });
    })
  );

});