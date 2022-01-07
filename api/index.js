//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Genre } = require('./src/db.js');
const axios = require('axios');
const { API_KEY } = process.env;

let dataGenres = async () => {
  try {
    const getGenreApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);

    getGenreApi.data.results.map(async genre =>{
      try {
        var genreCreated = await Genre.findOrCreate({
          where: { name: genre.name}
        })

        return genreCreated;
        
      } catch (err) {
        console.log('error del mapeo');
      }

    });
  } catch (error) {
    console.error('Error de axios', error);
  }
}

dataGenres();



// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    
  });
});
