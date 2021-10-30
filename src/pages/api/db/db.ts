const fs = require('fs');
const path = require('path')

  export default function db() {

    const dbPath = path.resolve('./src/pages/api/db', 'dbFile.json');
    try {
        const db = fs.readFileSync(dbPath, 'utf8')
        return JSON.parse(db);
  
      } catch (err) {
        console.log(err);
        return false
      }

}


module.exports = db();
 
  