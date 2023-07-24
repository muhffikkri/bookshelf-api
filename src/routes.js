const routes = [{
      method: "GET",
      path: "/",
      handler: (request, h) => {
        return "Homepage";
      },
    },
    {
      method: "*",
      path: "/",
      handler: (request, h) => {
        return "Halaman tidak dapat diakses dengan method tersebut";
      },
    },
    {
      method: "GET",
      path: "/about",
      handler: (request, h) => {
        return "About page";
      },
    },
    {
      method: "*",
      path: "/about",
      handler: (request, h) => {
        return "Halaman tidak dapat diakses dengan method";
      },
    },
    {
      method: "*",
      path: "/{any*}",
      handler: (request, h) => {
        return "Halaman tidak ditemukan";
      },
    },
    {
      method: "GET",
      path: "/hello/{name?}",
      handler: (request, h) => {
          const {
            name = "stranger"
          } = request.params;
          const {
            lang
          } = request.query;

          if (lang === 'id') {
            return `Hai, ${name}!`;
          }
          return `Hello, ${name}!`;
        },
      },
    ];

    module.exports = routes;